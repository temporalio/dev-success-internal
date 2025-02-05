// ==UserScript==
// @name        auto click login pagerduty.com
// @namespace   Violentmonkey Scripts
// @match       https://identity.pagerduty.com/global/authn/authentication/PagerDutyGlobalLogin/subdomain*
// @grant       none
// @version     1.0
// @author      Kevin Woo
// @updateURL   https://kevinawoo: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@raw.githubusercontent.com/kevinawoo/temporal-shared-DSE-things/refs/heads/main/userscripts/auto-login-pagerduty.com.user.js
// @downloadURL https://kevinawoo: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@raw.githubusercontent.com/kevinawoo/temporal-shared-DSE-things/refs/heads/main/userscripts/auto-login-pagerduty.com.user.js
// @homepageURL https://github.com/kevinawoo/temporal-shared-DSE-things
// @description auto click buttons for the login flow
// ==/UserScript==


setTimeout(() => {
    let button = document.querySelector("#sso_submit")
    button.style.backgroundColor="yellow";
    button.click();
}, 500)