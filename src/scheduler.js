const cron = require("node-cron");

/**
 * Schedule a function to run on a cron schedule.
 * @param {string} schedule - Cron expression (default from env)
 * @param {Function} task - Async function to execute
 */
function startScheduler(task) {
  const schedule = process.env.CRON_SCHEDULE || "0 8 * * *";

  if (!cron.validate(schedule)) {
    console.error(`❌  Invalid cron schedule: ${schedule}`);
    process.exit(1);
  }

  console.log(`⏰  Scheduler started. Next run: ${schedule}`);
  cron.schedule(schedule, async () => {
    console.log(`\n🔄  Running scheduled newsletter job at ${new Date().toLocaleString("en-IN")}...`);
    try {
      await task();
    } catch (err) {
      console.error("❌  Scheduled job failed:", err.message);
    }
  });
}

module.exports = { startScheduler };
