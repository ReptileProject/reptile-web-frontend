document.addEventListener("DOMContentLoaded", function () {
    const speciesList = [
        { name: "Green Tree Frog", image: "/assets/image/frog.png", category: "amphibian", description: "A small, bright green amphibian." },
        { name: "Leopard Gecko", image: "/assets/image/gecko.png", category: "reptile", description: "A friendly and easy-to-care-for reptile." },
        { name: "Red-Eyed Tree Frog", image: "/assets/image/red-eyed-frog.png", category: "amphibian", description: "Famous for its vibrant colors and big eyes." },
        { name: "Ball Python", image: "/assets/image/python.png", category: "reptile", description: "A calm and docile snake." },
        { name: "Crested Gecko", image: "/assets/image/crested-gecko.png", category: "reptile", description: "A popular beginner-friendly gecko species." },
        { name: "Axolotl", image: "/assets/image/axolotl.png", category: "amphibian", description: "A fascinating amphibian that remains aquatic throughout life." }
    ];

    const speciesContainer = document.querySelector(".species-list");
    const searchBar = document.getElementById("searchBar");
    const categoryFilter = document.getElementById("categoryFilter");

    const modal = document.getElementById("speciesModal");
    const modalName = document.getElementById("speciesName");
    const modalImage = document.getElementById("speciesImage");
    const modalDescription = document.getElementById("speciesDescription");
    const closeModal = document.querySelector(".close-btn");

    function displaySpecies(filter = "all", searchQuery = "") {
        speciesContainer.innerHTML = "";  // 기존 리스트 초기화

        speciesList
            .filter(species => (filter === "all" || species.category === filter))  // 카테고리 필터
            .filter(species => species.name.toLowerCase().includes(searchQuery.toLowerCase())) // 검색 필터
            .forEach(species => {
                const card = document.createElement("div");
                card.classList.add("species-card");
                card.innerHTML = `
                    <img src="${species.image}" alt="${species.name}">
                    <h3>${species.name}</h3>
                `;

                // 카드 클릭 시 모달 열기
                card.addEventListener("click", function () {
                    modalName.textContent = species.name;
                    modalImage.src = species.image;
                    modalDescription.textContent = species.description;
                    modal.classList.add("show");
                });

                speciesContainer.appendChild(card);
            });
    }

    // 초기 전체 리스트 표시
    displaySpecies();

    // 🔍 검색 기능
    searchBar.addEventListener("input", function (e) {
        const query = e.target.value;
        displaySpecies(categoryFilter.value, query);
    });

    // 📂 카테고리 필터링
    categoryFilter.addEventListener("change", function () {
        displaySpecies(categoryFilter.value, searchBar.value);
    });

    // ❌ 모달 닫기
    closeModal.addEventListener("click", function () {
        modal.classList.remove("show");
    });

    // 배경 클릭 시 모달 닫기
    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.classList.remove("show");
        }
    });
});
