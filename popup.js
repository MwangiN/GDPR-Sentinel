// Listen for messages from content.js
chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "privacyPolicyCheck") {
        const result = document.getElementById("result");
        
        if (message.found) {
            result.innerHTML = `<p>✅ Privacy Policy Found: <a href="${message.url}" target="_blank">View Policy</a></p>`;
        } else {
            result.innerHTML = `<p>❌ Privacy Policy Not Found</p>`;
        }
    }
});

// Inject content script on button click
document.getElementById("scan").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ["content.js"]
        });
    });
});

// Listen for messages from content.js
chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "cookieBannerCheck") {
        const bannerResult = document.getElementById("bannerResult");

        if (message.found) {
            bannerResult.innerHTML = `<p>✅ Cookie Consent Banner Detected.</p>`;
        } else {
            bannerResult.innerHTML = `<p>❌ No Cookie Consent Banner Found.</p>`;
        }
    }
});

// Inject content script on button click
document.getElementById("scan").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ["content.js"]
        });
    });
});

