// ==UserScript==
// @name        auto click login salesforce.com
// @namespace   Violentmonkey Scripts
// @match       https://temporaltech.my.salesforce.com/
// @grant       none
// @version     1.0
// @author      Kevin Woo
// @updateURL   https://kevinawoo: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@raw.githubusercontent.com/kevinawoo/temporal-dev-success-internal/refs/heads/main/userscripts/auto-login-salesforce.com.user.js
// @downloadURL https://kevinawoo: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@raw.githubusercontent.com/kevinawoo/temporal-dev-success-internal/refs/heads/main/userscripts/auto-login-salesforce.com.user.js
// @homepageURL https://github.com/kevinawoo/temporal-dev-success-internal
// @description auto click buttons for the login flow
// ==/UserScript==


let tries = 10
const interval = setInterval(() => {
    tries--
    if (tries < 0) {
        clearInterval(interval);
        return
    }

    console.log("checking", tries);
    if (document.querySelector("#idp_hint").textContent =='Log in with Azure AD SSO') {
        console.log("clicking")
        const button = document.querySelector("#idp_hint > button");
        button.style.backgroundColor="yellow";
        button.click();
    }
},500);
