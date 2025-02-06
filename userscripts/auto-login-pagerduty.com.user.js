// ==UserScript==
// @name        auto click login pagerduty.com
// @namespace   Violentmonkey Scripts
// @match       https://identity.pagerduty.com/global/authn/authentication/PagerDutyGlobalLogin/*
// @grant       GM.setValue
// @grant       GM.getValue
// @version     1.0
// @author      Kevin Woo
// @updateURL   https://kevinawoo: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@raw.githubusercontent.com/temporalio/temporal-dev-success-internal/refs/heads/main/userscripts/auto-login-pagerduty.com.user.js
// @downloadURL https://kevinawoo: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@raw.githubusercontent.com/temporalio/temporal-dev-success-internal/refs/heads/main/userscripts/auto-login-pagerduty.com.user.js
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

    const email = await GM.getValue("email")

    let input = document.querySelector("#email")
    input.style.backgroundColor = "yellow";
    input.style.color = "black"
    input.value = email;

    let button = document.querySelector("#submit, #sso_submit")
    button.style.backgroundColor = "yellow";

    debugger // keep for safety, open the dev console to prevent inf loop
    button.click();
}, 500)
