// ==UserScript==
// @name        grafana scripts
// @namespace   Violentmonkey Scripts
// @match       https://grafana.tmprl-internal.cloud/explore*
// @grant       GM_addStyle
// @version     1.2
// @author      Kevin Woo
// @updateURL   https://kevinawoo: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@raw.githubusercontent.com/kevinawoo/temporal-shared-DSE-things/refs/heads/main/userscripts/grafana.user.js
// @downloadURL https://kevinawoo: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@raw.githubusercontent.com/kevinawoo/temporal-shared-DSE-things/refs/heads/main/userscripts/grafana.user.js
// @homepageURL https://github.com/kevinawoo/temporal-shared-DSE-things
// @description grafana scripts
// ==/UserScript==



// prevent swiping backwards
let styleElement = GM_addStyle(`
html, body {
  overscroll-behavior-x: none;
}
`);


/* Works for:
- Loki style queries aka   {cluster="s-cd045",k8s_namespace="temporal"} |= "cloud-ops-stage.quan5" | json | __error__ != "JSONParserErr" | line_format "{{.ts}} | {{.Error}}"
- Prometheus queries aka   {cluster="s-cd045", k8s_namespace="temporal"}

Does not work for chronicle SQL style metrics editor aka: SELECT * FROM ...
The current issue is that the editor doesn't get dismissed, so it submits the old query
gotta figure out some way to get out of the editor
 */


document.body.addEventListener('keyup', function (event) {
    if ((event.code === "KeyR" && event.key === "r") // ctrl + r
        || (event.metaKey && event.key === "Enter") // shift + enter
        || (event.shiftKey && event.key === "Enter") // cmd + enter
    ) {
        clickSend()
    }
});



const clickSend = () => {
    const button = document.querySelector("#A_1 > div.gf-form.css-15pdn2f > button")
    prevColor = button.style.background
    button.style.background = "yellow"
    button.click();
    setTimeout(() => {
        button.style.background = prevColor
    }, 1000)
}


// todo: this is to try to debug the SQL editor submission
const dispatchEscape = () => {
    window.dispatchEvent(
        new KeyboardEvent("keyup", {
            altKey: false,
            key: "s",
            code: "KeyS",
            ctrlKey: false,
            isComposing: false,
            key: "Escape",
            location: 0,
            metaKey: true,
            repeat: false,
            shiftKey: false,
            which: 83,
            charCode: 0,
            keyCode: 83,
        })
    );
}


// debugging, print out key presses
// document.addEventListener("keydown", (e) => {
//     console.log("keydown", e)
// });
// document.addEventListener("keyup", (e) => {
//     console.log("keyup", e)
// });