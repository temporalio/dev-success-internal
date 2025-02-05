// ==UserScript==
// @name        auto click login sendsafely.com
// @namespace   Violentmonkey Scripts
// @match       https://temporal.sendsafely.com/receive/*
// @grant       none
// @version     1.0
// @author      Kevin Woo
// @updateURL   https://kevinawoo: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@raw.githubusercontent.com/kevinawoo/temporal-shared-DSE-things/refs/heads/main/userscripts/auto-login-sendsafely.com.user.js
// @downloadURL https://kevinawoo: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@raw.githubusercontent.com/kevinawoo/temporal-shared-DSE-things/refs/heads/main/userscripts/auto-login-sendsafely.com.user.js
// @homepageURL https://github.com/kevinawoo/temporal-shared-DSE-things
// @description auto click buttons for the login flow
// ==/UserScript==


setTimeout(()=> {
    const authDisplayCSSDisplayVal = document.querySelector("#authenticate").computedStyleMap().get("display").value
    let button = document.querySelector("#ssoLoginButton")
    if (authDisplayCSSDisplayVal == "block" && button) {
        button.style.backgroundColor="yellow";
        button.click();
    }
},800)