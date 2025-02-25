// Function to find Privacy Policy links on the page
function findPrivacyPolicy() {
    const links = document.querySelectorAll("a"); 
    const keywords = ["privacy", "gdpr", "data protection"]; 
    let found = false;
    let policyURL = "";

    links.forEach(link => {
        const text = link.innerText.toLowerCase();
        if (keywords.some(keyword => text.includes(keyword))) {
            found = true;
            policyURL = link.href;
        }
    });

    // Send the result to popup.js
    chrome.runtime.sendMessage({
        type: "privacyPolicyCheck",
        found: found,
        url: policyURL
    });
}

// Run the function when the content script is loaded
findPrivacyPolicy();

// Function to find cookie consent banners
function findCookieBanner() {
    const bannerKeywords = ["cookie", "consent", "gdpr", "privacy", "agree"];
    const elements = document.querySelectorAll("div, section, footer, popup, modal");

    let found = false;

    elements.forEach(el => {
        const text = el.innerText.toLowerCase();
        if (bannerKeywords.some(keyword => text.includes(keyword))) {
            found = true;
        }
    });

    // Send the result to popup.js
    chrome.runtime.sendMessage({
        type: "cookieBannerCheck",
        found: found
    });
}

// Run the function when the content script is loaded
findCookieBanner();
