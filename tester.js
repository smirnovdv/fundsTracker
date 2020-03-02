const puppeeter = require('puppeteer');


async function scrape(url) {
    const browser = await puppeeter.launch();
    const page = await browser.newPage();
    await page.goto(url);
    for (let i = 1; i<100; i++) {
        const name = await page.$eval(`#current_holdings_table > tbody > tr:nth-child(${i}) > td:nth-child(1)`,e => e.innerText)
        const value = await page.$eval(`#current_holdings_table > tbody > tr:nth-child(${i}) > td:nth-child(6)`,e => e.innerText)
        console.log(name + ' ' + value)
    }



    await browser.close();

}

scrape('https://whalewisdom.com/filer/dafna-capital-management-llc#tabholdings_tab_link');
