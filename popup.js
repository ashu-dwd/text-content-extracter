// Helper Functions
const Helpers = {
    // Toggle loading state
    toggleLoading: function (show) {
        const loadingEl = document.getElementById('loading');
        const contentArea = document.querySelector('.content-area');

        if (show) {
            loadingEl.style.display = 'block';
            contentArea.style.display = 'none';
        } else {
            loadingEl.style.display = 'none';
            contentArea.style.display = 'block';
        }
    },

    // Show toast message
    showToast: function (message, type = 'success', duration = 3000) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = 'toast show';
        if (type === 'error') {
            toast.classList.add('error');
        }

        setTimeout(() => {
            toast.classList.remove('show', 'error');
        }, duration);
    }
};

// Copy button functionality
document.getElementById('copy-content').addEventListener('click', async () => {
    const content = document.getElementById('content');
    try {
        await navigator.clipboard.writeText(content.textContent);
        Helpers.showToast('Copied to clipboard!');
    } catch (err) {
        console.error('Failed to copy:', err);
        Helpers.showToast('Failed to copy text', 'error');
    }
});

// Fetch content functionality
document.getElementById('fetch-content').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    Helpers.toggleLoading(true);

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
                const contentDiv = document.getElementById('content');
                console.log(results[0].result)

                if (results?.[0]?.result) {
                    try {
                        // Get Gemini summary
                        const geminiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDK8mvT-oEpN3ts8f9N5uQ_mL850MZLmgo';

                        const geminiResponse = await fetch(geminiUrl, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                contents: [{
                                    parts: [{
                                        text: `Summarize the following article:

${results[0].result}

Structure and Format Requirements:
1. Create a concise 3-4 word title that captures the main theme
2. Include exactly 5-6 descriptive headings
3. Write 40-50 words under each heading
4. Keep total word count under 350 words
5. Use clear paragraph breaks between sections

Content Guidelines:
- Rewrite completely in your own words to avoid plagiarism
- Remove all company names and promotional language
- Use natural, conversational language
- Focus on key facts and insights
- Ensure each section flows logically to the next
- Write in an objective, non-promotional tone

Language Requirements:
DO NOT USE these overused phrases and their variations:
- "valuable insights"
- "crucial/significant role"
- "shed light on"
- "deeper understanding"
- "indelible mark"
- "lasting legacy"
- "dripping with sarcasm"
- "delve deeper"
- "significant advancements"
- "sense of purpose/camaraderie"
- "paving the way"
- "meticulously crafted"
- "renewed sense"
- "unwavering commitment"
- "rich tapestry"
- "stark reminder"

Instead:
- Use clear, direct language
- State findings and conclusions plainly
- Choose specific, concrete words
- Include precise metrics where relevant
- Use active voice
- Write straightforward descriptions

Format Example:
[3-4 Word Title]

[Heading 1]
[40-50 words of relevant content...]

[Heading 2]
[40-50 words of relevant content...]
[Continue pattern for remaining headings]

Remember: Be informative but concise, use original wording, and maintain objectivity throughout.`
                                    }]
                                }]
                            }),
                        });

                        const geminiData = await geminiResponse.json();

                        if (geminiData.candidates?.[0]?.content?.parts?.[0]?.text) {
                            contentDiv.textContent = geminiData.candidates[0].content.parts[0].text;
                        } else {
                            contentDiv.textContent = 'Unable to generate summary. Please try again.';
                            Helpers.showToast('Failed to generate summary', 'error');
                        }
                    } catch (error) {
                        console.error('Error in processing:', error);
                        contentDiv.textContent = 'Error generating summary. Please try again.';
                        Helpers.showToast('Error generating summary', 'error');
                    }
                } else {
                    contentDiv.textContent = 'Could not find content to summarize.';
                    Helpers.showToast('No content found', 'error');
                }
                Helpers.toggleLoading(false);
            }
        );
    } catch (error) {
        console.error('Error executing script:', error);
        document.getElementById('content').textContent = 'Error accessing page content. Please try again.';
        Helpers.showToast('Error accessing page', 'error');
        Helpers.toggleLoading(false);
    }
});