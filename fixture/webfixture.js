import {test as fixture} from '@playwright/test';
import CommonActions from '../resources/actions/common.actions';
import LoginAction from '../resources/actions/login.action';
import swagProduct from '../resources/actions/swagProduct.actions';


const test = fixture.extend({
    common: async ({ page }, use) => {
        await use(new CommonActions(page))
    },
    login: async ({ page }, use) => {
        await use(new LoginAction(page))
    },
    products: async ({ page }, use) => {
        await use(new swagProduct(page))
    }
})

export default test;