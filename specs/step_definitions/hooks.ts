import MailosaurClient from "mailosaur";
import {Page} from "../pages/page.ts";
import {BeforeAll} from "@wdio/cucumber-framework";

let page : Page
let mailosaur : MailosaurClient
BeforeAll(() => {
    page = new Page()
    mailosaur = new MailosaurClient(process.env.MAILOSAUR_KEY!)
})
export{page,mailosaur}