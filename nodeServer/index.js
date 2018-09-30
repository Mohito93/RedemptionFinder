// const rp = require('request-promise');
// const cheerio = require('cheerio');
//
// const url = 'https://www.britishairways.com/travel/redeem/execclub/_gf/en_gb';
//

//
// const options = {
//     uri: `https://www.britishairways.com/en-gb/home`,
//     transform: function (body) {
//         return cheerio.load(body);
//     }
// };
//
// rp(options)
//     .then(function(html){
//         //success!
//         console.log(html);
//     })
//     .catch(function(err){
//         //handle error
//         console.log(err)
//     });

const puppeteer = require('puppeteer');
const $ = require('cheerio');
var sleep = require('sleep');

async function runBA() {
    const username = '23386157'
    const pw = 'Test1234'
    const url = 'https://www.britishairways.com/travel/redeem/execclub/_gf/en_gb';

    const loginId = '#loginid'
    const password = '#password'
    const submit = '#navLoginForm > div:nth-child(5) > div > button'

    const fromPicker = '#departurePoint'
    const toPicker = '#destinationPoint'
    const london = 'London, United Kingdom, LON, London (All Airports)'
    const bombay = 'Mumbai, India, BOM, Chhatrapati Shivaji Intl'

    const departPicker = '#departInputDate'
    const returnPicker = '#returnInputDate'
    const departDate = '#departInputDate_table > tbody > tr:nth-child(5) > td:nth-child(6) > div'
    const returnDateNext = '#returnInputDate_root > div > div > div > div > div.picker__header > div.picker__nav--next'
    const returnDate = '#returnInputDate_table > tbody > tr:nth-child(5) > td:nth-child(4) > div'

    const getFlights = '#submitBtn'

    const browser = await puppeteer.launch({
        headless: false
    });

    const page = await browser.newPage();

    // await page.goto('https://github.com');
    // await page.screenshot({ path: 'screenshots/github.png' });

    await page.goto(url);

    // dom element selectors
    const USERNAME_SELECTOR = '#membershipNumber';
    const PASSWORD_SELECTOR = '#input_password';
    const BUTTON_SELECTOR = '#ecuserlogbutton';

    await page.click(USERNAME_SELECTOR);
    await page.keyboard.type(username);

    await page.click(PASSWORD_SELECTOR);
    await page.keyboard.type(pw);

    await page.click(BUTTON_SELECTOR);
    await page.waitForNavigation();

    await page.click(fromPicker)
    await page.keyboard.type(london)

    await page.click(toPicker)
    await page.keyboard.type(bombay)

    await page.click(departPicker)
    await page.keyboard.type(departDate)

    await page.click(returnPicker)
    await page.click(returnDateNext)
    await page.click(returnDate)

    await page.click(getFlights)
    await page.waitForNavigation();

}

async function runSQ() {
    const url = 'https://www.singaporeair.com/kfLogin.form';

    const username = '8814634208';
    const pw = '376264';

    const stupidFormDecline = 'body > div.insider-opt-in-notification > div > div:nth-child(3) > div.insider-opt-in-notification-button-container > div.insider-opt-in-notification-button.insider-opt-in-disallow-button'

    const cookiesTag = '#container > aside.popup-1.popup--cookie.cookie-close.popup--cookie-continue'
    const continueBtn = '#container > aside.popup-1.popup--cookie.cookie-close.popup--cookie-continue > div > div > a > div';

    const browser = await puppeteer.launch({
        headless: false
    });

    const page = await browser.newPage();

    // await page.goto('https://github.com');
    // await page.screenshot({ path: 'screenshots/github.png' });

    await page.goto(url);

    // dom element selectors
    const USERNAME_SELECTOR = '#membership-1';
    const PASSWORD_SELECTOR = '#membership-pin';
    const BUTTON_SELECTOR = '#login';

    await page.waitForSelector('body > div.insider-opt-in-notification');

    await page.click(stupidFormDecline);

    await page.click(USERNAME_SELECTOR);
    await page.keyboard.type(username);

    await page.waitForSelector(cookiesTag);
    await page.click(continueBtn);

    await page.click(PASSWORD_SELECTOR);
    await page.keyboard.type(pw);

    await page.click(BUTTON_SELECTOR);
    await page.waitForNavigation();

}

runSQ();