("use strict");

const express = require("express");
const path = require("path");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
const file = require("../handlers/file");

const leaderboardHandlers = require("../handlers/leaderboardScrape");
const chartDataHandlers = require("../handlers/chartDataScrape");

router.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.sendFile(path.join(__dirname, "../index.html"));
  res.end();
});

router.get("/part1", async (req, res) => {
  res.setHeader("Content-Type", "application/json;charset=utf-8");

  const { date } = req.query;
  const fileName = date + ".json";

  const fileData = file.readFile(fileName);

  if (fileData) {
    res.end(JSON.stringify(fileData));
  } else {
    const leaderboardData = await leaderboardHandlers.scrapeLeaderboardData();
    const chartData = await chartDataHandlers.fetchChartData(date);

    const output = { leaderboardData, chartData };

    file.writeFile(fileName, output);

    res.end(JSON.stringify(output));
  }
});

app.use(bodyParser.json());
app.use("/.netlify/functions/server", router); // path must route to lambda
app.use("/", (req, res) => res.sendFile(path.join(__dirname, "../index.html")));

module.exports = app;
module.exports.handler = serverless(app);
