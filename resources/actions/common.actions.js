import BasePage from "./Base";
import { getBaseUrl } from "../../dataobjects/config";
import * as CommonPage from "../../page/common.page";

class CommonActions extends BasePage {

constructor(page){
    super(page);
}

    async openBaseUrl(){
        await this.openUrl(getBaseUrl());
        return await super.waitForPageLoad();

    }

    async CheckSwabLogedIn(text){

        await this.isElementVisible(CommonPage.swagLogo);
        await this.verifyText(CommonPage.swagLogo, text);

    }
}

export default CommonActions;