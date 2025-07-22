const express = require("express");
const fs = require("fs");
const app = express();

app.set("trust proxy", true); // Get real IP behind Render proxy

app.get("/", (req, res) => {
  const ip = req.ip;
  console.log("Visitor IP:", ip);
  fs.appendFileSync("ips.txt", ip + "\n");
  res.send(`<h1>Welcome!</h1><p>Your IP: ${ip} has been logged (with permission).</p>`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
