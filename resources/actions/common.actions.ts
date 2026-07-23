import { Page } from '@playwright/test';
import BasePage from './Base';
import { getBaseUrl } from '../../dataobjects/config';
import * as CommonPage from '../../page/common.page';
import * as LoginPage from '../../page/login.page';

class CommonActions extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    async openBaseUrl(): Promise<void> {
        await this.openUrl(getBaseUrl());
        return await super.waitForPageLoad();
    }

    async CheckSwabLogedIn(text: string): Promise<void> {
        await this.isElementVisible(CommonPage.swagLogo);
        await this.verifyElementText(CommonPage.swagLogo, text);
    }

    async checkToastMessage(text: string): Promise<void> {
        await this.verifyElementText(LoginPage.LoginToastMessage, text);
    }

    async logout(): Promise<void> {
        await this.waitAndClick(CommonPage.burgerMenuButton);
        await this.waitAndClick(CommonPage.logoutButton);
    }
}

export default CommonActions;