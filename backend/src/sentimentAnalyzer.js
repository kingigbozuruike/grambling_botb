const { pipeline } = require('@xenova/transformers');

class SentimentAnalyzer {
  constructor(neutralThreshold = 0.6) {
    this.model = null;
    this.neutralThreshold = neutralThreshold;
    this.isLoading = false;
    this.init();
  }

  async init() {
    if (this.model || this.isLoading) return;
    
    try {
      this.isLoading = true;
      console.log('Loading sentiment analysis model...');
      this.model = await pipeline('sentiment-analysis', 'distilbert-base-uncased-finetuned-sst-2-english');
      console.log('Sentiment model loaded successfully!');
    } catch (error) {
      console.error('Failed to load sentiment model:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async analyze(text) {
    if (!this.model) {
      if (this.isLoading) {
        // Wait for model to finish loading
        console.log('Model is still loading. Waiting...');
        await new Promise(resolve => {
          const checkInterval = setInterval(() => {
            if (!this.isLoading) {
              clearInterval(checkInterval);
              resolve();
            }
          }, 100);
        });
      } else {
        // Try to load the model if it's not already loading
        await this.init();
      }
      
      // If still no model, throw error
      if (!this.model) {
        throw new Error('Failed to load sentiment analysis model');
      }
    }
    
    // Perform the analysis
    const result = await this.model(text);
    const rawLabel = result[0].label;
    const score = result[0].score;
    
    // Add neutral classification for low confidence predictions
    let label = rawLabel;
    if (score < this.neutralThreshold) {
      label = 'NEUTRAL';
    }
    
    // Map sentiment to ad type
    const adType = this.mapSentimentToAdType(label);
    
    return {
      label,
      score,
      adType
    };
  }
  
  mapSentimentToAdType(sentiment) {
    switch(sentiment) {
      case 'POSITIVE':
        return 'Related Products';
      case 'NEGATIVE':
        return 'General Ads';
      case 'NEUTRAL':
        return 'Similar Products';
      default:
        return 'General Ads';
    }
  }
  
  async batchAnalyze(texts) {
    return Promise.all(texts.map(text => this.analyze(text)));
  }
}

// Create a singleton instance
const analyzer = new SentimentAnalyzer();

// Export for use in your application
module.exports = analyzer;