const puppeteer = require("puppeteer");

const pageUrl = "https://cryptoslam.io/";

// time intervals
const intervals = ["24h", "7d", "30d", "all"];

// compute a comparison of other chains with ImmutableX
function computeChainsComparison(arr) {
  const immutable = arr.filter((chain) => chain.name === "ImmutableX")[0];
  immutable.sales = parseInt(immutable.sales.slice(1).replaceAll(",", "")); // remove the $ icon at the prefix
  immutable.buyers = parseInt(immutable.buyers);
  immutable.sellers = parseInt(immutable.sellers);

  return arr.map((chain) => {
    if (chain.name === "ImmutableX") {
      return;
    }

    return {
      ...chain,
      sales:
        immutable.sales - parseFloat(chain.sales.slice(1).replaceAll(",", "")),
      buyers: immutable.buyers - parseInt(chain.buyers),
      sellers: immutable.sellers - parseInt(chain.sellers),
    };
  });
}

// scrape data from cryptoslam
async function scrapeLeaderboardData() {
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();
  await page.setJavaScriptEnabled(false);
  await page.goto(pageUrl);

  const output = [];

  for (let interval of intervals) {
    const tableRows = await page.$$(
      `#sales-rankings-${interval} div.sales-ranking-period__top-sales > div:nth-child(4) > table > tbody > tr`
    );

    const top10Chains = [];

    // each row display data for a single chain
    for (let i = 0; i < Math.min(10, tableRows.length); i += 1) {
      const row = tableRows[i];

      // const tableDataCells = await row.$$("td");

      const seq = await row.$eval("td:nth-child(1)", (node) => node.innerText);
      const name = await row.$eval(
        "td:nth-child(2) span.summary-sales-table__column-product-name",
        (node) => node.innerText
      );
      const sales = await row.$eval(
        "td:nth-child(3) > span > a > span",
        (node) => node.innerText
      );
      const buyers = await row.$eval(
        "td:nth-child(5)",
        (node) => node.innerText
      );
      const sellers = await row.$eval(
        "td:nth-child(6)",
        (node) => node.innerText
      );

      top10Chains.push({
        seq,
        name,
        sales,
        buyers,
        sellers,
      });
    }

    output.push({
      interval,
      top10Chains: computeChainsComparison(top10Chains),
    });
  }

  browser.close();

  return output;
}

exports.scrapeLeaderboardData = scrapeLeaderboardData;
