import { expect, Page, Locator } from '@playwright/test';

class Verification {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // ─────────────────────────────────────────────
    // Element State Assertions
    // ─────────────────────────────────────────────

    async verifyElementVisible(selector: string, timeout: number = 5): Promise<void> {
        const element: Locator = this.page.locator(selector);
        try {
            await expect(element).toBeVisible({ timeout: timeout * 1000 });
        } catch (error) {
            throw new Error(`Expected element "${selector}" to be visible, but it was not.`);
        }
    }

    async verifyAllElementsVisible(selector: string, timeout: number = 5): Promise<void> {
        const elements: Locator = this.page.locator(selector);
        const count: number = await elements.count();

        if (count === 0) {
            throw new Error(`Expected at least one element matching "${selector}" to exist, but none were found.`);
        }

        for (let i = 0; i < count; i++) {
            try {
                await expect(elements.nth(i)).toBeVisible({ timeout: timeout * 1000 });
            } catch (error) {
                throw new Error(
                    `Expected element ${i + 1} of ${count} matching "${selector}" to be visible, but it was not.`
                );
            }
        }
    }

    async verifyElementNotVisible(selector: string, timeout: number = 5): Promise<void> {
        const element: Locator = this.page.locator(selector);
        try {
            await expect(element).not.toBeVisible({ timeout: timeout * 1000 });
        } catch (error) {
            throw new Error(`Expected element "${selector}" to NOT be visible, but it was.`);
        }
    }

    async verifyElementEnabled(selector: string, timeout: number = 5): Promise<void> {
        const element: Locator = this.page.locator(selector);
        try {
            await expect(element).toBeEnabled({ timeout: timeout * 1000 });
        } catch (error) {
            throw new Error(`Expected element "${selector}" to be enabled, but it was not.`);
        }
    }

    async verifyElementDisabled(selector: string, timeout: number = 5): Promise<void> {
        const element: Locator = this.page.locator(selector);
        try {
            await expect(element).toBeDisabled({ timeout: timeout * 1000 });
        } catch (error) {
            throw new Error(`Expected element "${selector}" to be disabled, but it was not.`);
        }
    }

    async verifyElementChecked(selector: string, timeout: number = 5): Promise<void> {
        const element: Locator = this.page.locator(selector);
        try {
            await expect(element).toBeChecked({ timeout: timeout * 1000 });
        } catch (error) {
            throw new Error(`Expected element "${selector}" to be checked, but it was not.`);
        }
    }

    async verifyElementNotChecked(selector: string, timeout: number = 5): Promise<void> {
        const element: Locator = this.page.locator(selector);
        try {
            await expect(element).not.toBeChecked({ timeout: timeout * 1000 });
        } catch (error) {
            throw new Error(`Expected element "${selector}" to NOT be checked, but it was.`);
        }
    }

    async verifyElementCount(selector: string, count: number, timeout: number = 5): Promise<void> {
        const element: Locator = this.page.locator(selector);
        try {
            await expect(element).toHaveCount(count, { timeout: timeout * 1000 });
        } catch (error) {
            throw new Error(`Expected element "${selector}" to have count ${count}, but it did not.`);
        }
    }

    // ─────────────────────────────────────────────
    // Text / Value Assertions
    // ─────────────────────────────────────────────

    async verifyElementText(selector: string, expectedText: string | RegExp | string[], timeout: number = 5): Promise<void> {
        const element: Locator = this.page.locator(selector);
        try {
            await expect(element).toHaveText(expectedText, { timeout: timeout * 1000 });
        } catch (error) {
            throw new Error(`Expected element "${selector}" to have text "${expectedText}", but it did not.`);
        }
    }

    async verifyElementContainsText(selector: string, text: string | RegExp, timeout: number = 5): Promise<void> {
        const element: Locator = this.page.locator(selector);
        try {
            await expect(element).toContainText(text, { timeout: timeout * 1000 });
        } catch (error) {
            throw new Error(`Expected element "${selector}" to contain text "${text}", but it did not.`);
        }
    }

    async verifyElementTextNotEqual(selector: string, expectedText: string | RegExp | string[], timeout: number = 5): Promise<void> {
        const element: Locator = this.page.locator(selector);
        try {
            await expect(element).not.toHaveText(expectedText, { timeout: timeout * 1000 });
        } catch (error) {
            throw new Error(`Expected element "${selector}" to NOT have text "${expectedText}", but it did.`);
        }
    }

    async verifyInputValue(selector: string, value: string, timeout: number = 5): Promise<void> {
        const element: Locator = this.page.locator(selector);
        try {
            await expect(element).toHaveValue(value, { timeout: timeout * 1000 });
        } catch (error) {
            throw new Error(`Expected input "${selector}" to have value "${value}", but it did not.`);
        }
    }

    async verifyAttributeValue(selector: string, attribute: string, value: string | RegExp, timeout: number = 5): Promise<void> {
        const element: Locator = this.page.locator(selector);
        try {
            await expect(element).toHaveAttribute(attribute, value, { timeout: timeout * 1000 });
        } catch (error) {
            throw new Error(`Expected element "${selector}" to have attribute "${attribute}" with value "${value}", but it did not.`);
        }
    }

    // ─────────────────────────────────────────────
    // Page-Level Assertions
    // ─────────────────────────────────────────────

    async verifyPageTitle(expectedTitle: string | RegExp, timeout: number = 5): Promise<void> {
        try {
            await expect(this.page).toHaveTitle(expectedTitle, { timeout: timeout * 1000 });
        } catch (error) {
            throw new Error(`Expected page title to be "${expectedTitle}", but it was not.`);
        }
    }

    async verifyPageUrl(expectedUrl: string | RegExp, timeout: number = 5): Promise<void> {
        try {
            await expect(this.page).toHaveURL(expectedUrl, { timeout: timeout * 1000 });
        } catch (error) {
            throw new Error(`Expected page URL to be "${expectedUrl}", but it was not.`);
        }
    }

    async verifyPageUrlContains(urlPart: string, timeout: number = 5): Promise<void> {
        try {
            await expect(this.page).toHaveURL(new RegExp(urlPart), { timeout: timeout * 1000 });
        } catch (error) {
            throw new Error(`Expected page URL to contain "${urlPart}", but it did not.`);
        }
    }

    // ─────────────────────────────────────────────
    // Value Comparison Assertions
    // ─────────────────────────────────────────────

    verifyEquals(actual: unknown, expected: unknown, message?: string): void {
        try {
            expect(actual).toEqual(expected);
        } catch (error) {
            throw new Error(message ?? `Expected "${String(actual)}" to equal "${String(expected)}", but it did not.`);
        }
    }

    verifyContains(actual: string | unknown[], expected: unknown, message?: string): void {
        try {
            if (typeof actual === 'string') {
                expect(actual).toContain(expected as string);
            } else if (Array.isArray(actual)) {
                expect(actual).toContain(expected);
            } else {
                throw new Error(`verifyContains: unsupported type "${typeof actual}". Use a string or array.`);
            }
        } catch (error) {
            throw new Error(message ?? `Expected "${String(actual)}" to contain "${String(expected)}", but it did not.`);
        }
    }

    verifyNotContains(actual: string | unknown[], expected: unknown, message?: string): void {
        try {
            if (typeof actual === 'string') {
                expect(actual).not.toContain(expected as string);
            } else if (Array.isArray(actual)) {
                expect(actual).not.toContain(expected);
            } else {
                throw new Error(`verifyNotContains: unsupported type "${typeof actual}". Use a string or array.`);
            }
        } catch (error) {
            throw new Error(message ?? `Expected "${String(actual)}" to NOT contain "${String(expected)}", but it did.`);
        }
    }

    verifyIsTrue(value: unknown, message?: string): void {
        try {
            expect(value).toBeTruthy();
        } catch (error) {
            throw new Error(message ?? `Expected value to be truthy, but received "${String(value)}".`);
        }
    }

    verifyIsFalse(value: unknown, message?: string): void {
        try {
            expect(value).toBeFalsy();
        } catch (error) {
            throw new Error(message ?? `Expected value to be falsy, but received "${String(value)}".`);
        }
    }

    verifyIsNull(value: unknown, message?: string): void {
        try {
            expect(value == null).toBe(true);
        } catch (error) {
            throw new Error(message ?? `Expected value to be null/undefined, but received "${String(value)}".`);
        }
    }

    verifyIsNotNull(value: unknown, message?: string): void {
        try {
            expect(value).not.toBeNull();
            expect(value).not.toBeUndefined();
        } catch (error) {
            throw new Error(message ?? `Expected value to NOT be null/undefined, but it was.`);
        }
    }

    verifyLength(value: string | unknown[], expectedLength: number, message?: string): void {
        try {
            expect(value).toHaveLength(expectedLength);
        } catch (error) {
            throw new Error(message ?? `Expected length to be ${expectedLength}, but received ${value?.length}.`);
        }
    }

    verifyHasObject(actual: Record<string, unknown> | unknown[], expectedObject: Record<string, unknown>, message?: string): void {
        try {
            if (Array.isArray(actual)) {
                expect(actual).toContainEqual(expectedObject);
            } else {
                expect(actual).toMatchObject(expectedObject);
            }
        } catch (error) {
            throw new Error(message ?? `Expected object to contain "${JSON.stringify(expectedObject)}", but it did not.`);
        }
    }

    verifyNotEquals(actual: unknown, expected: unknown, message?: string): void {
        try {
            expect(actual).not.toEqual(expected);
        } catch (error) {
            throw new Error(message ?? `Expected "${String(actual)}" to NOT equal "${String(expected)}", but it did.`);
        }
    }

    verifyGreaterThan(actual: number, expected: number, message?: string): void {
        try {
            expect(actual).toBeGreaterThan(expected);
        } catch (error) {
            throw new Error(message ?? `Expected ${actual} to be greater than ${expected}, but it was not.`);
        }
    }

    verifyLessThan(actual: number, expected: number, message?: string): void {
        try {
            expect(actual).toBeLessThan(expected);
        } catch (error) {
            throw new Error(message ?? `Expected ${actual} to be less than ${expected}, but it was not.`);
        }
    }

    verifyMatchesPattern(value: string, pattern: RegExp | string, message?: string): void {
        try {
            expect(value).toMatch(pattern);
        } catch (error) {
            throw new Error(message ?? `Expected "${value}" to match pattern "${pattern}", but it did not.`);
        }
    }

    verifyIsEmpty(value: string | unknown[] | Record<string, unknown>, message?: string): void {
        try {
            if (typeof value === 'string' || Array.isArray(value)) {
                expect(value).toHaveLength(0);
            } else {
                expect(Object.keys(value)).toHaveLength(0);
            }
        } catch (error) {
            throw new Error(message ?? `Expected value to be empty, but it was not.`);
        }
    }

    verifyIsNotEmpty(value: string | unknown[] | Record<string, unknown>, message?: string): void {
        try {
            if (typeof value === 'string' || Array.isArray(value)) {
                expect(value.length).toBeGreaterThan(0);
            } else {
                expect(Object.keys(value).length).toBeGreaterThan(0);
            }
        } catch (error) {
            throw new Error(message ?? `Expected value to NOT be empty, but it was.`);
        }
    }

    // ─────────────────────────────────────────────
    // Soft Assertions
    // ─────────────────────────────────────────────

    async softVerifyElementVisible(selector: string, timeout: number = 5): Promise<void> {
        const softExpect = expect.soft(this.page.locator(selector));
        await softExpect.toBeVisible({ timeout: timeout * 1000 });
    }

    async softVerifyElementText(selector: string, text: string | RegExp, timeout: number = 5): Promise<void> {
        const softExpect = expect.soft(this.page.locator(selector));
        await softExpect.toHaveText(text, { timeout: timeout * 1000 });
    }

    softVerifyEquals(actual: unknown, expected: unknown, message?: string): void {
        const softExpect = expect.soft(actual, message);
        softExpect.toEqual(expected);
    }

    softVerifyIsTrue(value: unknown, message?: string): void {
        const softExpect = expect.soft(value, message);
        softExpect.toBeTruthy();
    }

    softVerifyIsFalse(value: unknown, message?: string): void {
        const softExpect = expect.soft(value, message);
        softExpect.toBeFalsy();
    }

}

export default Verification;