<template>
    <div class="creature-list-page">
        <SearchBar @search="handleSearch" />

        <div class="results">
            <div v-if="loading">로딩 중...</div>
            <div v-else-if="error">{{ error }}</div>
            <div v-else-if="creatures.length === 0">검색 결과 없음</div>
            <div class="creature-grid">
                <div v-for="creature in creatures" :key="creature.id" class="creature-card"
                    @click="openDetailModal(creature.id)">
                    <h3>{{ creature.name }}</h3>
                    <p>{{ creature.description }}</p>
                </div>
            </div>
        </div>

        <!-- 상세 모달 -->
        <CreatureDetailModal v-if="showModal" :creature="selectedCreature" @close="showModal = false" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useCreatureStore } from '@/stores/creatureStore'
import SearchBar from '@/components/creature/SearchBarComponent.vue'
import CreatureDetailModal from '@/components/creature/CreatureDetailModal.vue'

const creatureStore = useCreatureStore()
const { creatureList: creatures, loading, error, selectedCreature } = storeToRefs(creatureStore)

const showModal = ref(false)

const handleSearch = (condition) => {
    creatureStore.fetchCreatureList(condition)
}

const openDetailModal = (creatureId) => {
    creatureStore.fetchCreatureDetail(creatureId)
    showModal.value = true
}
</script>

<style scoped>
.creature-list-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #f1f8e9 0%, #e8f5e8 50%, #dcedc8 100%);
    padding: 1.5rem 1rem;
}

.results {
    max-width: 1200px;
    margin: 0.75rem auto 0;
    padding: 0 1rem;
}

.results>div:first-child {
    text-align: center;
    padding: 2rem 1.5rem;
    font-size: 1.1rem;
    color: #2e7d32;
    font-weight: 600;
    background: white;
    border-radius: 12px;
    box-shadow: 0 3px 15px rgba(76, 175, 80, 0.08);
    border: 1px solid rgba(139, 195, 74, 0.2);
}

.creature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
}

.creature-card {
    padding: 1.5rem;
    background: white;
    border: 2px solid #c8e6c9;
    border-radius: 16px;
    box-shadow: 0 4px 15px rgba(76, 175, 80, 0.1);
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.creature-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #66bb6a, #4caf50, #388e3c);
    transform: scaleX(0);
    transition: transform 0.3s ease;
}

.creature-card:hover::before {
    transform: scaleX(1);
}

.creature-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(76, 175, 80, 0.2);
    border-color: #66bb6a;
}

.creature-card:active {
    transform: translateY(-2px);
}

.creature-card h3 {
    margin: 0 0 0.75rem 0;
    color: #1b5e20;
    font-size: 1.3rem;
    font-weight: 700;
    line-height: 1.3;
}

.creature-card p {
    margin: 0;
    color: #2e7d32;
    font-size: 0.95rem;
    line-height: 1.5;
    opacity: 0.9;
}

/* 로딩, 에러, 빈 결과 상태 스타일 */
.results>div:not(.creature-grid) {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 150px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 3px 15px rgba(76, 175, 80, 0.08);
    border: 1px solid rgba(139, 195, 74, 0.2);
    font-size: 1rem;
    font-weight: 600;
    color: #2e7d32;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
    .creature-list-page {
        padding: 1rem 0.5rem;
    }

    .creature-grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1rem;
        margin-top: 1rem;
    }

    .creature-card {
        padding: 1.25rem;
    }

    .creature-card h3 {
        font-size: 1.2rem;
    }

    .creature-card p {
        font-size: 0.9rem;
    }

    .results>div:not(.creature-grid) {
        min-height: 120px;
        padding: 1rem;
        font-size: 0.95rem;
    }
}
</style>