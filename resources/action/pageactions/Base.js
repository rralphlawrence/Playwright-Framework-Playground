import {expect} from '@playwright/test';
import Verification from '../../../utiility/verifications';

class BasePage extends Verification {

    constructor(page){
        super(page);
        this.page = page;
    }

    async openUrl(url){
        await this.page.goto(url);
    }

    async getPageTitle(){
        return await this.page.title();
    }

    async getPageUrl(){
        return await this.page.url();
    }

    async reloadPage(){
        await this.page.reload();
    }

    async wait(timeout=1){
        return await this.page.waitForTimeout(timeout*1000);
    }

    async waitForPageLoad(){
        await this.page.waitForLoadState('domcontentloaded');
    }

    async waitForElement(selector, timeout=5){
        await this.page.waitForSelector(selector, {state: 'visible', timeout: timeout*1000});
    }

    async waitAndClick(selector){
        
        await this.page.click(selector);
    }

      async waitAndDoubleClick(selector){
        await this.page.dblclick(selector);
    }

      async waitAndFill(selector, value){
        await this.page.focus(selector);
        await this.keyPress(selector ,'Control+A');
        await this.keyPress(selector ,'Backspace');
        await this.page.fill(selector, value);
    }

    async waitAndType(selector, value){
        await this.page.focus(selector);
        await this.keyPress(selector ,'Control+A');
        await this.keyPress(selector ,'Backspace');
        await this.page.type(selector, value);
    }

    async tick(selector){
        const isChecked = await this.page.isChecked(selector);
        if(!isChecked){
            await this.page.check(selector);
        }   
    }

    async keyPress(selector, key){
        await this.page.press(selector, key);
    }

    async takeScreenshot(){
        return expect(await this.page.screenshot()).toMatchSnapshot('MyScreenshot.png');
    }

    async selectValueFromDropdown(selector, text){
        const dropdown = await this.page.$(selector);
        return await dropdown.selectOption({ value: text });
    }
    async selectTextOptionsFromDropdown(selector, options){
        await this.page.click(selector);
        await this.page.click(CommonPage.dropdownOption(options));
    }

    async getTextFromElement(selector){
        const text = await this.page.$(selector);
        return await text.textContent();
    }

    async getAlltextFromElements(selector){

        const texts = await this.page.locator(selector).allTextContents();
        return texts;
    }

    async getElementCounnt(selector){
        const elements = await this.page.$$(selector);
        return elements.length;
    }   

    async clickAllElements(selector){
        const elements = await this.page.$$(selector);
        for(const element of elements){
            await element.click();
        }   

    }


}   

export default BasePage;