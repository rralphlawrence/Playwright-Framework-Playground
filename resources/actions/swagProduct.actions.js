import { getUsername, getPassword } from "../../dataobjects/config"; 
import CommonActions from './common.actions'
import * as CommonPage from "../../page/common.page";
import * as ProductPage from "../../page/product.Page";


class swagProduct extends CommonActions {

    constructor(page){
        super(page);
    }

    async swagProductsIsVisible(){
        await this.verifyElementVisible(ProductPage.productImage);
        await this.verifyElementVisible(ProductPage.productName);
        await this.verifyElementVisible(ProductPage.productDescription);
        await this.verifyElementVisible(ProductPage.productPrice);

    }

    /**
     * Verifies that the page logo matches the expected text.
     * Uses verifyElementText inherited from Verification through BasePage -> CommonActions -> LoginAction
     * @param {string} expectedText - The expected title text
     * @param {number} [timeout=5] - Timeout in seconds
     */


}   
export default swagProduct;
