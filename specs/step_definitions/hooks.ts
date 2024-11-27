import {Page} from "../pages/page.ts";
import {BeforeAll} from "@wdio/cucumber-framework";

export let page : Page
BeforeAll(() => {
    page = new Page()
})