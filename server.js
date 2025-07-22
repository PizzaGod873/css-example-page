const express = require("express");
const fs = require("fs");
const app = express();

app.set("trust proxy", true);

app.get("/", (req, res) => {
  const ip = req.ip;
  const ua = req.get("User-Agent") || "";
  console.log(`Visitor IP: ${ip}, User-Agent: ${ua}`);
  fs.appendFileSync("ips.txt", `${ip} | ${ua}\n`);

  // Check if it's a bot (Discord, Twitter, Facebook, etc.)
  const isBot = /discord|bot|twitter|facebook|embed/i.test(ua);

  if (isBot) {
    // Send fake preview page to trick bots
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>My Cool Project</title>
          <meta property="og:title" content="CSS test">
          <meta property="og:description" content="pretty cool CSS stuffs">
        </head>
        <body>
          Nothing to see here.
        </body>
      </html>
    `);
  } else {
    // Real user: Rickroll!
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Loading...</title>
          <script>
            setTimeout(() => {
              window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
            }, 1000);
          </script>
        </head>
        <body>
          <p>Loading...</p>
        </body>
      </html>
    `);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Listening on port", port);
});
