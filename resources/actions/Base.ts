import { expect, Page, Locator, Response } from '@playwright/test';
import Verification from '../../utility/verifications';

class BasePage extends Verification {

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async openUrl(url: string): Promise<Response | null> {
        return await this.page.goto(url);
    }

    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    async getPageUrl(): Promise<string> {
        return await this.page.url();
    }

    async reloadPage(): Promise<void> {
        await this.page.reload();
    }

    async wait(timeout: number = 1): Promise<void> {
        return await this.page.waitForTimeout(timeout * 1000);
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
    }

    async waitForElement(selector: string, timeout: number = 5): Promise<void> {
        await this.page.waitForSelector(selector, { state: 'visible', timeout: timeout * 1000 });
    }

    async waitAndClick(selector: string): Promise<void> {
        await this.page.click(selector);
    }

    async waitAndDoubleClick(selector: string): Promise<void> {
        await this.page.dblclick(selector);
    }

    async waitAndFill(selector: string, value: string): Promise<void> {
        await this.page.focus(selector);
        await this.keyPress(selector, 'Control+A');
        await this.keyPress(selector, 'Backspace');
        await this.page.fill(selector, value);
    }

    async waitAndType(selector: string, value: string): Promise<void> {
        await this.page.focus(selector);
        await this.keyPress(selector, 'Control+A');
        await this.keyPress(selector, 'Backspace');
        await this.page.type(selector, value);
    }

    async tick(selector: string): Promise<void> {
        const isChecked = await this.page.isChecked(selector);
        if (!isChecked) {
            await this.page.check(selector);
        }
    }

    async keyPress(selector: string, key: string): Promise<void> {
        await this.page.press(selector, key);
    }

    async takeScreenshot(): Promise<void> {
        expect(await this.page.screenshot()).toMatchSnapshot('MyScreenshot.png');
    }

    async selectValueFromDropdown(selector: string, text: string): Promise<string[]> {
        const dropdown: Locator = this.page.locator(selector);
        return await dropdown.selectOption({ value: text });
    }

    async getTextFromElement(selector: string): Promise<string | null> {
        const text = await this.page.$(selector);
        return await text!.textContent();
    }

    async getAlltextFromElements(selector: string): Promise<string[]> {
        const texts: string[] = await this.page.locator(selector).allTextContents();
        return texts;
    }

    async getElementCounnt(selector: string): Promise<number> {
        const elements = await this.page.$$(selector);
        return elements.length;
    }

    async clickAllElements(selector: string): Promise<void> {
        const elements = await this.page.$$(selector);
        for (const element of elements) {
            await element.click();
        }
    }

    async getAttributeValue(selector: string, attribute: string): Promise<string | null> {
        const element = await this.page.$(selector);
        return await element!.getAttribute(attribute);
    }

    async isElementEnable(selector: string): Promise<boolean> {
        const element = await this.page.$(selector);
        await this.wait();
        const isEnable: boolean = await element!.isEnabled();
        return isEnable;
    }

    async isElementVisible(selector: string): Promise<boolean> {
        try {
            await this.verifyElementVisible(selector);
            return true;
        } catch (error) {
            return false;
        }
    }

    async waitUntilElementIsNotVisible(selector: string, timeout: number = 5): Promise<void> {
        const element: Locator = this.page.locator(selector);
        await this.wait();
        try {
            await expect(element).toHaveCount(0, { timeout: timeout * 1000 });
        } catch (error) {
            throw new Error(`Element ${selector} is still visible after ${timeout} seconds`);
        }
    }

}

export default BasePage;