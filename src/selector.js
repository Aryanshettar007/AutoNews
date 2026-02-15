/**
 * Hybrid Trending Article Selector
 *
 * Strategy:
 *   1. Discard articles older than MAX_AGE_DAYS (2 days)
 *   2. Take the top MAX_PER_SOURCE (3) most recent from each source
 *   3. Sort combined list by date (newest first)
 *   4. Cap at MAX_TOTAL (20) articles
 */

const MAX_AGE_DAYS = 2;
const MAX_PER_SOURCE = 3;
const MAX_TOTAL = 20;

/**
 * Select the most recent & trending articles using the hybrid approach.
 * @param {Array} articles - Normalized articles
 * @returns {Array} Selected articles
 */
function selectTopArticles(articles) {
  const now = new Date();
  const cutoff = new Date(now.getTime() - MAX_AGE_DAYS * 24 * 60 * 60 * 1000);

  // 1. Keep only recent articles (≤ 2 days old)
  const recent = articles.filter((a) => {
    const pubDate = new Date(a.pubDate);
    return pubDate >= cutoff;
  });

  console.log(`   ${recent.length} articles are within the last ${MAX_AGE_DAYS} days.`);

  // 2. Group by source
  const bySource = {};
  for (const article of recent) {
    if (!bySource[article.source]) bySource[article.source] = [];
    bySource[article.source].push(article);
  }

  // 3. Take top N per source (sorted by newest first)
  const selected = [];
  for (const [source, items] of Object.entries(bySource)) {
    const sorted = items.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
    const top = sorted.slice(0, MAX_PER_SOURCE);
    console.log(`   📰 ${source}: picked ${top.length}/${items.length} articles`);
    selected.push(...top);
  }

  // 4. Sort combined list by date and cap
  selected.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
  const final = selected.slice(0, MAX_TOTAL);

  console.log(`   🏆 Selected ${final.length} trending articles (max ${MAX_TOTAL}).`);
  return final;
}

module.exports = { selectTopArticles, MAX_AGE_DAYS, MAX_PER_SOURCE, MAX_TOTAL };
