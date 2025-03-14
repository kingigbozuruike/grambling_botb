const express = require('express');
const cors = require('cors');
const sentimentAnalyzer = require('./sentimentAnalyzer');
const sampleData = require('./sampleData');
const adData = require('./adData');

const app = express();
app.use(express.json());
app.use(cors());

// Endpoint that processes comments and returns results with matching ads
app.get('/api/analyze-with-ads', async (req, res) => {
  try {
    // Analyze all sample comments
    const results = await sentimentAnalyzer.batchAnalyze(sampleData.comments);
    
    // Return the analysis results with matching ads
    const analysisResults = sampleData.comments.map((comment, index) => {
      const adType = results[index].adType;
      
      return {
        comment,
        sentiment: results[index].label,
        score: results[index].score,
        adType,
        recommendedAds: adData[adType] || [] // Get matching ads
      };
    });
    
    res.json(analysisResults);
  } catch (error) {
    console.error('Error analyzing comments:', error);
    res.status(500).json({ error: "Analysis failed" });
  }
});

// Serve static frontend files
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Try accessing: http://localhost:${PORT}/api/analyze-with-ads`);
});