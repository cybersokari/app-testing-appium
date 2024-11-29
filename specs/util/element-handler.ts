// import { $ } from '@wdio/globals'
//
// class ElementUtils {
//     /**
//      * Wait and retry mechanism for handling stale elements
//      * @param selector - Element selector
//      * @param maxRetries - Number of retry attempts (default: 3)
//      * @returns WebdriverIO element
//      */
//     static async getStableElement(
//         selector: string,
//         maxRetries: number = 3
//     ): Promise<ChainablePromiseElement> {
//         for (let attempt = 1; attempt <= maxRetries; attempt++) {
//             try {
//                 const element = $(selector);
//
//                 // Additional check to ensure element is present and not stale
//                 await element.waitForExist({
//                     timeout: 5000,
//                     timeoutMsg: `Element ${selector} not found after ${attempt} attempt(s)`
//                 });
//
//                 // Verify element is displayed and enabled
//                 if (await element.isDisplayed() && await element.isEnabled()) {
//                     return element;
//                 }
//
//                 // If element is not visible/enabled, throw error to trigger retry
//                 throw new Error(`Element ${selector} not interactable`);
//
//             } catch (error) {
//                 // Log the error for debugging
//                 console.warn(`Stale element attempt ${attempt}: ${error.message}`);
//
//                 // If it's the last retry, rethrow the error
//                 if (attempt === maxRetries) {
//                     throw error;
//                 }
//
//                 // Wait a short time before retrying
//                 await browser.pause(500);
//             }
//         }
//
//         throw new Error('Failed to find stable element');
//     }
//
//     /**
//      * Safely interact with an element, handling potential staleness
//      * @param selector - Element selector
//      * @param action - Interaction method to perform
//      */
//     static async safeInteract(
//         selector: string,
//         action: (element: WebdriverIO.Element) => Promise<void>
//     ): Promise<void> {
//         const element = await this.getStableElement(selector);
//         await action(element);
//     }
// }
