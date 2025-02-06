// ==UserScript==
// @name        auto click login hibob.com
// @namespace   Violentmonkey Scripts
// @match       https://app.hibob.com/*
// @grant       none
// @version     1.0
// @author      Kevin Woo
// @updateURL   https://kevinawoo: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@raw.githubusercontent.com/temporalio/temporal-dev-success-internal/refs/heads/main/userscripts/auto-login-hibob.com.user.js
// @downloadURL https://kevinawoo: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@raw.githubusercontent.com/temporalio/temporal-dev-success-internal/refs/heads/main/userscripts/auto-login-hibob.com.user.js
// @homepageURL https://github.com/temporalio/temporal-dev-success-internal
// @description auto click buttons for the login flow
// ==/UserScript==


let tries = 0;
const interval = setInterval(()=> {
    const b = document.querySelector("b-button > button")
    if (b && b.textContent.trim() == 'Continue with Microsoft') {
        b.style.backgroundColor="yellow"
        b.click();
        clearInterval(interval);
    }

    tries++
    if (tries > 10) {
        clearInterval(interval);
    }
}, 800);
