import test from '../fixture/webfixture';
import { LOGIN } from '../data/testdata/pageTexts.data';

test.beforeEach(async ({ common, login }) => {
    await common.openBaseUrl();
});

test.describe('Login Tests', () => {

    test('Login with valid credentials', async ({ login }) => {
        await login.loginUser(LOGIN.logoText);
        await login.verifyPageLogoText(LOGIN.logoText);
    });

    test('Login and Logout with valid credentials', async ({ login }) => {
        await login.loginUser(LOGIN.logoText);
        await login.verifyPageLogoText(LOGIN.logoText);
        await login.logoutUser();
    });

    test('Login with Lockout Account', async ({ login }) => {
        await login.loginLockout(LOGIN.errorMessages.lockedOut);
       
    });

});

test.afterEach(async ({ page }) => {
    await page.close();
});