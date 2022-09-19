const puppeteer = require("puppeteer");
const moment = require("moment");

function formatDate(date) {
  const dateIsoString = date.toISOString();
  const dateString = dateIsoString.split("T")[0];
  const dateArr = dateString.split("-");

  const yearMonthKey = dateArr[0] + "-" + dateArr[1];
  const dateKey = dateIsoString.split(".")[0];

  return {
    yearMonthKey: yearMonthKey,
    dateKey: dateKey,
    dateString: dateString,
  };
}

async function fetchApiData(pageUrl, apiOptions) {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"
  );

  page.on("response", async (response) => {
    const request = response.request();
    const url = response.url();
    console.log(url, request.resourceType());
  });

  await page.goto(pageUrl);

  const finalResponse = await page.waitForResponse(
    async (response) => {
      let responseJson;

      try {
        responseJson = await response.json();
      } catch {
        return false;
      }

      return (
        response.url() === apiOptions.endpoint &&
        response.request().resourceType() === apiOptions.type &&
        (apiOptions.callback ? apiOptions.callback(responseJson) : true)
      );
    },
    {
      timeout: 0,
    }
  );

  const output = await finalResponse.json();

  await browser.close();
  return output;
}

async function fetchChartData(date) {
  // date format: "YYYY-MM-DD"
  const today = moment(new Date(date));

  const todayDateObject = formatDate(today);
  const yesterdayDateObject = formatDate(today.subtract(1, "days"));

  // fetch cryptoslam data
  const cryptoslamResponse = await fetchApiData(
    "https://cryptoslam.io/blockchains/immutablex",
    {
      endpoint: "https://api2.cryptoslam.io/api/nft-indexes/immutablex",
      type: "fetch",
    }
  );

  const cryptoslamToday =
    cryptoslamResponse[todayDateObject.yearMonthKey]["dailySummaries"][
      todayDateObject.dateKey
    ];
  const cryptoslamYesterday =
    cryptoslamResponse[yesterdayDateObject.yearMonthKey]["dailySummaries"][
      yesterdayDateObject.dateKey
    ];

  const cryptoslam = {
    totalSales: parseFloat(cryptoslamToday.totalPriceUSD).toFixed(2),
    buyers: cryptoslamToday.uniqueBuyers,
    sellers: cryptoslamToday.uniqueSellers,
    change:
      parseFloat(
        (cryptoslamToday.totalPriceUSD - cryptoslamYesterday.totalPriceUSD) /
          cryptoslamYesterday.totalPriceUSD
      ).toFixed(2) * 100,
  };

  // fetch immutascan data
  const immutascanResponse = await fetchApiData("https://immutascan.io/", {
    endpoint:
      "https://3vkyshzozjep5ciwsh2fvgdxwy.appsync-api.us-west-2.amazonaws.com/graphql",
    type: "xhr",
    callback: (response) => {
      if (
        response.data.hasOwnProperty("getMetricsAll") &&
        response.data.hasOwnProperty("latestTrades")
      ) {
        return true;
      } else {
        return false;
      }
    },
  });

  let immutascanToday = {},
    immutascanYesterday = {};

  for (let item of immutascanResponse.data.getMetricsAll.items) {
    if (item.type === todayDateObject.dateString) {
      immutascanToday = item;
    } else if (item.type === yesterdayDateObject.dateString) {
      immutascanYesterday = item;
    }
  }

  const immutascan = {
    totalSales: parseFloat(immutascanToday.trade_volume_usd).toFixed(2),
    change:
      parseFloat(
        (immutascanToday.trade_volume_usd -
          immutascanYesterday.trade_volume_usd) /
          immutascanYesterday.trade_volume_usd
      ).toFixed(2) * 100,
  };

  console.log({
    cryptoslam: cryptoslam,
    immutascan: immutascan,
  });
}

exports.fetchChartData = fetchChartData;
