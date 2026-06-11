import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto("http://localhost:3000");

await page.waitForSelector("text=Escolha sua cidade", { timeout: 15000 });
await page.screenshot({ path: "__test_modal.png" });

const buttons = await page.locator("button").allTextContents();
console.log("Modal buttons:", buttons.filter(b => b.includes("PI") || b.toLowerCase().includes("luzil") || b.toLowerCase().includes("esperant")));

await page.click("button:has-text('Esperantina')");
await page.waitForTimeout(500);

// click a CTA button
const cta = page.locator("a:has-text('Contratar agora')").first();
await cta.waitFor({ timeout: 10000 });
const href = await cta.getAttribute("href");
console.log("CTA href:", href);

await browser.close();
