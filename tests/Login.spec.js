import test from '../fixture/webfixture'


test.beforeEach(async ({ common, login }) => {

    await common.openBaseUrl();
});

test.describe('Login Tests', () => {


    test('Login with valid credentials', async ({ login }) => {
        await login.loginUser();
        CheckSwabLogedIn("Swag Labs");

    });

});



