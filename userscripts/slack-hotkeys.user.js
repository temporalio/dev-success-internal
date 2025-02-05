// ==UserScript==
// @name        Slack hotkeys
// @namespace   Violentmonkey Scripts
// @match       https://app.slack.com/client/TT31S6VK5/*
// @grant       none
// @version     1.0
// @author      Kevin Woo
// @updateURL   https://kevinawoo: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@raw.githubusercontent.com/kevinawoo/temporal-dev-success-internal/refs/heads/main/userscripts/slack-hotkeys.user.js
// @downloadURL https://kevinawoo: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@raw.githubusercontent.com/kevinawoo/temporal-dev-success-internal/refs/heads/main/userscripts/slack-hotkeys.user.js
// @homepageURL https://github.com/kevinawoo/temporal-dev-success-internal
// @description custom hotkeys for slack
// ==/UserScript==


// double press ⌘ to make slack thread fullscreen
(function() {
    let cmdPressed = false;
    let cmdPressTimer;

    // show thread only
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Meta') {
            if (cmdPressed) {
                // this doesn't work badly, but it does get weird when the width of the page is small where default slack only shows the thread
                // document.querySelector(".p-client_workspace__layout").style.gridTemplateColumns = "0% 0% 100%";
                // document.querySelector(".p-view_contents--primary").style.display = "none";
                // document.querySelector(".p-view_contents--sidebar").style.display = "none";

                // this is good, i like it
                document.querySelector(".p-view_contents--primary").style.display = "none";
                document.querySelector(".p-ia4_client .p-client_workspace__layout").style.display = "block";

                cmdPressed = false;
                clearTimeout(cmdPressTimer);
            } else {
                cmdPressed = true;
                cmdPressTimer = setTimeout(() => {
                    cmdPressed = false;
                }, 300); // 300ms to detect double press
            }
        }
    });
})();

