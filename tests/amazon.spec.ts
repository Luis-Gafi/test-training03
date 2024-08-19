import { test, expect } from '@playwright/test';

// Función para navegar a la página y aceptar cookies
async function navigateAndAcceptCookies(page) {
    await page.goto('https://www.amazon.es');
    await page.locator('#sp-cc-accept').click();
}

// Función para buscar un término en la barra de búsqueda
async function searchForItem(page, item) {
    await page.locator('#twotabsearchtextbox').fill(item);
}

// Función para verificar que los resultados de la búsqueda son visibles
async function verifySearchResultsVisible(page) {
    await expect(page.locator('#search')).toBeVisible();
}

// Prueba de buscar con la lupa
test('Buscar con la lupa', async ({ page }) => {
    await navigateAndAcceptCookies(page);
    await searchForItem(page, 'Playstation 5');
    await page.keyboard.press('Enter');
    await verifySearchResultsVisible(page);
    await page.locator('img.s-image').nth(2).click();
});

// Prueba de buscar con Enter
test.skip('Buscar con enter', async ({ page }) => {
    await navigateAndAcceptCookies(page);
    await searchForItem(page, 'Playstation 5');
    await page.locator('.nav-input[type="submit"]').click();
    await verifySearchResultsVisible(page);
});
