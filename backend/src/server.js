const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
const { pipeline } = require('@xenova/transformers');
require('dotenv').config();

// Initialize Express app
const app = express();

// Connect to database
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

// Create a service class for sentiment analysis
class SentimentService {
  constructor() {
    this.pipeline = null;
    this.isLoading = false;
    this.initializePipeline();
  }

  async initializePipeline() {
    if (this.pipeline || this.isLoading) return;
    
    try {
      this.isLoading = true;
      console.log('Loading sentiment analysis model...');
      this.pipeline = await pipeline('sentiment-analysis', 'distilbert-base-uncased-finetuned-sst-2-english');
      console.log('Sentiment analysis model loaded successfully');
    } catch (error) {
      console.error('Failed to load sentiment model:', error);
      this.isLoading = false;
      // Schedule retry after 30 seconds
      setTimeout(() => this.initializePipeline(), 30000);
    }
    this.isLoading = false;
  }

  async analyze(text) {
    if (!this.pipeline) {
      await this.initializePipeline();
      if (!this.pipeline) {
        throw new Error('Sentiment analysis model not available');
      }
    }
    
    const result = await this.pipeline(text);
    return {
      label: result[0].label,
      score: result[0].score
    };
  }

  isReady() {
    return !!this.pipeline;
  }
}

// Create singleton instance
const sentimentService = new SentimentService();

// Cache middleware for sentiment results
const sentimentCache = new Map();
const CACHE_TTL = 3600000; // 1 hour in milliseconds

const cacheMiddleware = (req, res, next) => {
  const { comment } = req.body;
  
  if (comment && sentimentCache.has(comment)) {
    const { data, timestamp } = sentimentCache.get(comment);
    
    // Check if cache entry is still valid
    if (Date.now() - timestamp < CACHE_TTL) {
      return res.json(data);
    } else {
      sentimentCache.delete(comment); // Remove expired entry
    }
  }
  
  next();
};

// Request rate limiter
const requestCounts = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT = 30; // 30 requests per minute

const rateLimiter = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  
  if (!requestCounts.has(ip)) {
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
  } else {
    const data = requestCounts.get(ip);
    
    if (now > data.resetTime) {
      data.count = 1;
      data.resetTime = now + RATE_LIMIT_WINDOW;
    } else if (data.count >= RATE_LIMIT) {
      return res.status(429).json({ 
        error: 'Too many requests', 
        retryAfter: Math.ceil((data.resetTime - now) / 1000) 
      });
    } else {
      data.count++;
    }
  }
  
  next();
};

// Cleanup expired cache entries and rate limit data every hour
setInterval(() => {
  const now = Date.now();
  
  // Clean cache
  for (const [key, { timestamp }] of sentimentCache.entries()) {
    if (now - timestamp > CACHE_TTL) {
      sentimentCache.delete(key);
    }
  }
  
  // Clean rate limiter
  for (const [ip, data] of requestCounts.entries()) {
    if (now > data.resetTime) {
      requestCounts.delete(ip);
    }
  }
}, 3600000); // Run every hour

// Sentiment Analysis Endpoint with caching and rate limiting
app.post("/api/sentiment", rateLimiter, cacheMiddleware, async (req, res) => {
  try {
    const { comment } = req.body;
    
    if (!comment) {
      return res.status(400).json({ error: "Comment is required." });
    }
    
    if (!sentimentService.isReady()) {
      return res.status(503).json({ 
        error: "Service unavailable. Model is loading.", 
        retryAfter: 10 
      });
    }
    
    const result = await sentimentService.analyze(comment);
    
    // Cache the result
    sentimentCache.set(comment, { 
      data: result, 
      timestamp: Date.now() 
    });
    
    res.json(result);
  } catch (error) {
    console.error("Error processing sentiment:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: 'ok',
    modelReady: sentimentService.isReady(),
    cacheSize: sentimentCache.size,
    uptime: process.uptime()
  });
});

// Existing API Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/ads', require('./routes/api/ads'));
app.use('/api/interactions', require('./routes/api/interactions'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Something went wrong' });
});

const PORT = process.env.PORT || process.env.npm_package_config_port || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Handle graceful shutdown
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

function shutdown() {
  console.log('Shutting down server...');
  // Close server and any open connections
  process.exit(0);
}
