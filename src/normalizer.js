/**
 * Strip HTML tags from a string.
 */
function stripHtml(str) {
  if (!str) return "";
  return str.replace(/<[^>]*>/g, "").trim();
}

/**
 * Derive a human-readable source name from a feed URL.
 */
function getSourceName(feedUrl) {
  if (feedUrl.includes("rushlane")) return "Rushlane";
  if (feedUrl.includes("autocarindia")) return "Autocar India";
  return new URL(feedUrl).hostname;
}

/**
 * Normalize an array of raw feed results into a standard article format.
 * @param {Array<{ item: object, feedUrl: string }>} rawItems
 * @returns {Array<{ title: string, link: string, description: string, pubDate: string, source: string }>}
 */
function normalize(rawItems) {
  return rawItems.map(({ item, feedUrl }) => ({
    title: item.title || "Untitled",
    link: item.link || "",
    description: stripHtml(item.contentSnippet || item.content || item.description || ""),
    pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
    source: getSourceName(feedUrl),
  }));
}

module.exports = { normalize };
