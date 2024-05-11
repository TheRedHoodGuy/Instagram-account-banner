const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter your Instagram username: ', async (username) => {
  rl.question('Enter your Instagram password: ', async (password) => {
    rl.question('Enter the name of the account to be terminated: ', async (accountName) => {
      const puppeteer = require('puppeteer');

      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();

      await page.goto('https://www.instagram.com');

      // Wait for username field to be visible and type username
      await page.waitForSelector('input[name="username"]', { visible: true });
      await page.type('input[name="username"]', username);

      // Wait for password field to be visible and type password
      await page.waitForSelector('input[name="password"]', { visible: true });
      await page.type('input[name="password"]', password);

      // Press Enter key to submit the form
      await page.keyboard.press('Enter');

      // Wait for the element with aria-describedby=":r4:" to be visible
      await page.waitForSelector('span[aria-describedby=":r4:"]');

      // Click on the element with aria-describedby=":r4:"
      await page.click('span[aria-describedby=":r4:"]');

      // Wait for the search input field to be visible
      await page.waitForSelector('input[aria-label="Search input"]');

      // Type the accountName into the search input field
      await page.type('input[aria-label="Search input"]', accountName);

      // Press Enter key to submit the search
      await page.keyboard.press('Enter');

      // Wait for the link with the accountName and click on it
      await page.waitForSelector(`a[href="/${accountName}/"]`);
      await page.click(`a[href="/${accountName}/"]`);



      // Keep the browser open for further interaction
    });
  });
});
