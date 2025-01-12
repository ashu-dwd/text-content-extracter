// Helper function to show toast message
function showToast(message, duration = 2000) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// Helper function to toggle loading state
function toggleLoading(show) {
    const loadingEl = document.getElementById('loading');
    const contentEl = document.getElementById('content');
    loadingEl.style.display = show ? 'block' : 'none';
    contentEl.style.display = show ? 'none' : 'block';
}

// Copy button functionality
document.getElementById('copy-content').addEventListener('click', () => {
    const content = document.getElementById('content');
    navigator.clipboard.writeText(content.textContent)
        .then(() => {
            showToast('Copied to clipboard!');
        })
        .catch(err => {
            showToast('Failed to copy text');
            console.error('Failed to copy text:', err);
        });
});

// Fetch content functionality
document.getElementById('fetch-content').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    toggleLoading(true);

    try {
        chrome.scripting.executeScript(
            {
                target: { tabId: tab.id },
                func: () => {
                    const div = document.getElementById('posts-content');
                    const removableContent = div ? div.querySelectorAll(
                        '.scriptlesssocialsharing, .related-post-hirepro-grey, #recent-posts-1, #block-9, .wp-block-group'
                    ) : null;

                    if (removableContent) {
                        removableContent.forEach((element) => {
                            element.textContent = '';
                        });
                    }
                    return div ? div.textContent : "Div with id 'posts-content' not found!";
                },
            },
            async (results) => {
                if (results?.[0]?.result) {
                    try {
                        const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDK8mvT-oEpN3ts8f9N5uQ_mL850MZLmgo';

                        const response = await fetch(url, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                contents: [{
                                    parts: [{
                                        text: `here is the article${results[0].result}. summarize article with max 5-6 headings with minimum 40 words in each. avoid pilgarism and write like human. main title in 3-4 words at starting. use small sentences in paragraphs. change subheadings texts. remove company name. there should not be more than 350 words in article.`
                                    }]
                                }]
                            }),
                        });

                        const data = await response.json();
                        const contentDiv = document.getElementById('content');

                        if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
                            contentDiv.textContent = data.candidates[0].content.parts[0].text;
                        } else {
                            contentDiv.textContent = 'Unable to generate summary. Please try again.';
                        }
                    } catch (error) {
                        console.error('Error fetching Gemini response:', error);
                        document.getElementById('content').textContent = 'Error generating summary. Please try again.';
                        showToast('Error generating summary', 3000);
                    }
                } else {
                    document.getElementById('content').textContent = 'Could not find content to summarize.';
                    showToast('No content found', 3000);
                }
                toggleLoading(false);
            }
        );
    } catch (error) {
        console.error('Error executing script:', error);
        document.getElementById('content').textContent = 'Error accessing page content. Please try again.';
        showToast('Error accessing page', 3000);
        toggleLoading(false);
    }
});