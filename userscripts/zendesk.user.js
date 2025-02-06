// ==UserScript==
// @name        zendesk scripts
// @namespace   Violentmonkey Scripts
// @match       https://temporalsupport.zendesk.com/*
// @grant       GM.setValue
// @grant       GM.getValue
// @version     1.8
// @author      Kevin Woo
// @updateURL   https://kevinawoo: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@raw.githubusercontent.com/temporalio/temporal-dev-success-internal/refs/heads/main/userscripts/zendesk.user.js
// @downloadURL https://kevinawoo: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@raw.githubusercontent.com/temporalio/temporal-dev-success-internal/refs/heads/main/userscripts/zendesk.user.js
// @homepageURL https://github.com/temporalio/temporal-dev-success-internal
// @description scripts for Temporal Zendesk
// ==/UserScript==


const GM_KEY_justWatchingTicketsKey = 'justWatchingTickets';
let justWatchingTickets = {};


setInterval(async () => {
    justWatchingTickets = JSON.parse(await GM.getValue(GM_KEY_justWatchingTicketsKey))

    setTitle();

    forceTicketsInListToOpenInNewTabs();

    checkAllowedCompaniesInLocation();

    await styleDimmableTickets();
}, 1000);


const setTitle = () => {
    // stupid zendesk tabs... if you have multiple open, you need to see which one is active
    document.querySelectorAll('span[data-test-id="tabs-section-nav-item-ticket"]')
        .forEach(ticketElement => {
            if (ticketElement.parentElement.parentElement.parentElement.parentElement.style.visibility === "hidden") {
                return
            }

            if (ticketElement) {
                const ticket = ticketElement.textContent.trim().replace(/(.|\n)*#/, "")
                let title = document.title
                title = title.replace(/^Ticket/, ticket)
                document.title = title
            }
        })
}


// Support Location Restrictions: https://www.notion.so/temporalio/Support-Location-Restrictions-1698fc56773880eea383dd8c88a47ed9
//
// Testing:
//  1. comment out your timezone
//  2. save
//  3. open up one of the org tickets bellow
//  4. observe the yellowing
// Orgs to test with:
//  jpmc:
//    - https://temporalsupport.zendesk.com/agent/organizations/13991595223444/tickets
//    - https://temporalsupport.zendesk.com/agent/organizations/11366712949268/tickets
//  travelers:
//    - https://temporalsupport.zendesk.com/agent/organizations/15198656637716/tickets
const checkAllowedCompaniesInLocation = () => {
    // we're using timezones instead of actual location because this is a close enough analog
    const americas = [
        "America/Los_Angeles",
        "America/Denver",
        "America/Chicago",
        "America/New_York"
    ];
    const emea = [
        "Europe/London",
        "Europe/Madrid",
        "Europe/Paris",
        "Europe/Berlin",
        // this list is incomplete, add your timezone here according to the "Support Location Restrictions" notion page
    ];

    // see "Support Location Restrictions" notion page above
    const orgTimezones = {
        "jpmorgan.com": [...americas, "Australia/Sydney", ...emea],
        "Jpmchase": [...americas, "Australia/Sydney", ...emea],
        "jpmorgan_technology_services_production": [...americas, "Australia/Sydney", ...emea],

        "travelers.com": [...americas],

        "BofBank": [...americas, "Europe/London", "Europe/Madrid", "Australia/Sydney"],
        "Credit Agicole": [...americas, "Europe/London", "Europe/Madrid", "Australia/Sydney"],

        "att.com": [...americas, "Europe/London", "Europe/Madrid", "Australia/Sydney"],
    };

    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const orgEls = document.querySelectorAll(".organization-pill"); // zendesk does a tab view for each ticket/search... so we have to target all
    if (!orgEls || !orgEls.length) {
        return;
    }

    for (const orgEl of orgEls) {
        const org = orgEl.textContent.trim();
        const allowedTimezones = orgTimezones[org];

        if (allowedTimezones && allowedTimezones.indexOf(tz) === -1) {
            orgEl.style.backgroundColor = "yellow";
            document.querySelector("body").style.backgroundColor = "yellow";
        }
    }
}


// Force tickets to open in new tab
//
// The only way to do this is using an event listeners
//
// An attempt was made to use anchor tags to control the flow, but Chrome+React emit "A soft navigation has been detected" in the console
// and thus applies these navigation rules instead.
const alreadySet = {}
const forceTicketsInListToOpenInNewTabs = () => {
    const href = document.location.href
    alreadySet[href] = alreadySet[href] || {}

    const elms = [
        ...document.querySelectorAll(`table[data-garden-id="tables.table"] tr[data-test-id="generic-table-row"]`), // queue list and search list
        ...document.querySelectorAll(`table[data-onboarding-id="table_main"] tr[data-test-id="table-regular-row"]`), // list of customer's tickets
    ].filter(Boolean)

    elms.forEach((el) => {
        const idEl = el.getAttribute('aria-describedby')

        let id = ""
        if (idEl) {
            id = idEl.replace("generic-table-row-", "")
        }
        if (!id) {
            id = el.textContent.match(/(#)([0-9]+)/)[2]; // pull it out from the text
        }

        if (alreadySet[href][id]) {
            return
        }

        el.addEventListener('mousedown', (e) => {
            e.preventDefault()
            e.stopImmediatePropagation()
            e.stopPropagation();
            if (e.button == 0 || e.button == 1) {
                const ticket = `https://temporalsupport.zendesk.com/agent/tickets/${id}`
                window.open(ticket, "_blank")
            }
        })

        alreadySet[href][id] = true;
    });
}


// Add the dimming effect to the tickets
const style = document.createElement('style');
style.innerHTML = `
.woo-fade {
    transition: color 0.5s;
}
.woo-dim {
    color: #C8C8C8;
    /* outline: 1px solid red;*/
}
`;
document.head.appendChild(style);
// support Dark Reader too
setInterval(() => {
    const darkReaderStyle = document.querySelector("head > style.darkreader.darkreader--override")
    if (darkReaderStyle && darkReaderStyle.innerHTML.indexOf(".woo-dim") === -1) {
        darkReaderStyle.innerHTML += `
.woo-dim {
    color: #ffffff33 !important;
}
`
    }
}, 1000)


const styleDimmableTickets = async () => {
    // Ticket Queue view
    document.querySelectorAll('td[data-test-id="generic-table-cells-id"]')
        .forEach(el => {
            const entireRow = el.parentElement;

            const dimmableElements = [
                entireRow,
                entireRow.querySelector('a'), // ticket subject is a special <a> link
                entireRow.querySelector('time'), // SLA clock
            ]

            const isWatching = justWatchingTickets[el.textContent.replace("#", "")];
            dimmableElements.forEach(element => {
                if (isWatching) {
                    element.classList.add("woo-fade", "woo-dim");
                } else {
                    element.classList.remove("woo-dim");
                }
            })
        })

    // Single Ticket view
    const ticketEl = document.querySelector('span[data-test-id="tabs-section-nav-item-ticket"]')
    if (ticketEl) {
        const ticketId = ticketEl.textContent.trim().replace(/(\n|.)* #/, "")

        let elWatchToggle = document.querySelector('#us_toggleWatch')
        if (!elWatchToggle) {
            elWatchToggle = document.createElement("button")
            elWatchToggle.style.marginLeft = "10px"
            elWatchToggle.onclick = () => toggleWatch(ticketId)
            elWatchToggle.id = "us_toggleWatch"
            ticketEl.parentElement.appendChild(elWatchToggle)
        }

        const isWatching = justWatchingTickets[ticketId];
        elWatchToggle.textContent = isWatching ? "undim" : "dim";
        setDim(isWatching);
    }
}

const toggleWatch = async (ticketId) => {
    justWatchingTickets[ticketId] = !justWatchingTickets[ticketId];

    // Save the updated watch list
    await GM.setValue(GM_KEY_justWatchingTicketsKey, JSON.stringify(justWatchingTickets));

    await styleDimmableTickets();
}

const setDim = (shouldDim) => {
    const elements = [
        document.querySelector('div[data-test-id="header-tab-title"]'),
        document.querySelector('div[data-test-id="header-tab-subtitle"]'),
        ...Array.from(document.querySelectorAll('span[data-test-id="tabs-section-nav-item-ticket"]')).flatMap(ticketEl =>
            Array.from(ticketEl.parentElement.querySelectorAll("span"))
        ),

        // ticket subject
        document.querySelector('div[data-support-suite-trial-onboarding-id="conversationPane"] input[data-garden-container-id="containers.field.input"]'),

        // sidebar
        ...document.querySelectorAll('div.ticket_fields :is(' + [
            'label',
            'div[data-toggle="true"]',
            'div[data-garden-container-id="containers.selection"]',
            'input',
            'div[data-garden-id="dropdowns.multiselect_items_container"]',
            'div[data-garden-id="dropdowns.multiselect_item_wrapper"]',
            'div[data-garden-id="tags.tag_view"]',
            'span.garden-tag-item',
            'span', // follower names
        ].join(",") + ')')
    ].filter(Boolean);

    elements.forEach(element => {
        if (shouldDim) {
            element.classList.add("woo-fade", "woo-dim");
        } else {
            element.classList.remove("woo-dim");
        }
    });
}







