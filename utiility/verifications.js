import { expect } from '@playwright/test';

class Verification {

    constructor(page) {
        this.page = page;
    }

    // ─────────────────────────────────────────────
    // Element State Assertions
    // ─────────────────────────────────────────────

    async verifyElementVisible(selector, timeout = 5) {
        const element = this.page.locator(selector);
        try {
            await expect(element).toBeVisible({ timeout: timeout * 1000 });
        } catch (error) {
            throw new Error(`Expected element "${selector}" to be visible, but it was not.`);
        }
    }

    async verifyElementNotVisible(selector, timeout = 5) {
        const element = this.page.locator(selector);
        try {
            await expect(element).not.toBeVisible({ timeout: timeout * 1000 });
        } catch (error) {
            throw new Error(`Expected element "${selector}" to NOT be visible, but it was.`);
        }
    }

    async verifyElementEnabled(selector, timeout = 5) {
        const element = this.page.locator(selector);
        try {
            await expect(element).toBeEnabled({ timeout: timeout * 1000 });
        } catch (error) {
            throw new Error(`Expected element "${selector}" to be enabled, but it was not.`);
        }
    }

    async verifyElementDisabled(selector, timeout = 5) {
        const element = this.page.locator(selector);
        try {
            await expect(element).toBeDisabled({ timeout: timeout * 1000 });
        } catch (error) {
            throw new Error(`Expected element "${selector}" to be disabled, but it was not.`);
        }
    }

    async verifyElementChecked(selector, timeout = 5) {
        const element = this.page.locator(selector);
        try {
            await expect(element).toBeChecked({ timeout: timeout * 1000 });
        } catch (error) {
            throw new Error(`Expected element "${selector}" to be checked, but it was not.`);
        }
    }

    async verifyElementNotChecked(selector, timeout = 5) {
        const element = this.page.locator(selector);
        try {
            await expect(element).not.toBeChecked({ timeout: timeout * 1000 });
        } catch (error) {
            throw new Error(`Expected element "${selector}" to NOT be checked, but it was.`);
        }
    }

    async verifyElementCount(selector, count, timeout = 5) {
        const element = this.page.locator(selector);
        try {
            await expect(element).toHaveCount(count, { timeout: timeout * 1000 });
        } catch (error) {
            throw new Error(`Expected element "${selector}" to have count ${count}, but it did not.`);
        }
    }

    // ─────────────────────────────────────────────
    // Text / Value Assertions
    // ─────────────────────────────────────────────

    async verifyElementText(selector, expectedText, timeout = 5) {
        const element = this.page.locator(selector);
        try {
            await expect(element).toHaveText(expectedText, { timeout: timeout * 1000 });
        } catch (error) {
            throw new Error(`Expected element "${selector}" to have text "${expectedText}", but it did not.`);
        }
    }

    async verifyElementContainsText(selector, text, timeout = 5) {
        const element = this.page.locator(selector);
        try {
            await expect(element).toContainText(text, { timeout: timeout * 1000 });
        } catch (error) {
            throw new Error(`Expected element "${selector}" to contain text "${text}", but it did not.`);
        }
    }

    async verifyElementTextNotEqual(selector, expectedText, timeout = 5) {
        const element = this.page.locator(selector);
        try {
            await expect(element).not.toHaveText(expectedText, { timeout: timeout * 1000 });
        } catch (error) {
            throw new Error(`Expected element "${selector}" to NOT have text "${expectedText}", but it did.`);
        }
    }

    async verifyInputValue(selector, value, timeout = 5) {
        const element = this.page.locator(selector);
        try {
            await expect(element).toHaveValue(value, { timeout: timeout * 1000 });
        } catch (error) {
            throw new Error(`Expected input "${selector}" to have value "${value}", but it did not.`);
        }
    }

    async verifyAttributeValue(selector, attribute, value, timeout = 5) {
        const element = this.page.locator(selector);
        try {
            await expect(element).toHaveAttribute(attribute, value, { timeout: timeout * 1000 });
        } catch (error) {
            throw new Error(`Expected element "${selector}" to have attribute "${attribute}" with value "${value}", but it did not.`);
        }
    }

    // ─────────────────────────────────────────────
    // Page-Level Assertions
    // ─────────────────────────────────────────────

    async verifyPageTitle(expectedTitle, timeout = 5) {
        try {
            await expect(this.page).toHaveTitle(expectedTitle, { timeout: timeout * 1000 });
        } catch (error) {
            throw new Error(`Expected page title to be "${expectedTitle}", but it was not.`);
        }
    }

    async verifyPageUrl(expectedUrl, timeout = 5) {
        try {
            await expect(this.page).toHaveURL(expectedUrl, { timeout: timeout * 1000 });
        } catch (error) {
            throw new Error(`Expected page URL to be "${expectedUrl}", but it was not.`);
        }
    }

    async verifyPageUrlContains(urlPart, timeout = 5) {
        try {
            await expect(this.page).toHaveURL(new RegExp(urlPart), { timeout: timeout * 1000 });
        } catch (error) {
            throw new Error(`Expected page URL to contain "${urlPart}", but it did not.`);
        }
    }

    // ─────────────────────────────────────────────
    // Value Comparison Assertions
    // ─────────────────────────────────────────────

    /**
     * Asserts that actual value strictly equals expected value.
     * @param {*} actual
     * @param {*} expected
     * @param {string} [message]
     */
    verifyEquals(actual, expected, message) {
        try {
            expect(actual).toEqual(expected);
        } catch (error) {
            throw new Error(message ?? `Expected "${actual}" to equal "${expected}", but it did not.`);
        }
    }

    /**
     * Asserts that a string or array contains the expected value.
     * @param {string|Array} actual
     * @param {*} expected
     * @param {string} [message]
     */
    verifyContains(actual, expected, message) {
        try {
            if (typeof actual === 'string') {
                expect(actual).toContain(expected);
            } else if (Array.isArray(actual)) {
                expect(actual).toContain(expected);
            } else {
                throw new Error(`verifyContains: unsupported type "${typeof actual}". Use a string or array.`);
            }
        } catch (error) {
            throw new Error(message ?? `Expected "${actual}" to contain "${expected}", but it did not.`);
        }
    }

    /**
     * Asserts that a string or array does NOT contain the expected value.
     * @param {string|Array} actual
     * @param {*} expected
     * @param {string} [message]
     */
    verifyNotContains(actual, expected, message) {
        try {
            if (typeof actual === 'string') {
                expect(actual).not.toContain(expected);
            } else if (Array.isArray(actual)) {
                expect(actual).not.toContain(expected);
            } else {
                throw new Error(`verifyNotContains: unsupported type "${typeof actual}". Use a string or array.`);
            }
        } catch (error) {
            throw new Error(message ?? `Expected "${actual}" to NOT contain "${expected}", but it did.`);
        }
    }

    /**
     * Asserts that the value is truthy.
     * @param {*} value
     * @param {string} [message]
     */
    verifyIsTrue(value, message) {
        try {
            expect(value).toBeTruthy();
        } catch (error) {
            throw new Error(message ?? `Expected value to be truthy, but received "${value}".`);
        }
    }

    /**
     * Asserts that the value is falsy.
     * @param {*} value
     * @param {string} [message]
     */
    verifyIsFalse(value, message) {
        try {
            expect(value).toBeFalsy();
        } catch (error) {
            throw new Error(message ?? `Expected value to be falsy, but received "${value}".`);
        }
    }

    /**
     * Asserts that the value is null or undefined.
     * @param {*} value
     * @param {string} [message]
     */
    verifyIsNull(value, message) {
        try {
            expect(value == null).toBe(true);
        } catch (error) {
            throw new Error(message ?? `Expected value to be null/undefined, but received "${value}".`);
        }
    }

    /**
     * Asserts that the value is NOT null or undefined.
     * @param {*} value
     * @param {string} [message]
     */
    verifyIsNotNull(value, message) {
        try {
            expect(value).not.toBeNull();
            expect(value).not.toBeUndefined();
        } catch (error) {
            throw new Error(message ?? `Expected value to NOT be null/undefined, but it was.`);
        }
    }

    /**
     * Asserts that a string or array has the expected length.
     * @param {string|Array} value
     * @param {number} expectedLength
     * @param {string} [message]
     */
    verifyLength(value, expectedLength, message) {
        try {
            expect(value).toHaveLength(expectedLength);
        } catch (error) {
            throw new Error(message ?? `Expected length to be ${expectedLength}, but received ${value?.length}.`);
        }
    }

    /**
     * Asserts that an object/array contains the expected object or subset.
     * @param {Object|Array} actual
     * @param {Object} expectedObject
     * @param {string} [message]
     */
    verifyHasObject(actual, expectedObject, message) {
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

    /**
     * Asserts that actual value does NOT equal expected value.
     * @param {*} actual
     * @param {*} expected
     * @param {string} [message]
     */
    verifyNotEquals(actual, expected, message) {
        try {
            expect(actual).not.toEqual(expected);
        } catch (error) {
            throw new Error(message ?? `Expected "${actual}" to NOT equal "${expected}", but it did.`);
        }
    }

    /**
     * Asserts that actual number is greater than expected.
     * @param {number} actual
     * @param {number} expected
     * @param {string} [message]
     */
    verifyGreaterThan(actual, expected, message) {
        try {
            expect(actual).toBeGreaterThan(expected);
        } catch (error) {
            throw new Error(message ?? `Expected ${actual} to be greater than ${expected}, but it was not.`);
        }
    }

    /**
     * Asserts that actual number is less than expected.
     * @param {number} actual
     * @param {number} expected
     * @param {string} [message]
     */
    verifyLessThan(actual, expected, message) {
        try {
            expect(actual).toBeLessThan(expected);
        } catch (error) {
            throw new Error(message ?? `Expected ${actual} to be less than ${expected}, but it was not.`);
        }
    }

    /**
     * Asserts that a value matches a regular expression.
     * @param {string} value
     * @param {RegExp|string} pattern
     * @param {string} [message]
     */
    verifyMatchesPattern(value, pattern, message) {
        try {
            expect(value).toMatch(pattern);
        } catch (error) {
            throw new Error(message ?? `Expected "${value}" to match pattern "${pattern}", but it did not.`);
        }
    }

    /**
     * Asserts that an array or object is empty.
     * @param {Array|Object|string} value
     * @param {string} [message]
     */
    verifyIsEmpty(value, message) {
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

    /**
     * Asserts that an array or object is NOT empty.
     * @param {Array|Object|string} value
     * @param {string} [message]
     */
    verifyIsNotEmpty(value, message) {
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

    async softVerifyElementVisible(selector, timeout = 5) {
        const softExpect = expect.soft(this.page.locator(selector));
        await softExpect.toBeVisible({ timeout: timeout * 1000 });
    }

    async softVerifyElementText(selector, text, timeout = 5) {
        const softExpect = expect.soft(this.page.locator(selector));
        await softExpect.toHaveText(text, { timeout: timeout * 1000 });
    }

    softVerifyEquals(actual, expected, message) {
        const softExpect = expect.soft(actual, message);
        softExpect.toEqual(expected);
    }

    softVerifyIsTrue(value, message) {
        const softExpect = expect.soft(value, message);
        softExpect.toBeTruthy();
    }

    softVerifyIsFalse(value, message) {
        const softExpect = expect.soft(value, message);
        softExpect.toBeFalsy();
    }

}

export default Verification;
