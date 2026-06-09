import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

test.describe('Allure Annotations & Trace Demo Suite', () => {
  
  test('Demo test - Intentional Failure (NG)', async ({ page }) => {
    // Allure metadata annotations
    await allure.epic('E-Commerce Core');
    await allure.feature('Shopping Cart');
    await allure.story('Add Items to Cart');
    await allure.severity('critical');
    await allure.owner('QA Automation Lead');
    await allure.tags('regression', 'cart', 'failing-test');
    await allure.description('This is a test case designed to fail (NG) in order to verify that Allure successfully captures the trace viewer file.');

    // Step 1: Open Home Page
    await allure.step('Open Playwright home page', async () => {
      await page.goto('https://playwright.dev/');
    });

    // Step 2: Navigate to Docs
    await allure.step('Navigate to Docs page by clicking Get Started', async () => {
      await page.getByRole('link', { name: 'Get started' }).click();
    });

    // Step 3: Verify Heading (Intentional Failure)
    await allure.step('Assert heading contains wrong text (NG expectation)', async () => {
      // The heading is actually "Installation", but we assert it is "Wrong Heading Text" to fail the test.
      const heading = page.getByRole('heading', { name: 'Installation' });
      await expect(heading).toHaveText('Wrong Heading Text', { timeout: 3000 });
    });
  });

  test('Demo test - Success (OK)', async ({ page }) => {
    await allure.epic('E-Commerce Core');
    await allure.feature('Shopping Cart');
    await allure.story('Cart Checkout Page');
    await allure.severity('normal');
    await allure.owner('QA Automation Lead');
    await allure.tags('smoke', 'cart');
    await allure.description('This is a demo test that passes successfully to show comparison in Allure.');

    await allure.step('Open Playwright home page', async () => {
      await page.goto('https://playwright.dev/');
    });

    await allure.step('Verify page title contains Playwright', async () => {
      await expect(page).toHaveTitle(/Playwright/);
    });
  });
});
