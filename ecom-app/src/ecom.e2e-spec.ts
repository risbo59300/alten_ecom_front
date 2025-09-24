import { browser, by, element, ExpectedConditions } from 'protractor';

describe('E-commerce App E2E', () => {
  beforeEach(() => {
    browser.get('/products');
  });

  it('should display products page', async () => {
    const title = element(by.css('h2'));
    await browser.wait(ExpectedConditions.presenceOf(title), 5000);
    expect(await title.getText()).toContain('Nos Produits');
  });

  it('should add product to cart', async () => {
    const addButton = element(by.css('button[color="primary"]'));
    await browser.wait(ExpectedConditions.elementToBeClickable(addButton), 5000);
    await addButton.click();

    const cartBadge = element(by.css('.cart-badge'));
    await browser.wait(ExpectedConditions.presenceOf(cartBadge), 5000);
    expect(await cartBadge.getText()).toBe('1');
  });

  it('should navigate to cart and display items', async () => {
    // Add product first
    const addButton = element(by.css('button[color="primary"]'));
    await addButton.click();

    // Navigate to cart
    const cartLink = element(by.css('a[routerLink="/cart"]'));
    await cartLink.click();

    const cartItems = element.all(by.css('.cart-item-card'));
    expect(await cartItems.count()).toBe(1);
  });

  it('should complete contact form', async () => {
    browser.get('/contact');

    const emailInput = element(by.css('input[formControlName="email"]'));
    const messageInput = element(by.css('textarea[formControlName="message"]'));
    const submitButton = element(by.css('button[type="submit"]'));

    await emailInput.sendKeys('test@example.com');
    await messageInput.sendKeys('Test message');
    await submitButton.click();

    const successMessage = element(by.css('.success-snackbar'));
    await browser.wait(ExpectedConditions.presenceOf(successMessage), 5000);
  });
});
