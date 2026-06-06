import { getUsername, getPassword } from "../../dataobjects/config"; 
import CommonActions from './common.actions'
import * as CommonPage from "../../page/common.page";
import * as ProductPage from "../../page/product.Page";


class swagProduct extends CommonActions {

    constructor(page){
        super(page);
    }

    async swagProductsIsVisible(){
        await this.verifyElementVisible(CommonPage.swagLogo);
         await this.verifyElementVisible(CommonPage.swagLogo);
          await this.verifyElementVisible(CommonPage.swagLogo);
           await this.verifyElementVisible(CommonPage.swagLogo);
        

    }

    /**
     * Verifies that the page logo matches the expected text.
     * Uses verifyElementText inherited from Verification through BasePage -> CommonActions -> LoginAction
     * @param {string} expectedText - The expected title text
     * @param {number} [timeout=5] - Timeout in seconds
     */
    async verifyPageLogoText(expectedText, timeout = 5) {
        await this.verifyElementText(CommonPage.swagLogo, expectedText, timeout);
    }


}   
export default swagProduct;
