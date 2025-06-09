document.addEventListener("DOMContentLoaded", function() {
    // 게시글 ID 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id") || "1";
    
    // 가상의 게시글 데이터 (실제 서버에서는 API 요청 필요)
    const posts = {
        "1": { title: "Best Terrarium Setup", author: "JohnDoe", date: "2025-03-17", content: "이것은 테라리움 설정에 대한 최고의 가이드입니다." },
        "2": { title: "Feeding Guide for Frogs", author: "JaneDoe", date: "2025-03-16", content: "이 글에서는 개구리를 어떻게 먹이는지 설명합니다." }
    };
    
    if (posts[postId]) {
        document.getElementById("post-title").innerText = posts[postId].title;
        document.getElementById("post-author").innerText = posts[postId].author;
        document.getElementById("post-date").innerText = posts[postId].date;
        document.getElementById("post-content").innerText = posts[postId].content;
    }
    
    // 좋아요 및 싫어요 기능
    let likeCount = 0, dislikeCount = 0;
    document.getElementById("like-btn").addEventListener("click", function() {
        likeCount++;
        document.getElementById("like-count").innerText = likeCount;
    });
    document.getElementById("dislike-btn").addEventListener("click", function() {
        dislikeCount++;
        document.getElementById("dislike-count").innerText = dislikeCount;
    });
    
    // 댓글 기능
    document.getElementById("submit-comment").addEventListener("click", function() {
        const commentInput = document.getElementById("comment-input");
        if (commentInput.value.trim() !== "") {
            const newComment = document.createElement("li");
            newComment.innerText = commentInput.value;
            document.getElementById("comments-list").appendChild(newComment);
            commentInput.value = "";
        }
    });
});