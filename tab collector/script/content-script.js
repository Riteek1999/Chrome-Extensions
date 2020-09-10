document.getElementById("urls-group-title").addEventListener("keypress",
    function(e) {
        if(e.key === "Enter") {
            chrome.runtime.sendMessage({title: e.target.value})
        }
    }
);

chrome.storage.sync.get(["urlLists"], (obj) => {
    if(obj.urlLists.length) {
        const htmlLists = obj.urlLists.map((list) => {
            const container = document.createElement("div");
            container.setAttribute("class", "title");
            container.innerHTML = list.title;

            container.addEventListener("click", () => {
                const urlStrings = list.urls.map((urlObject) => urlObject.url);
                chrome.windows.create({url: urlStrings});
            })

            list.urls.forEach((urlObject) => {
                const div = document.createElement("div");
                div.innerHTML = urlObject.url;
                container.appendChild(div);
            })

            return container;
        });
        
        htmlLists.forEach((list) => {
            document.getElementById("lists-container").appendChild(list);
        })
    }
})