document.addEventListener("DOMContentLoaded", function() {
    // 게시글 ID 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id") || "1";
    
    // 가상의 게시글 데이터 (실제 서버에서는 API 요청 필요)
    const posts = {
        "1": { title: "Best Terrarium", author: "JohnDoe", date: "2025-03-17", content: "Terrarium Sale" },
    };
    
    if (posts[postId]) {
        document.getElementById("sale-title").innerText = posts[postId].title;
        document.getElementById("sale-author").innerText = posts[postId].author;
        document.getElementById("sale-date").innerText = posts[postId].date;
        document.getElementById("sale-content").innerText = posts[postId].content;
    }
    
    // 구매매 기능
    let buyCount = 0;
    document.getElementById("buy-btn").addEventListener("click", function() {
        likeCount++;
        document.getElementById("buy-count").innerText = buyCount;
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