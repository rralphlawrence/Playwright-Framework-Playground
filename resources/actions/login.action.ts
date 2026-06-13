import { Page } from '@playwright/test';
import { getUsername, getPassword } from '../../dataobjects/config';
import * as LoginPage from '../../page/login.page';
import CommonActions from './common.actions';
import * as CommonPage from '../../page/common.page';

class LoginAction extends CommonActions {

    constructor(page: Page) {
        super(page);
    }

    async loginUser(text?: string): Promise<void> {
        await this.waitAndFill(LoginPage.LoginUsername, getUsername());
        await this.waitAndFill(LoginPage.LoginPassword, getPassword());
        await this.waitAndClick(LoginPage.LoginButton);
        if (text) {
            await this.CheckSwabLogedIn(text);
        }
    }

    async logoutUser(): Promise<void> {
        await this.logout();
        await this.verifyElementVisible(LoginPage.LoginButton);
    }

    async verifyPageLogoText(expectedText: string, timeout: number = 5): Promise<void> {
        await this.verifyElementText(CommonPage.swagLogo, expectedText, timeout);
    }

    

}

export default LoginAction;