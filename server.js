const express = require("express");
const fs = require("fs");
const app = express();

app.set("trust proxy", true); // Get real IP behind proxy like Render

app.get("/", (req, res) => {
  const ip = req.ip;
  console.log("IP logged:", ip);

  // Save IP to a file (one per line)
  fs.appendFileSync("ips.txt", ip + "\n");

  // Redirect to Rick Astley :)
  res.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
