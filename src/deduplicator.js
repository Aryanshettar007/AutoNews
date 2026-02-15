const fs = require("fs");
const path = require("path");

const SENT_FILE = path.join(__dirname, "..", "data", "sent.json");

/**
 * Read the list of previously sent article links.
 */
function readSentLinks() {
  try {
    const data = fs.readFileSync(SENT_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

/**
 * Save the updated list of sent links.
 */
function writeSentLinks(links) {
  fs.writeFileSync(SENT_FILE, JSON.stringify(links, null, 2), "utf-8");
}

/**
 * Remove articles that have already been sent.
 * @param {Array} articles - Filtered articles
 * @returns {Array} New (unsent) articles
 */
function deduplicate(articles) {
  const sentLinks = readSentLinks();
  const sentSet = new Set(sentLinks);
  return articles.filter((a) => !sentSet.has(a.link));
}

/**
 * Mark articles as sent by saving their links.
 * @param {Array} articles - Articles that were sent
 */
function markAsSent(articles) {
  const sentLinks = readSentLinks();
  const newLinks = articles.map((a) => a.link);
  writeSentLinks([...sentLinks, ...newLinks]);
}

module.exports = { deduplicate, markAsSent };
