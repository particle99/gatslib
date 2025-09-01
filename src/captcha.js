const puppeteer = require("puppeteer");

class Captcha {
    constructor(headless, url) {
        this.createdTab = false;

        this.headless = headless;
        this.url = url;
    }

    async createTab() {
        this.browser = await puppeteer.launch({ headless: this.headless });
        this.page = await this.browser.newPage();

        await this.page.goto(this.url);

        this.createdTab = true;

        console.log('Successfully created puppeteer tab');

        //this.instance.opts.DEBUG_ENABLED && console.log(`[async Capthca.createTab] Puppeteer tab successfully created`);
    }

    async generateToken(sitekey) {
        if(!this.page) return;

        const token = await this.page.evaluate(() => {
            grecaptcha.execute(sitekey, {
                action: "connect"
            })
        });

        return token;
    }
}

module.exports = { Captcha };