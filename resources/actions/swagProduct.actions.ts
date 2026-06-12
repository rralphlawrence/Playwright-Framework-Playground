import { Page } from '@playwright/test';
import CommonActions from './common.actions';
import * as ProductPage from '../../page/product.Page';

class swagProduct extends CommonActions {

    constructor(page: Page) {
        super(page);
    }

    async swagProductsIsVisible(): Promise<void> {
        await this.verifyAllElementsVisible(ProductPage.productImage);
        await this.verifyAllElementsVisible(ProductPage.productDescription);
        await this.verifyAllElementsVisible(ProductPage.productPrice);
        await this.verifyAllElementsVisible(ProductPage.productItem);
        await this.verifyAllElementsVisible(ProductPage.addToCartButton);
    }

}

export default swagProduct;