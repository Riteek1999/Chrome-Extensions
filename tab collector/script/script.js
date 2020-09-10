chrome.runtime.onMessage.addListener(
    function(request) {
        if(request.title) {
            //NOTE store new urls
            chrome.windows.getCurrent({populate:true}, (window) => {
                const urls = window.tabs.filter(t => t.url.indexOf("chrome://") != 0);
                // console.log(urls);

                chrome.storage.sync.get(["urlLists"], (obj) => {
                    const currentLists = obj.urlLists ? obj.urlLists : [];
                    const mergeLists = [...currentLists, ...[{title: request, urls: urls}]];
                    console.log(mergeLists);
                    chrome.storage.sync.set({urlLists: mergeLists})
                });
            });
        }
    }
);

