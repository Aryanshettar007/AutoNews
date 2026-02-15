/**
 * Generate a clean, responsive HTML newsletter.
 * @param {Array} articles - Articles to include
 * @returns {string} HTML string
 */
function generateNewsletter(articles) {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const articleCards = articles
    .map(
      (a) => `
      <tr>
        <td style="padding: 16px 0; border-bottom: 1px solid #e0e0e0;">
          <a href="${a.link}" style="color: #1a73e8; font-size: 17px; font-weight: 600; text-decoration: none; line-height: 1.4;">
            ${a.title}
          </a>
          <div style="margin-top: 6px; font-size: 12px; color: #888;">
            <span style="background: #f0f4ff; color: #1a73e8; padding: 2px 8px; border-radius: 4px; font-weight: 500;">${a.source}</span>
            &nbsp;&middot;&nbsp; ${new Date(a.pubDate).toLocaleDateString("en-IN")}
          </div>
          <p style="margin: 8px 0 0; font-size: 14px; color: #444; line-height: 1.5;">
            ${a.description.substring(0, 200)}${a.description.length > 200 ? "…" : ""}
          </p>
        </td>
      </tr>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Auto Industry Daily Newsletter</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f9; font-family: 'Segoe UI', Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f6f9; padding: 20px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a73e8, #0d47a1); padding: 30px 32px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">🚗 Auto Industry Daily</h1>
              <p style="margin: 8px 0 0; color: rgba(255,255,255,0.85); font-size: 14px;">${today} &nbsp;·&nbsp; ${articles.length} articles</p>
            </td>
          </tr>

          <!-- Articles -->
          <tr>
            <td style="padding: 24px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${articleCards}
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: #f9fafb; padding: 20px 32px; text-align: center; border-top: 1px solid #e8e8e8;">
              <p style="margin: 0; font-size: 12px; color: #999;">
                Auto Industry Daily Newsletter &mdash; Curated by AutoNews Bot<br/>
                <a href="#" style="color: #1a73e8; text-decoration: none;">Unsubscribe</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

module.exports = { generateNewsletter };
