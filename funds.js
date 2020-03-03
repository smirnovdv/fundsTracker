const puppeeter = require('puppeteer');

const fundURLs = {
    'DAFNA LifeScience Ltd.': 'https://whalewisdom.com/filer/dafna-capital-management-llc#tabholdings_tab_link',
    'Corsair Capital Partners L.P.': 'https://whalewisdom.com/filer/corsair-capital-management-llc',
    'Strategos Fund, L.P. ': 'https://whalewisdom.com/filer/archon-capital-management-llc',
    'SEG Partners, L.P. ': 'https://whalewisdom.com/filer/select-equity-group-inc',
    'Crosslink Partners, L.P. ': 'https://whalewisdom.com/filer/crosslink-capital-inc',
    'P.A.W. Small Capital Partners LP ': 'https://whalewisdom.com/filer/p-a-w-capital-corp',
    'Polar Capital Gl. Insurance Fund I Acc GBP ': 'https://whalewisdom.com/filer/polar-capital-llp',
    'Apis Global Deep Value, L.P. ': 'https://whalewisdom.com/filer/apis-capital-advisors-llc',
    'RiverNorth Capital Partners, L.P. ': 'https://whalewisdom.com/filer/rivernorth-capital-management-inc',
    'Hawk Ridge Partners L.P. ': 'https://whalewisdom.com/filer/hawk-ridge-management-llc',
    'Hawk Ridge Partners L.P. - ack ': 'https://whalewisdom.com/filer/ack-asset-management-llc',
    'Old Kings Capital, L.P. ': 'https://whalewisdom.com/filer/goodnow-investment-group-llc',
    'Financial Opportunity Fund LLC (FJ Capital)': 'https://whalewisdom.com/filer/fj-capital-management-llc',
    'Sivik Healthcare Offshore Fund, LTD': 'https://whalewisdom.com/filer/sivik-global-healthcare-llc',
    'Shannon River LP ': 'https://whalewisdom.com/filer/shannon-river-fund-management-co-llc',
    'Greenwoods China A-share Opportunities F ': 'https://whalewisdom.com/filer/greenwoods-asset-management-ltd'
}

function getRowData(page, row, column) {
    return page.$eval(`#current_holdings_table > tbody > tr:nth-child(${row}) > td:nth-child(${column})`, e => e.innerText)
}
async function scrapeFundsData(urls) {
    const browser = await puppeeter.launch();
    const page = await browser.newPage();
    for (i in urls) {
        await page.goto(urls[i]);
        const rowsAvailable = await page.$eval(`#current_holdings_table > tbody`, e => e.childNodes.length);
        for (let i = 1; i < rowsAvailable; i++) {
            const name = await getRowData(page, i, 1);
            const share = await getRowData(page, i, 6);
            const change = await getRowData(page, i, 10);
            console.log(i + ' ' + name + ' ' + share + ' ' + change)
        };
    };
    await browser.close();
};

scrapeFundsData(fundURLs);