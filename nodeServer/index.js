// const rp = require('request-promise');
// const cheerio = require('cheerio');
//
// const url = 'https://www.britishairways.com/travel/redeem/execclub/_gf/en_gb';
//
const username = '23386157'
const pw = 'Test1234'
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
const url = 'https://www.britishairways.com/travel/redeem/execclub/_gf/en_gb';

const loginId = '#loginid'
const password = '#password'
const submit = '#navLoginForm > div:nth-child(5) > div > button'


async function run() {
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
}

run();