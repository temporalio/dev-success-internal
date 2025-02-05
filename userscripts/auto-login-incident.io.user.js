// ==UserScript==
// @name        auto click login incident.io
// @namespace   Violentmonkey Scripts
// @match       https://app.incident.io/temporaltechnologies/login*
// @grant       none
// @version     1.0
// @author      Kevin Woo
// @updateURL   https://kevinawoo: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@raw.githubusercontent.com/kevinawoo/temporal-shared-DSE-things/refs/heads/main/userscripts/auto-login-incident.io.user.js
// @downloadURL https://kevinawoo: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@raw.githubusercontent.com/kevinawoo/temporal-shared-DSE-things/refs/heads/main/userscripts/auto-login-incident.io.user.js
// @homepageURL https://github.com/kevinawoo/temporal-shared-DSE-things
// @description auto click buttons for the login flow
// ==/UserScript==


setTimeout(() => {
    const button = document.querySelector("#samlLogin button")
    if (button) {
        button.style.backgroundColor="yellow";
        button.click();
    }
}, 500);