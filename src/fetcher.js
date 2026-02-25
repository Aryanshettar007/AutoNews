const RSSParser = require("rss-parser");

const parser = new RSSParser({
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AutoNewsletter/1.0",
    Accept: "application/rss+xml, application/xml, text/xml, */*",
  },
  timeout: 10000,
});

const FEED_URLS = [
  "https://www.rushlane.com/feed/",
  "https://www.autocarindia.com/rss/all",
  "https://www.motorauthority.com/rss",
  "https://insideevs.com/rss/articles/all/",
  "https://chargedevs.com/feed/",
  "https://auto.economictimes.indiatimes.com/rss/topstories",
  "https://www.autocarpro.in/rssfeeds/all",
  "https://auto.hindustantimes.com/rss/trending",
];

/**
 * Fetch all RSS feeds and return raw items with their source URL.
 * @returns {Promise<Array<{ item: object, feedUrl: string }>>}
 */
async function fetchAll() {
  const results = [];

  // Fetch all feeds in parallel for speed
  const feedPromises = FEED_URLS.map((url) =>
    parser
      .parseURL(url)
      .then((feed) => ({ status: "ok", feed, url }))
      .catch((err) => ({ status: "fail", err, url }))
  );

  const outcomes = await Promise.all(feedPromises);

  for (const outcome of outcomes) {
    if (outcome.status === "ok") {
      console.log(`✅  Fetched ${outcome.feed.items.length} articles from ${outcome.url}`);
      outcome.feed.items.forEach((item) => results.push({ item, feedUrl: outcome.url }));
    } else {
      console.error(`❌  Failed to fetch ${outcome.url}: ${outcome.err.message}`);
    }
  }

  console.log(`\n📊  Total raw articles fetched: ${results.length}`);
  return results;
}

module.exports = { fetchAll, FEED_URLS };
