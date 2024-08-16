import { test, expect } from '@playwright/test';

//Go to URL
test('Buscar con la lupa', async ({ page }) => {;
    await page.goto('https://www.amazon.es');

    // Accept cookies
    await page.locator('#sp-cc-accept').click();

    // Write
    await page.locator('#twotabsearchtextbox').fill('Playstation 5');

    // Press key

    await page.keyboard.press('Enter');

    // View results
    await expect(page.locator('#search')).toBeVisible();
    
    // img.s-image
    await page.locator('img.s-image').nth(2).click();
});

test.skip('Buscar con enter', async ({ page }) => {;
    await page.goto('https://www.amazon.es');
        
    // Accept cookies
    await page.locator('#sp-cc-accept').click();
        
    // Write
    await page.locator('#twotabsearchtextbox').fill('Playstation 5');
        
    // Click  MagGlass
    
    await page.locator('.nav-input[type="submit"]').click();
    
    // View results
    await expect(page.locator('#search')).toBeVisible();
    
        
    });