const forumData = {
    general: [
        { id: 1, title: "Best Terrarium Setup", author: "JohnDoe", tags: "#Terrarium #Setup", date: "2025-03-17" },
        { id: 2, title: "Feeding Guide for Frogs", author: "JaneDoe", tags: "#Feeding #Frogs", date: "2025-03-16" }
    ],
    care: [
        { id: 1, title: "How to Keep Your Lizard Healthy", author: "ReptileLover", tags: "#Lizard #Health", date: "2025-03-15" }
    ],
    market: [
        { id: 1, title: "Selling Rare Frogs", author: "ExoticTrader", tags: "#Market #Frogs", date: "2025-03-14" }
    ]
};

function changeForum() {
    const forumSelect = document.getElementById("forumSelect").value;
    const tableBody = document.getElementById("forumTable").querySelector("tbody");
    tableBody.innerHTML = "";

    forumData[forumSelect].forEach(post => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${post.id}</td>
            <td><a href="post${post.id}.html">${post.title}</a></td>
            <td>${post.author}</td>
            <td>${post.tags}</td>
            <td>${post.date}</td>
        `;
        tableBody.appendChild(row);
    });
}

document.addEventListener("DOMContentLoaded", changeForum);