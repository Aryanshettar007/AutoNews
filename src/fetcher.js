const RSSParser = require("rss-parser");

const parser = new RSSParser({
  timeout: 10000,
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    Accept: "application/rss+xml, application/xml;q=0.9, */*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    Connection: "keep-alive",
  },
});

const FEED_URLS = [
  "https://www.rushlane.com/feed/",
  "https://www.autocarindia.com/rss/all",
  "https://www.thedrive.com/feed",
  "https://insideevs.com/rss/articles/all/",
  "https://chargedevs.com/feed/",
  "https://auto.economictimes.indiatimes.com/rss/topstories",
  "https://www.autocarpro.in/rssfeeds/all",
];

/**
 * Fetch all RSS feeds in parallel and return raw items with their source URL.
 * Failed feeds are skipped immediately — no retries.
 * @returns {Promise<Array<{ item: object, feedUrl: string }>>}
 */
async function fetchAll() {
  const results = [];

  // Fetch all feeds in parallel for speed
  const feedPromises = FEED_URLS.map((url) =>
    parser
      .parseURL(url)
      .then((feed) => ({ status: "ok", feed, url }))
      .catch((err) => {
        console.error(`❌  Skipped ${url}: ${err.message}`);
        return { status: "fail", url };
      })
  );

  const outcomes = await Promise.all(feedPromises);

  for (const outcome of outcomes) {
    if (outcome.status === "ok") {
      console.log(`✅  Fetched ${outcome.feed.items.length} articles from ${outcome.url}`);
      outcome.feed.items.forEach((item) => results.push({ item, feedUrl: outcome.url }));
    }
  }

  console.log(`\n📊  Total raw articles fetched: ${results.length}`);
  return results;
}

module.exports = { fetchAll, FEED_URLS };
