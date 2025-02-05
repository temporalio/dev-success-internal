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
// @updateURL   https://kevinawoo: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@raw.githubusercontent.com/kevinawoo/temporal-dev-success-internal/refs/heads/main/userscripts/oauth-success-closer.user.js
// @downloadURL https://kevinawoo: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@raw.githubusercontent.com/kevinawoo/temporal-dev-success-internal/refs/heads/main/userscripts/oauth-success-closer.user.js
// @homepageURL https://github.com/kevinawoo/temporal-dev-success-internal
// @description closes the window once the OAauth flow is done
// ==/UserScript==


setInterval(()=> {
    window.close();
}, 750);
