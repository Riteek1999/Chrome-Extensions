let urlsToBlock = ["https://twitter.com", "https://www.facebook.com"];

chrome.runtime.onMessage.addListener(
    function(request) {
        if(request.addUrl) {
            urlsToBlock.push(request.addUrl)
        }
    }
);

chrome.webRequest.onBeforeRequest.addListener (
    function(details) {
        console.log(details);
        console.log(urlsToBlock);

        if(urlsToBlock.includes(details.initiator)) {
            return {cancel: true};
        }
        else{
            return {cancel: false};
        } 
    }, 
    {urls: ["<all_urls>"]},
    ["blocking"]
    );