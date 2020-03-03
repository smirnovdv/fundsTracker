const puppeeter = require('puppeteer');

async function scrapeData(ticker) {
    const browser = await puppeeter.launch();
    const page = await browser.newPage();
    await page.goto(`https://finviz.com/quote.ashx?t=${ticker}`);
    const mcap = await page.$eval(`body > table:nth-child(5) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(7) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > b`, e => e.innerText);
    const ernDate = await page.$eval(`body > table:nth-child(5) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(7) > td > table > tbody > tr:nth-child(11) > td:nth-child(6) > b`, e => e.innerText);
    const instOwn = await page.$eval(`body > table:nth-child(5) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(7) > td > table > tbody > tr:nth-child(3) > td:nth-child(8) > b`, e => e.innerText);
    const float = await page.$eval(`body > table:nth-child(5) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(7) > td > table > tbody > tr:nth-child(2) > td:nth-child(10) > b`, e => e.innerText);
    let data = `Ticker: ${ticker}
    Mcap: $${mcap}
    earnings date: ${ernDate}
    institutional ownership: ${instOwn}
    Float: ${float}`

    await browser.close();
    console.log(data);
};

scrapeData('AAPL');