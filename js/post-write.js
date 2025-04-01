document.getElementById("post-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const title = document.getElementById("post-title").value;
    const content = document.getElementById("post-content").value;
    
    if (title.trim() && content.trim()) {
        alert("게시글이 작성되었습니다!");
        window.location.href = "/community.html"; // 게시글 목록 페이지로 이동 (예시)
    }
});