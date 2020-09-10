document.getElementById("new-url").addEventListener("keypress",
    function(e) {
        if(e.key === "Enter") {
            chrome.runtime.sendMessage({addUrl: e.target.value})
        }
    }
);