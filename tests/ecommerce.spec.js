
const { test, describe, beforeEach, afterEach, beforeAll, afterAll, expect } = require('@playwright/test');
const { chromium } = require('playwright');
const { LoginPage } = require('../pages/LoginPage');
const testData = require('../test_data/testdata.json');


let browser;
let context;
let page;

let loginPage;
const validLoginData = testData.valid_credentials;

describe('ECommerce Tests', async () => {
  beforeAll(async () => {
    browser = await chromium.launch();

  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    context = await browser.newContext({ acceptDownloads: true });
    page = await context.newPage();
    await page.goto('/');
    await page.getByRole('button', { name: 'Consent' }).click();
    loginPage = new LoginPage(page);
  });

  afterEach(async () => {
    await page.close();
    await context.close();
  })


  describe('Login Tests', async () => {

    validLoginData.forEach(({ email, password } = validLoginData) => {
      test(`Login with valid email ${email} and password ${password}`, async () => {
        await page.getByRole('link', { name: ' Signup / Login ' }).click();
        await loginPage.logIn(email, password);
        await expect(page.getByText(' Logout')).toBeVisible();;
      }); 
    });

    test("Login with invalid credentials and check the error message", async () => {
      let { email, password, errMsg } = testData.invalid_credentials;

      await page.getByRole('link', { name: ' Signup / Login ' }).click();
      await loginPage.logIn(email, password);
      let errMsgText = await page.locator('.login-form p').textContent();
      await expect(errMsgText === errMsg).toBeTruthy();
    });

    // test initially designed to fail in order to test the retry logic
    test.skip("Try to login with invalid credentials", async () => {
      let { email, password } = testData.invalid_credentials;

      await page.getByRole('link', { name: ' Signup / Login ' }).click();
      await loginPage.logIn(email, password);
      await expect(page.getByText(' Logout')).toBeVisible();;
    });
  })
})

