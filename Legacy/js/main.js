const postsData = {
    guide: [
        { img: "../assets/image/frog.png", title: "Best Beginner Species", link: "#" },
        { img: "../assets/image/frog.png", title: "Rare Amphibians Guide", link: "#" },
        { img: "../assets/image/frog.png", title: "Habitat Setup Tips", link: "#" }
    ],
    forum: [
        { img: "../assets/image/frog.png", title: "Popular Pet Lizards", link: "#" },
        { img: "../assets/image/frog.png", title: "Show Your Terrariums", link: "#" },
        { img: "../assets/image/frog.png", title: "Breeding Tips", link: "#" }
    ],
    tips: [
        { img: "../assets/image/frog.png", title: "Feeding Guide", link: "#" },
        { img: "../assets/image/frog.png", title: "Health Tips", link: "#" },
        { img: "../assets/image/frog.png", title: "Terrarium Maintenance", link: "#" }
    ],
    market: [
        { img: "../assets/image/frog.png", title: "Trusted Sellers", link: "#" },
        { img: "../assets/image/frog.png", title: "Rare Species Available", link: "#" },
        { img: "../assets/image/frog.png", title: "Best Terrarium Deals", link: "#" }
    ]
};

const pageMapping = new Map([
    ['speciesLink', '../html/species.html'],
    ['forumLink', '../html/community.html'],
    ['marketLink', '../html/marketplace.html']
]);

const updateLinkByClass = (htmlClass)=>{
    let links = document.querySelectorAll('.'+htmlClass);
    let targetPage = pageMapping.get(htmlClass);
    links.forEach(function(link){
        link.href = targetPage;
    })
}

document.addEventListener("DOMContentLoaded", function() {
    Object.keys(postsData).forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const bestPostsContainer = document.createElement("div");
            bestPostsContainer.classList.add("best-posts");

            postsData[sectionId].forEach(post => {
                const postCard = document.createElement("div");
                postCard.classList.add("post-card");

                postCard.innerHTML = `
                    <img src="${post.img}" alt="${post.title}">
                    <h3><a href="${post.link}">${post.title}</a></h3>
                `;

                bestPostsContainer.appendChild(postCard);
            });

            section.parentNode.appendChild(bestPostsContainer);
        }
    });
});