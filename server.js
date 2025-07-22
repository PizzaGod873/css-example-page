const express = require("express");
const fs = require("fs");
const app = express();

app.set("trust proxy", true);

app.get("/", (req, res) => {
  const ip = req.ip;
  console.log("Visitor IP:", ip);
  fs.appendFileSync("ips.txt", ip + "\n");

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Loading...</title>
      </head>
      <body>
        <p>Loading...</p>
        <script>
          // Attempt to open Rickroll in a new tab on page load
          window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
        </script>
      </body>
    </html>
  `);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Listening on port", port);
});
