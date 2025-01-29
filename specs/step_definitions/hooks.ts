import {Page} from "../pages/page.ts";
import {BeforeAll} from "@wdio/cucumber-framework";

let page : Page
BeforeAll(() => {
    page = new Page()
})
export{page}