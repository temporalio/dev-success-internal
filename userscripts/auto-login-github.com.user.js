// ==UserScript==
// @name        auto click login github.com
// @namespace   Violentmonkey Scripts
// @match       https://github.com/orgs/temporalio/sso*
// @match       https://github.com/temporalio/*
// @match       https://github.com/temporalio
// @grant       none
// @version     1.0
// @author      Kevin Woo
// @updateURL   https://kevinawoo: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@raw.githubusercontent.com/kevinawoo/temporal-shared-DSE-things/refs/heads/main/userscripts/auto-login-github.com.user.js
// @downloadURL https://kevinawoo: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@raw.githubusercontent.com/kevinawoo/temporal-shared-DSE-things/refs/heads/main/userscripts/auto-login-github.com.user.js
// @homepageURL https://github.com/kevinawoo/temporal-shared-DSE-things
// @description auto click buttons for the login flow
// ==/UserScript==


let count = 0
const interval = setInterval(function () {
    const button = document.querySelector("div.org-sso-panel > form > button")
    if (button) {
        button.style.backgroundColor = "yellow";
        button.click();
        return;
    }

    if (count > 20) {
        clearInterval(interval);
    }
    count++;
}, 500)