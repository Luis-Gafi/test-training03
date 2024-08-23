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

// Función para agregar el producto al carrito
async function addToCart(page) {
    // Localiza el botón de añadir al carrito y haz clic en él
    await page.locator('#add-to-cart-button').click();
}

// Función para verificar que el producto ha sido añadido al carrito
async function verifyProductInCart(page) {
    // Navega al carrito
    await page.locator('a#nav-cart').click();
    
    // Verifica que el producto está en el carrito (esto puede variar según el diseño de Amazon)
    await expect(page.locator('.sc-list-item-content')).toBeVisible();
}

// Prueba de buscar, agregar al carrito y verificar
test('Buscar, agregar y verificar en carrito', async ({ page }) => {
    await navigateAndAcceptCookies(page);
    await searchForItem(page, 'Playstation 5');
    await page.keyboard.press('Enter');
    await verifySearchResultsVisible(page);

    // Clic en la primera imagen del producto
    await page.locator('img.s-image').nth(0).click();

    // Espera a que la página del producto se cargue
    await page.waitForSelector('#add-to-cart-button');

    // Agregar el producto al carrito
    await addToCart(page);

    // Verificar que el producto ha sido añadido al carrito
    await verifyProductInCart(page);
});


// Prueba de buscar con Enter
test('Buscar con enter', async ({ page }) => {
    await navigateAndAcceptCookies(page);
    await searchForItem(page, 'Playstation 5');
    await page.locator('.nav-input[type="submit"]').click();
    await verifySearchResultsVisible(page);
});
