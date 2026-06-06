import test from '../fixture/webfixture'


test.beforeEach(async ({ common, login }) => {

    await common.openBaseUrl();
     await login.loginUser();
});

test.describe('Product Tests', () => {

    test('User is able view available products ', async ({ products }) => {
        await products.swagProductsIsVisible();
    });

});

test.afterEach(async ({ login }) => {
    await login.logoutUser();
});

