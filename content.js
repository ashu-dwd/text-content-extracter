// Access the div with id 'posts-content'
const div = document.getElementById('posts-content');
const socialSharingDiv = document.getElementsByClassName('scriptlesssocialsharing');
const recentPosts = document.getElementById('recent-posts-1');
const relatedBlogs = document.getElementsByClassName("related-post-hirepro-grey");
const extra = document.getElementById('block-9');
if (div) {
    socialSharingDiv.remove();
    recentPosts.remove();
    relatedBlogs.remove();
    extra.remove();

    alert(`Div content: ${div.textContent}`);
} else {
    alert("Div with id 'posts-content' not found!");
}
