// ==UserScript==
// @name        oauth success closer
// @namespace   Violentmonkey Scripts
//
// @match       https://oauth.pstmn.io/v1/callback
// @match       https://*.zoom.us/j/*
// @match       https://*.zoom.us/s/*
// @match       https://*.zoom.us/saml/mobile_success
// @match       https://login.tmprl.cloud/device/success
//
// @grant       window.close
// @version     1.2
// @author      Kevin Woo
// @updateURL   https://kevinawoo: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@raw.githubusercontent.com/kevinawoo/temporal-shared-DSE-things/refs/heads/main/userscripts/oauth-success-closer.user.js
// @downloadURL https://kevinawoo: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@raw.githubusercontent.com/kevinawoo/temporal-shared-DSE-things/refs/heads/main/userscripts/oauth-success-closer.user.js
// @homepageURL https://github.com/kevinawoo/temporal-shared-DSE-things
// @description closes the window once the OAauth flow is done
// ==/UserScript==


setInterval(()=> {
    window.close();
}, 750);
