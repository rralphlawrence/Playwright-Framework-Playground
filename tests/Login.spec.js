import test from '../fixture/webfixture'


test.beforeEach(async ({ common, login }) => {

    await common.openBaseUrl();
});

test.describe('Login Tests', () => {


    test('Login with valid credentials', async ({ login }) => {
        await login.loginUser();
        // Using verifyElementText inherited from Verification 
        // through BasePage -> CommonActions -> LoginAction
        await login.verifyPageLogoText("Swag Labs");

    });

    test('Login and Logout with valid credentials', async ({ login }) => {
        await login.loginUser();
        await login.verifyPageLogoText("Swag Labs");
        await login.logoutUser();
    });

});

test.afterEach(async ({ page }) => {
    await page.close();
});

