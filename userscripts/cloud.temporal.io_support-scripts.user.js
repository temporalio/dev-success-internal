// ==UserScript==
// @name        cloud.temporal.io/support scripts
// @namespace   Violentmonkey Scripts
// @match       https://cloud.temporal.io/support/namespaces/*?granted=true
// @grant       window.close
// @version     1.0
// @author      Kevin Woo
// @updateURL   https://kevinawoo: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@raw.githubusercontent.com/temporalio/temporal-dev-success-internal/refs/heads/main/userscripts/cloud.temporal.io_support-scripts.user.js
// @downloadURL https://kevinawoo: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@raw.githubusercontent.com/temporalio/temporal-dev-success-internal/refs/heads/main/userscripts/cloud.temporal.io_support-scripts.user.js
// @homepageURL https://github.com/temporalio/temporal-dev-success-internal
// @description scripts to improve DSE UX
// ==/UserScript==


// auto select 8hrs, then close the window after permissions were granted
setInterval(async() => {
    const grantModalTitleEl = document.querySelector("#modal-title-grant-role-modal");
    if (grantModalTitleEl && grantModalTitleEl.textContent.match(/^Grant Access to .*/gi)) {
        const dur = document.querySelector("#modal-content-grant-role-modal form > div:nth-child(2) input");
        dur.style.backgroundColor = "yellow";
        dur.style.color = "black";
        dur.value = "8 hours";
    }


    const successEl = document.querySelector("#modal-content-grant-role-modal > div > div.alert.flex.success.overflow-hidden.svelte-2go2q2 > div > p")
    if (successEl && successEl.textContent === "Granted Role") {
        window.close()
    }
}, 1000);
