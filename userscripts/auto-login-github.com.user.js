// ==UserScript==
// @name        auto click login github.com
// @namespace   Violentmonkey Scripts
// @match       https://github.com/orgs/temporalio/sso*
// @match       https://github.com/temporalio/*
// @match       https://github.com/temporalio
// @grant       none
// @version     1.0
// @author      Kevin Woo
// @updateURL   https://kevinawoo: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@raw.githubusercontent.com/kevinawoo/temporal-dev-success-internal/refs/heads/main/userscripts/auto-login-github.com.user.js
// @downloadURL https://kevinawoo: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@raw.githubusercontent.com/kevinawoo/temporal-dev-success-internal/refs/heads/main/userscripts/auto-login-github.com.user.js
// @homepageURL https://github.com/kevinawoo/temporal-dev-success-internal
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
