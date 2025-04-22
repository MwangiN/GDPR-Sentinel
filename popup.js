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

//listens to background.js
document.getElementById("scan").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) return;

        let currentUrl = tabs[0].url;

        chrome.runtime.sendMessage({ type: "checkSecurityHeaders", url: currentUrl }, (response) => {
            if (!response) return;

            document.getElementById("httpsResult").innerText = response.https ? "✅ Secure" : "❌ Not Secure";
            document.getElementById("cspResult").innerText = response.headers.CSP ? "✅ Present" : "❌ Missing";
            document.getElementById("hstsResult").innerText = response.headers.HSTS ? "✅ Present" : "❌ Missing";
            document.getElementById("xFrameResult").innerText = response.headers["X-Frame-Options"] ? "✅ Present" : "❌ Missing";
        });
    });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "personalDataDetected") {
        let data = message.data;
        
        // Forms
        let formResults = data.forms.length > 0 ? data.forms.map(f => `• ${f.name || f.type} (Input)`).join("<br>") : "✅ No sensitive form fields detected.";

        // Cookies
        let cookieResults = data.cookies.length > 0 ? `❗ Found ${data.cookies.length} cookies.` : "✅ No cookies detected.";

        // Local Storage
        let localStorageResults = data.localStorageKeys.length > 0 ? `❗ Found ${data.localStorageKeys.length} stored keys.` : "✅ No localStorage usage detected.";

        // Session Storage
        let sessionStorageResults = data.sessionStorageKeys.length > 0 ? `❗ Found ${data.sessionStorageKeys.length} stored keys.` : "✅ No sessionStorage usage detected.";

        document.getElementById("formDataResult").innerHTML = formResults;
        document.getElementById("cookieResult").innerText = cookieResults;
        document.getElementById("localStorageResult").innerText = localStorageResults;
        document.getElementById("sessionStorageResult").innerText = sessionStorageResults;
    }
});
