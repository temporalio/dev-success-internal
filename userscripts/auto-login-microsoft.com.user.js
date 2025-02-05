// ==UserScript==
// @name        auto click login microsoft.com and microsoftonline.com
// @namespace   Violentmonkey Scripts
// @match       https://login.microsoft.com/8eb98f7d-b06f-4977-a2dd-a53618c2d24f/fido/get*
// @match       https://login.microsoftonline.com/common/oauth2/v2.0/authorize*
// @grant       none
// @version     1.0
// @author      Kevin Woo
// @updateURL   https://kevinawoo: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@raw.githubusercontent.com/kevinawoo/temporal-dev-success-internal/refs/heads/main/userscripts/auto-login-microsoft.com.user.js
// @downloadURL https://kevinawoo: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@raw.githubusercontent.com/kevinawoo/temporal-dev-success-internal/refs/heads/main/userscripts/auto-login-microsoft.com.user.js
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


setTimeout(()=> {
    // use the security key
    const button = document.querySelector("#idSIButton9")
    if (button) {
        button.style.backgroundColor="yellow";
        button.click()
    }
}, 500)


setInterval(async ()=> {
    const email = await GM.getValue("email")

    document.querySelector('input[type="email"]').value = email
    let button = document.querySelector("#idSIButton9")
    button.style.backgroundColor="yellow";
    button.click()
},800)
