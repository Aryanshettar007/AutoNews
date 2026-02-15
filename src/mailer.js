const nodemailer = require("nodemailer");

/**
 * Create a reusable Nodemailer transporter with Gmail SMTP.
 */
function createTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

/**
 * Send the newsletter email.
 * @param {string} html - The HTML content of the newsletter
 * @param {number} articleCount - Number of articles included
 */
async function sendNewsletter(html, articleCount) {
  const transporter = createTransporter();

  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const mailOptions = {
    from: `"AutoNews Bot" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: `🚗 Auto Industry Daily — ${today} (${articleCount} articles)`,
    html,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`📧  Newsletter sent! Message ID: ${info.messageId}`);
  return info;
}

module.exports = { sendNewsletter };
