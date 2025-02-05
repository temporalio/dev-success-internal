// ==UserScript==
// @name        auto click login google.com
// @namespace   Violentmonkey Scripts
//
// @match       https://accounts.google.com/AccountChooser/signinchooser
// @match       https://accounts.google.com/AccountChooser
// @match       https://accounts.google.com/signin/*
// @match       https://www.getclockwise.com/chrome.html?fromchrome=1&site=gcal&sidepanel=1
// @match       https://accounts.google.com/speedbump/samlconfirmaccount
// @match       https://accounts.google.com/v3/signin/confirmidentifier
//
// vault's version
// @match       https://accounts.google.com/o/oauth2/*
//
// @version     2.1
// @author      Kevin Woo
// @updateURL   https://kevinawoo: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@raw.githubusercontent.com/kevinawoo/temporal-dev-success-internal/refs/heads/main/userscripts/auto-login-google.com.user.js
// @downloadURL https://kevinawoo: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@raw.githubusercontent.com/kevinawoo/temporal-dev-success-internal/refs/heads/main/userscripts/auto-login-google.com.user.js
// @homepageURL https://github.com/kevinawoo/temporal-dev-success-internal
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


let progressBar = false;
let clicker = null

const click = async () => {
    const email = await GM.getValue("email")

    if (!window.location.href.includes("https://accounts.google.com/AccountChooser")) {
        clearInterval(clicker);
    }

    console.log("clicking email")
    if (progressBar) {
        if (clicker) {
            clearInterval(clicker);
        }
        return
    }

    const button = document.querySelector(`div[data-identifier="${email}"]`)
    if (button != null) {
        button.style.backgroundColor = "yellow";
        button.click();
    }
}


setTimeout(function () {
    click();
    clicker = setInterval(click, 1000);
}, 500);


setTimeout(function () {
    const pInt = setInterval(function () {
        let elem = document.querySelector('div[role="progressbar"]');
        if (elem) {
            let total = elem.childElementCount
            document.querySelector('div[role="progressbar"]').childNodes.forEach(x => {
                console.log(total)
                if (getComputedStyle(x).animationPlayState === "running") {
                    total--;
                }

                if (total === 0) {
                    progressBar = true
                    clearInterval(pInt);
                }
            });
        }
    }, 500);
}, 1000);


setTimeout(function () {
    if (window.location.href.includes("https://accounts.google.com/signin/")) {
        const pInt = setInterval(function () {
            if (document.querySelector("#developer_info_glif").textContent == "Clockwise") {
                const button = document.querySelector("#submit_approve_access > div > button")
                button.style.backgroundColor = "yellow";
                button.click();
                clearInterval(pInt);
            }
        }, 500);
    }

    let button = document.querySelector("#identifierNext > div > button");
    if (button) {
        button.style.backgroundColor = "yellow";
        button.click();
    }


    button = document.querySelector('div[jsname="uRHG6"]');
    if (button) {
        button.style.backgroundColor = "yellow";
        button.click();
    }
}, 1000);


setTimeout(() => {
    const button = document.querySelector('span[jsname="V67aGc"]')
    if (button.textContent == "Continue") {
        button.style.backgroundColor = "yellow";
        button.click();
    }
}, 1000)


// this doesn't work I think because it's in a chrome extension. when it clicks the button, it doesn't have the parent's context to know
// which google account to use. AHHHHHHHHHH clockwise -_-
// setTimeout(function() {
//   let clockwiseClickerCount = 0
//   const clockwiseClicker = setInterval(function() {
//     clockwiseClickerCount++;
//     if (clockwiseClickerCount > 50) {
//       clearInterval(clockwiseClicker);
//     }
//     const a = document.querySelector("button.MuiButtonBase-root.MuiButton-root.MuiButton-contained.jss10");
//     console.log(a)
//     if (a) {
//       clearInterval(clockwiseClicker);
//       a.click();
//     }
//   },500);

// },2000);

// setTimeout(function() {
//   const button = document.querySelector('div[data-identifier="kevin.woo@temporal.io"]')
//   if (button != null) {
//     button.click();
//     return;
//   }

//   setTimeout(function() {
//     const button = document.querySelector('div[data-identifier="kevin.woo@temporal.io"]')
//     if (button != null) {
//       button.click();
//       if (progressBar) {
//         return
//       }
//     }

//       setTimeout(function() {
//         const button = document.querySelector('div[data-identifier="kevin.woo@temporal.io"]')
//         if (button != null) {
//           button.click();
//           if (progressBar) {
//             return
//           }
//         }
//       }, 1000);
//   }, 1000);
// }, 500);

// vault doesn't need these, does other sso need them as well?..... maybe I can merge GoogleVault with this file
// gonna keep these commented out... if works, then yay, we can merge the other `GoogleVault SSO` file as well
// setTimeout(function() {
//   const button = document.querySelector('div[data-identifier="kevin.woo@temporal.io"]')
//   if (button != null) {
//     button.click();
//   }
// }, 2000);
// setTimeout(function() {
//   const button = document.querySelector('div[data-identifier="kevin.woo@temporal.io"]')
//   if (button != null) {
//     button.click();
//   }
// }, 4000);
// setTimeout(function() {
//   const button = document.querySelector('div[data-identifier="kevin.woo@temporal.io"]')
//   if (button != null) {
//     button.click();
//   }
// }, 8000);
