const {expect} = require('chai');
const puppeteer = require('puppeteer');

describe('sample test', function () {
  // Define global variables
  let browser;
  let page;

  before(async function () {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  })

  beforeEach(async function () {
    page = await browser.newPage();
    await page.goto('http://localhost:9000')
  })

  afterEach(async function () {
    await page.close()
  })

  after(() => {
    browser.close()
  })

  it('input field should exist on the page', async function () {

    const text = await page.evaluate(() => document.getElementById('item').placeholder)
    expect(text).to.equal('Enter an activity..');
  })

  it('should add item to the list', async function () {
    const expectedInput = 'Learn async/await construction'

    // Type new item
    await page.type('#item', expectedInput)

    // Click on the `Add` button
    await page.click('#add')

    // Wait for selector with items
    await page.waitForSelector('#todo li');

    // Get textContent of the first
    const createdTask = await page.evaluate(() => document.querySelector('#todo li').textContent)

    // Compare actual text with expected input
    expect(createdTask).to.equal(expectedInput)

    await page.screenshot({path: 'test/screens/item.png'});
  })
})