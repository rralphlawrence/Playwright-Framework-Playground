import { test as fixture, Page } from '@playwright/test';
import CommonActions from '../resources/actions/common.actions';
import LoginAction from '../resources/actions/login.action';
import swagProduct from '../resources/actions/swagProduct.actions';

type MyFixtures = {
    common: CommonActions;
    login: LoginAction;
    products: swagProduct;
};

const test = fixture.extend<MyFixtures>({
    common: async ({ page }, use) => {
        await use(new CommonActions(page));
    },
    login: async ({ page }, use) => {
        await use(new LoginAction(page));
    },
    products: async ({ page }, use) => {
        await use(new swagProduct(page));
    }
});

export default test;
export const expect = fixture.expect;