// ==UserScript==
// @name        auto click login auth0.com
// @namespace   Violentmonkey Scripts
// @match       https://auth0.auth0.com/u/login/identifier*
// @grant       GM.setValue
// @grant       GM.getValue
// @version     3.0
// @author      Kevin Woo
// @updateURL   https://kevinawoo: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@raw.githubusercontent.com/temporalio/temporal-dev-success-internal/refs/heads/main/userscripts/auto-login-auth0.com.user.js
// @downloadURL https://kevinawoo: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@raw.githubusercontent.com/temporalio/temporal-dev-success-internal/refs/heads/main/userscripts/auto-login-auth0.com.user.js
// @homepageURL https://github.com/temporalio/temporal-dev-success-internal
// @description auto click buttons for the login flow
// ==/UserScript==


//To install this one, change your username here:
(async () => {
    const email = "kevin.woo@temporal.io"

    const found = await GM.getValue("email")
    if (!found) {
        await GM.setValue("email", email);
    }
})()


setTimeout(async () => {
    let date = new Date();
    const tryKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-tries`
    let tries = await GM.getValue(tryKey, 1); // persists across reloads
    if (tries > 3) {
        return
    }

    const email = await GM.getValue("email")

    let uEl = document.querySelector("#username")
    uEl.value = email;

    const captchaEl = document.querySelector("#ulp-recaptcha")
    if (captchaEl) {
        return
    }

    let button = document.querySelector('button[name="action"]')
    button.style.backgroundColor = "yellow";

    debugger // keep for safety, open the dev console to prevent inf loop
    button.click();

    await GM.setValue(tryKey, tries++);
    await GM.deleteValues((await GM.listValues() || []).filter(x !== tryKey)) // cleanup older days
}, 250);
