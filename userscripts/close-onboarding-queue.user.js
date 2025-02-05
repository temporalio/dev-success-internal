// ==UserScript==
// @name        auto close Customer Onboarding Queue
// @namespace   Violentmonkey Scripts
// @match       https://docs.google.com/spreadsheets/d/1ds6lcJTDDB940lPvl8ADp2sW-DW_n0CkTzChpz-fdIQ/edit*
// @grant       window.close
// @version     1.0
// @author      Kevin Woo
// @updateURL   https://kevinawoo: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@raw.githubusercontent.com/kevinawoo/temporal-dev-success-internal/refs/heads/main/userscripts/close-onboarding-queue.user.js
// @downloadURL https://kevinawoo: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@raw.githubusercontent.com/kevinawoo/temporal-dev-success-internal/refs/heads/main/userscripts/close-onboarding-queue.user.js
// @homepageURL https://github.com/kevinawoo/temporal-dev-success-internal
// @description closes the sheet when inative
// ==/UserScript==

// The purpose for this script is because I have a bookmark to open a filter view
// but the filter view doesn't live update
// so as a hack, i just close the window lol

const inactivityTime = function () {
    let time;
    window.onload = resetTimer;
    // DOM Events
    document.onmousemove = resetTimer;
    document.onkeydown = resetTimer;

    function resetTimer() {
        clearTimeout(time);
        time = setTimeout(() => {
            window.close();
        }, 10 * (60 * 1000));
    }
};

inactivityTime();
