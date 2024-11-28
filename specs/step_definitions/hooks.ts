import MailosaurClient from "mailosaur";
import {Page} from "../pages/page.ts";
import {BeforeAll} from "@wdio/cucumber-framework";
import { HomePage } from "../pages/home/home.ts";

let page : Page
let homePage: HomePage
let mailosaur : MailosaurClient
BeforeAll(() => {
    page = new Page()
    homePage = new HomePage()
    mailosaur = new MailosaurClient(process.env.MAILOSAUR_KEY!)
})
export{page,homePage,mailosaur}