import { test as fixture, Page } from '@playwright/test';
import CommonActions from '../resources/actions/common.actions';
import LoginAction from '../resources/actions/login.action';
import SwagProduct from '../resources/actions/swagProduct.actions';

type MyFixtures = {
    common: CommonActions;
    login: LoginAction;
    products: SwagProduct;
};

const test = fixture.extend<MyFixtures>({
    common: async ({ page }, use) => {
        await use(new CommonActions(page));
    },
    login: async ({ page }, use) => {
        await use(new LoginAction(page));
    },
    products: async ({ page }, use) => {
        await use(new SwagProduct(page));
    }
});

export default test;
export const expect = fixture.expect;