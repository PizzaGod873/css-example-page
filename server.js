const express = require("express");
const fs = require("fs");
const app = express();

app.set("trust proxy", true);

app.get("/", (req, res) => {
  const ip = req.ip;
  console.log("Visitor IP:", ip);
  fs.appendFileSync("ips.txt", ip + "\n");

  // Immediately redirect with HTTP 302
  res.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Listening on port", port);
});
