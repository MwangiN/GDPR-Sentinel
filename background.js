chrome.runtime.onInstalled.addListener(() => {
    console.log("Privacy Sight installed.");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "checkSecurityHeaders") {
        let urlObj = new URL(message.url);
        let isHTTPS = urlObj.protocol === "https:"; // Proper HTTPS check

        fetch(message.url)
            .then(response => {
                const securityHeaders = {
                    "CSP": response.headers.has("content-security-policy"),
                    "HSTS": response.headers.has("strict-transport-security"),
                    "X-Frame-Options": response.headers.has("x-frame-options"),
                };

                sendResponse({
                    https: isHTTPS,
                    headers: securityHeaders
                });
            })
            .catch(error => console.error("Error fetching headers:", error));

        return true; // Keep the message channel open for async response
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "getCookies") {
        chrome.cookies.getAll({ domain: new URL(sender.tab.url).hostname }, (cookies) => {
            sendResponse(cookies.map(cookie => cookie.name));
        });
        return true; // Keep the message channel open for async response
    }
});
