import {test as fixture} from '@playwright/test';
import CommonActions from '../resources/actions/common.actions';
import LoginAction from '../resources/actions/login.action';


const test = fixture.extend({
    common: async ({ page }, use) => {
        await use(new CommonActions(page))
    },
    login: async ({ page }, use) => {
        await use(new LoginAction(page))
    }
})

export default test;