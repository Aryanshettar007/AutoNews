require("dotenv").config();

const { fetchAll } = require("./src/fetcher");
const { normalize } = require("./src/normalizer");
const { selectTopArticles } = require("./src/selector");
const { deduplicate, markAsSent } = require("./src/deduplicator");
const { generateNewsletter } = require("./src/templateEngine");
const { sendNewsletter } = require("./src/mailer");
const { startScheduler } = require("./src/scheduler");

/**
 * Main newsletter pipeline.
 */
async function runNewsletter() {
  console.log("━".repeat(50));
  console.log("🚗  Auto Industry Daily Newsletter");
  console.log("━".repeat(50));

  // 1. Fetch
  console.log("\n📡  Step 1: Fetching RSS feeds...");
  const rawItems = await fetchAll();

  // 2. Normalize
  console.log("\n🔄  Step 2: Normalizing articles...");
  const articles = normalize(rawItems);
  console.log(`   Found ${articles.length} total articles.`);

  // 3. Select trending
  console.log("\n🔥  Step 3: Selecting trending articles...");
  const trending = selectTopArticles(articles);

  // 4. Deduplicate
  console.log("\n🧹  Step 4: Removing duplicates...");
  const newArticles = deduplicate(trending);
  console.log(`   ${newArticles.length} new articles to send.`);

  if (newArticles.length === 0) {
    console.log("\n✅  No new articles today. Skipping email.");
    return;
  }

  // 5. Generate HTML
  console.log("\n📝  Step 5: Generating newsletter HTML...");
  const html = generateNewsletter(newArticles);

  // 6. Send email
  console.log("\n📧  Step 6: Sending email...");
  await sendNewsletter(html, newArticles.length);

  // 7. Mark as sent
  markAsSent(newArticles);
  console.log(`\n✅  Done! ${newArticles.length} articles sent and recorded.`);
}

// --- CLI: Run immediately with --now, otherwise start scheduler ---
const args = process.argv.slice(2);

if (args.includes("--now")) {
  runNewsletter().catch((err) => {
    console.error("❌  Pipeline failed:", err.message);
    process.exit(1);
  });
} else {
  console.log("🚀  Starting Auto Industry Daily Newsletter...\n");
  startScheduler(runNewsletter);
}
