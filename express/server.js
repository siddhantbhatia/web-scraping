("use strict");

const express = require("express");
const path = require("path");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
// const file = require("../handlers/file");

// const leaderboardHandlers = require("../handlers/leaderboardScrape");
// const chartDataHandlers = require("../handlers/chartDataScrape");

router.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.sendFile(path.join(__dirname, "../index.html"));
  res.end();
});

// router.get("/part1", async (req, res) => {
//   res.setHeader("Content-Type", "application/json;charset=utf-8");

//   const { date } = req.query;
//   const fileName = date + ".json";

//   const fileData = file.readFile(fileName);

//   if (fileData) {
//     res.end(JSON.stringify(fileData));
//   } else {
//     const leaderboardData = await leaderboardHandlers.scrapeLeaderboardData();
//     const chartData = await chartDataHandlers.fetchChartData(date);

//     const output = { leaderboardData, chartData };

//     file.writeFile(fileName, output);

//     res.end(JSON.stringify(output));
//   }
// });

// dirty fix
const fileData = {
  chartData: {
    cryptoslam: {
      totalSales: "657387.17",
      buyers: 2122,
      sellers: 2823,
      change: 129,
    },
    immutascan: {
      totalSales: "668234.46",
      change: 9,
    },
  },
  leaderboardData: [
    {
      interval: "24h",
      top10Chains: [
        {
          seq: "1",
          name: "Ethereum",
          sales: -7884097,
          buyers: -7,
          sellers: 7,
        },
        {
          seq: "2",
          name: "Solana",
          sales: -2052341,
          buyers: -10,
          sellers: -32,
        },
        {
          seq: "3",
          name: "Flow",
          sales: -731394,
          buyers: -2,
          sellers: -10,
        },
        {
          seq: "5",
          name: "BNB",
          sales: 252439,
          buyers: -907,
          sellers: -789,
        },
        {
          seq: "6",
          name: "Polygon",
          sales: 338873,
          buyers: -957,
          sellers: 24,
        },
        {
          seq: "7",
          name: "Ronin",
          sales: 358199,
          buyers: -2,
          sellers: 16,
        },
        {
          seq: "8",
          name: "Avalanche",
          sales: 392650,
          buyers: -227,
          sellers: -345,
        },
        {
          seq: "9",
          name: "Panini",
          sales: 431647,
          buyers: -155,
          sellers: 25,
        },
        {
          seq: "10",
          name: "WAX",
          sales: 441983,
          buyers: 1,
          sellers: 15,
        },
      ],
    },
    {
      interval: "7d",
      top10Chains: [
        {
          seq: "1",
          name: "Ethereum",
          sales: -74596815,
          buyers: -47,
          sellers: -9,
        },
        {
          seq: "2",
          name: "Solana",
          sales: -20436919,
          buyers: -50,
          sellers: -471,
        },
        {
          seq: "3",
          name: "Flow",
          sales: -3287471,
          buyers: -12,
          sellers: -38,
        },
        {
          seq: "5",
          name: "BNB",
          sales: 1101929,
          buyers: 3,
          sellers: 164,
        },
        {
          seq: "6",
          name: "Ronin",
          sales: 2144028,
          buyers: -10,
          sellers: 107,
        },
        {
          seq: "7",
          name: "Polygon",
          sales: 2187115,
          buyers: 4,
          sellers: 161,
        },
        {
          seq: "8",
          name: "Panini",
          sales: 2302332,
          buyers: -490,
          sellers: 151,
        },
        {
          seq: "9",
          name: "WAX",
          sales: 2561515,
          buyers: 2,
          sellers: 54,
        },
        {
          seq: "10",
          name: "Avalanche",
          sales: 2580222,
          buyers: 7,
          sellers: 169,
        },
      ],
    },
    {
      interval: "30d",
      top10Chains: [
        {
          seq: "1",
          name: "Ethereum",
          sales: -360814140,
          buyers: -158,
          sellers: -191,
        },
        {
          seq: "2",
          name: "Solana",
          sales: -90337439,
          buyers: -108,
          sellers: 663,
        },
        {
          seq: "3",
          name: "Flow",
          sales: -13529201,
          buyers: -18,
          sellers: -16,
        },
        {
          seq: "4",
          name: "BNB",
          sales: -5164511,
          buyers: -11,
          sellers: 618,
        },
        {
          seq: "5",
          name: "Ronin",
          sales: -611051,
          buyers: -27,
          sellers: 270,
        },
        {
          seq: "7",
          name: "Polygon",
          sales: 526041,
          buyers: -1,
          sellers: 608,
        },
        {
          seq: "8",
          name: "Panini",
          sales: 2029938,
          buyers: -922,
          sellers: 607,
        },
        {
          seq: "9",
          name: "Avalanche",
          sales: 2878652,
          buyers: 12,
          sellers: 653,
        },
        {
          seq: "10",
          name: "WAX",
          sales: 2880590,
          buyers: -2,
          sellers: 154,
        },
      ],
    },
    {
      interval: "all",
      top10Chains: [
        {
          seq: "1",
          name: "Ethereum",
          sales: -29271028708,
          buyers: -5,
          sellers: 120,
        },
        {
          seq: "2",
          name: "Ronin",
          sales: -3842250108,
          buyers: -8,
          sellers: 120,
        },
        {
          seq: "3",
          name: "Solana",
          sales: -2391994301,
          buyers: -3,
          sellers: -686,
        },
        {
          seq: "4",
          name: "Flow",
          sales: -863369242,
          buyers: -14,
          sellers: -333,
        },
        {
          seq: "5",
          name: "Polygon",
          sales: -231707561,
          buyers: 8,
          sellers: -55,
        },
        {
          seq: "6",
          name: "WAX",
          sales: -197466313,
          buyers: -11,
          sellers: 120,
        },
        {
          seq: "7",
          name: "Avalanche",
          sales: -156025116,
          buyers: -693,
          sellers: 89,
        },
        {
          seq: "9",
          name: "BNB",
          sales: 127103067,
          buyers: -559,
          sellers: 32,
        },
        {
          seq: "10",
          name: "Palm",
          sales: 188289936,
          buyers: -554,
          sellers: 108,
        },
      ],
    },
  ],
};

router.get("/getData", async (req, res) => {
  res.setHeader("Content-Type", "application/json;charset=utf-8");

  res.end(JSON.stringify(fileData));
});

app.use(bodyParser.json());
app.use("/.netlify/functions/server", router); // path must route to lambda
app.use("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../build/index.html"))
);

module.exports = app;
module.exports.handler = serverless(app);
