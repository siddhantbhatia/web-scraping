const http = require("http");
const qs = require("querystring");
const url = require("url");
const file = require("./functions/file");

const leaderboardHandlers = require("./functions/leaderboardScrape");
const chartDataHandlers = require("./functions/chartDataScrape");

http
  .createServer(async function (req, res) {
    const { pathname, query } = url.parse(req.url);

    if (req.method !== "GET") {
      res.end(`{"error": "${http.STATUS_CODES[405]}"}`);
    } else {
      if (pathname === "/part1") {
        res.setHeader("Content-Type", "application/json;charset=utf-8");

        const { date } = qs.parse(query);
        const fileName = date + ".json";

        const fileData = file.readFile(fileName);

        if (fileData) {
          res.end(JSON.stringify(fileData));
        } else {
          const leaderboardData =
            await leaderboardHandlers.scrapeLeaderboardData();

         //  const chartData = await chartDataHandlers.fetchChartData(date);
          const output = { leaderboardData };

          file.writeFile(fileName, output);

          res.end(JSON.stringify(output));
        }
      }
    }
  })
  .listen(8081);

// Console will print the message
console.log("Server running at http://127.0.0.1:8081/");
