import test from '../fixture/webfixture';
import { LOGIN } from '../data/testdata/pageTexts.data';

test.beforeEach(async ({ common, login }) => {
    await common.openBaseUrl();
    await login.loginUser(LOGIN.logoText);
});

test.describe('Product Tests', () => {

    test('User is able view available products', async ({ products }) => {
        await products.swagProductsIsVisible();
    });

});

test.afterEach(async ({ login }) => {
    await login.logoutUser();
});