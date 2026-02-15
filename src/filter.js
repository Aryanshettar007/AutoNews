/**
 * Keywords to match against article title and description.
 * Case-insensitive matching. Add / remove as needed.
 */
const KEYWORDS = [
  // Auto-industry terms
  "EV",
  "Electric",
  "Launch",
  "Hybrid",
  "Policy",
  "Facelift",
  "SUV",
  "Sedan",
  "Hatchback",
  "Autonomous",
  "Self-driving",
  "Battery",
  "Charging",
  "Emission",
  // Nylok / fastener technology terms
  "Fastener",
  "Nylok",
  "Pre-applied",
  "Threadlocker",
  "Bolt",
  "Torque",
  "OEM",
  "Automotive Parts",
  "Locking",
  "Sealing",
  "Coating",
];

/**
 * Filter articles whose title or description match any keyword.
 * @param {Array} articles - Normalized articles
 * @returns {Array} Filtered articles
 */
function filterArticles(articles) {
  return articles.filter((article) => {
    const text = `${article.title} ${article.description}`.toLowerCase();
    return KEYWORDS.some((kw) => text.includes(kw.toLowerCase()));
  });
}

module.exports = { filterArticles, KEYWORDS };
