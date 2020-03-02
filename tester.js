const puppeeter = require('puppeteer');


async function scrape(url) {
    const browser = await puppeeter.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const rowsAvailable = await page.$eval(`#current_holdings_table > tbody`,e => e.childNodes.length)
    for (let i = 1; i<rowsAvailable; i++) {
        const name = await page.$eval(`#current_holdings_table > tbody > tr:nth-child(${i}) > td:nth-child(1)`,e => e.innerText)
        const share = await page.$eval(`#current_holdings_table > tbody > tr:nth-child(${i}) > td:nth-child(6)`,e => e.innerText)
        const change = await page.$eval(`#current_holdings_table > tbody > tr:nth-child(${i}) > td:nth-child(10)`,e => e.innerText)
        console.log(name + ' ' + share + ' ' + change)
    }



    await browser.close();

}

scrape('https://whalewisdom.com/filer/dafna-capital-management-llc#tabholdings_tab_link');
