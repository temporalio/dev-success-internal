// ==UserScript==
// @name        auto click login tmprl.cloud
// @namespace   Violentmonkey Scripts
// @match       https://login.tmprl.cloud/device/confirmation*
// @match       https://login.tmprl.cloud/u/login/identifier*
// @grant       none
// @version     1.0
// @author      Kevin Woo
// @updateURL   https://kevinawoo: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@raw.githubusercontent.com/kevinawoo/temporal-shared-DSE-things/refs/heads/main/userscripts/auto-login-tmprl.cloud.user.js
// @downloadURL https://kevinawoo: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@raw.githubusercontent.com/kevinawoo/temporal-shared-DSE-things/refs/heads/main/userscripts/auto-login-tmprl.cloud.user.js
// @homepageURL https://github.com/kevinawoo/temporal-shared-DSE-things
// @description auto click buttons for the login flow
// ==/UserScript==


setTimeout(() => {
    const button = document.querySelector('button[value="confirm"]');
    button.style.backgroundColor="yellow";
    button.click()
}, 500)


setTimeout(() => {
    let button = document.querySelector('form[data-provider="waad"]')
    if (button) {
        console.log("submitting")
        button.style.backgroundColor="yellow";
        button.submit();
    }
}, 500);