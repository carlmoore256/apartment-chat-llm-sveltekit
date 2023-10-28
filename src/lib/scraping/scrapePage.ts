import puppeteer from "puppeteer";
import jsdom from "jsdom";

export async function scrapePage(url: string) {
    const html = await downloadPageWithBrowser(url);
    const dom = new jsdom.JSDOM(html);
    const document = dom.window.document;
    const scripts = document.querySelectorAll("script");
    scripts.forEach((script) => script.remove());
    return document.documentElement;
    // const body = document.querySelector("body");
    // if (!body) throw new Error("No body found in page.");
    // return body.innerHTML;
}

export async function downloadPageWithBrowser(url: string, headless = false) {
    const browser = await puppeteer.launch({
        headless: false,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(60000);
    await page.goto(url);
    await page.waitForTimeout(2000);
    const html = await page.evaluate(() => document.documentElement.outerHTML);
    await browser.close();
    return html;
}


function removeScripts(html: string) {
    return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
}