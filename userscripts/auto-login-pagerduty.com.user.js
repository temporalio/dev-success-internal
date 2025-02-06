// ==UserScript==
// @name        auto click login pagerduty.com
// @namespace   Violentmonkey Scripts
// @match       https://identity.pagerduty.com/global/authn/authentication/PagerDutyGlobalLogin/subdomain*
// @grant       none
// @version     1.0
// @author      Kevin Woo
// @updateURL   https://kevinawoo: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@raw.githubusercontent.com/temporalio/temporal-dev-success-internal/refs/heads/main/userscripts/auto-login-pagerduty.com.user.js
// @downloadURL https://kevinawoo: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@raw.githubusercontent.com/temporalio/temporal-dev-success-internal/refs/heads/main/userscripts/auto-login-pagerduty.com.user.js
// @homepageURL https://github.com/temporalio/temporal-dev-success-internal
// @description auto click buttons for the login flow
// ==/UserScript==


setTimeout(() => {
    let button = document.querySelector("#sso_submit")
    button.style.backgroundColor="yellow";
    button.click();
}, 500)
