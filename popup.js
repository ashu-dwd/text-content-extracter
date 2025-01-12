document.getElementById("fetch-content").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            func: () => {
                // Access the 'posts-content' div
                const div = document.getElementById("posts-content");

                // Access and remove content of the 'scriptlesssocialsharing' div inside 'posts-content'
                const removableContent = div ? div.querySelectorAll(".scriptlesssocialsharing, .related-post-hirepro-grey, #recent-posts-1, #block-9, .wp-block-group") : null;
                if (removableContent) {
                    removableContent.forEach((element) => {
                        element.textContent = ""; // Clears the content of the div
                    });
                }

                // Return the content of the 'posts-content' div (after removal of the inner div content)
                return div ? div.textContent : "Div with id 'posts-content' not found!";
            },
        },
        (results) => {
            // Display the content in the popup
            const contentDiv = document.getElementById("content");
            contentDiv.innerText = results[0].result;
        }
    );
});