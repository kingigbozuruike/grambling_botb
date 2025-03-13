// robust-attribute-filter.js

const rawData = [
    {
      adId: '001',
      clicks: 50,
      impressions: 1000,
      hoverEvents: 200,
      dwellTime: 30,
      ipAddress: '192.168.1.1',
      location: 'NY',
      searchQueries: ['laptop', 'gaming'],
      comments: ['Great ad!', 'Too flashy'],
      extraField: 'irrelevant data'
    },
    {
      adId: '002',
      clicks: 4,
      impressions: 45,
      hoverEvents: 150,
      dwellTime: 25,
      ipAddress: '192.168.1.2',
      location: 'CA',
      searchQueries: ['headphones'],
      comments: ['Nice sound quality'],
      extraField: 'irrelevant data'
    },
    {
      adId: '003',
      clicks: 7,
      impressions: 60,
      hoverEvents: 50,
      dwellTime: 15,
      ipAddress: '192.168.1.3',
      location: 'TX',
      searchQueries: [],
      comments: [],
      extraField: 'irrelevant data'
    },
    {
      adId: '004',
      clicks: 25,
      impressions: 300,
      hoverEvents: 80,
      dwellTime: 20,
      ipAddress: '192.168.1.4',
      location: 'FL',
      searchQueries: ['smartphone', 'android'],
      comments: ['Very informative ad!'],
      extraField: 'irrelevant data'
    }
];

const allowedKeys = ["adId", "clicks", "impressions", "searchQueries", "comments"];
const MIN_CLICKS = 5;
const MIN_IMPRESSIONS = 50;

function robustAttributeFilter(ad) {
    const filteredAd = allowedKeys.reduce((result, key) => {
      if (ad.hasOwnProperty(key)) {
        result[key] = ad[key];
      }
      return result;
    }, {});

    if (ad.clicks < MIN_CLICKS || ad.impressions < MIN_IMPRESSIONS) {
      filteredAd.lowEngagement = true;
    } else {
      filteredAd.lowEngagement = false;
    }

    if ((!ad.searchQueries || ad.searchQueries.length === 0) && 
        (!ad.comments || ad.comments.length === 0)) {
      filteredAd.lacksContext = true;
    } else {
      filteredAd.lacksContext = false;
    }

    return filteredAd;
}

const filteredData = rawData.map(robustAttributeFilter);

function summarizeData(data) {
    return data.map(ad => ({
      adId: ad.adId,
      clicks: ad.clicks,
      impressions: ad.impressions,
      lowEngagement: ad.lowEngagement,
      lacksContext: ad.lacksContext,
      searchQueries: ad.searchQueries,
      commentCount: ad.comments.length
    }));
}

console.log("=== Original Data Sample ===");
console.log(rawData);

console.log("\n=== Filtered Data Sample ===");
console.log(filteredData);

console.log("\n=== Data Summary ===");
console.log(summarizeData(filteredData));
