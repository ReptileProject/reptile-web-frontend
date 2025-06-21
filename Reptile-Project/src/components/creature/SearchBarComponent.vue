<template>
    <div class="filters">
        <NameFilter v-model="searchName" />
        <TaxonomyFilter @update:selectedGroup="onGroupSelected" />
        <RegionFilter v-model="selectedRegion" />
        <button @click="emitSearch">검색</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import NameFilter from '@/components/creature/NameFilterComponent.vue'
import TaxonomyFilter from '@/components/creature/TaxonomyFilterComponent.vue'
import RegionFilter from '@/components/creature/RegionFilterComponent.vue'

const emit = defineEmits(['search'])

const searchName = ref('')
const selectedRegion = ref('')
const selectedTaxonomy = ref(null)

const onGroupSelected = (groupInfo) => {
    selectedTaxonomy.value = groupInfo
}

const emitSearch = () => {
    emit('search', {
        name: searchName.value,
        region: selectedRegion.value,
        taxonomy: selectedTaxonomy.value?.id
    })
}
</script>

<style scoped>
.filters {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
    background: linear-gradient(135deg, #f8fdf8 0%, #e8f5e8 100%);
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(76, 175, 80, 0.08);
    border: 1px solid rgba(139, 195, 74, 0.2);
    max-width: 100%;
    margin: 0 auto 1.5rem;
}

/* 검색 버튼 스타일 */
button {
    padding: 0.75rem 2rem;
    background: linear-gradient(135deg, #66bb6a, #4caf50);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 0.5rem;
    align-self: center;
    min-width: 120px;
}

button:hover {
    background: linear-gradient(135deg, #4caf50, #388e3c);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
}

button:active {
    transform: translateY(0);
}

/* 공통 필드 스타일 - 더 컴팩트하게 */
.filters :deep(.search-field) {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    width: 100%;
}

.filters :deep(label) {
    font-weight: 600;
    color: #2e7d32;
    font-size: 0.85rem;
    letter-spacing: 0.02em;
}

.filters :deep(input),
.filters :deep(select) {
    padding: 0.6rem 0.8rem;
    border: 2px solid #c8e6c9;
    border-radius: 8px;
    background: white;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    outline: none;
}

.filters :deep(input:focus),
.filters :deep(select:focus) {
    border-color: #66bb6a;
    box-shadow: 0 0 0 2px rgba(102, 187, 106, 0.1);
}

.filters :deep(input::placeholder) {
    color: #81c784;
    font-style: italic;
}

.filters :deep(select) {
    cursor: pointer;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2366bb6a' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 0.6rem center;
    background-repeat: no-repeat;
    background-size: 1.2em 1.2em;
    padding-right: 2rem;
    appearance: none;
}

.filters :deep(select:hover),
.filters :deep(input:hover) {
    border-color: #4caf50;
}

/* TaxonomyFilter 컴팩트 스타일 */
.filters :deep(.taxonomy-container) {
    background: white;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #e8f5e8;
    box-shadow: 0 1px 4px rgba(76, 175, 80, 0.05);
}

.filters :deep(.taxonomy-container p) {
    font-weight: 600;
    color: #1b5e20;
    margin: 0 0 0.8rem 0;
    font-size: 0.9rem;
    padding-bottom: 0.3rem;
    border-bottom: 1px solid #e8f5e8;
}

.filters :deep(.taxonomy-container > div) {
    margin-bottom: 0.6rem;
}

.filters :deep(.taxonomy-container > div:last-child) {
    margin-bottom: 0;
}

/* 반응형 - 작은 화면에서 더 컴팩트 */
@media (max-width: 768px) {
    .filters {
        padding: 1rem;
        gap: 0.8rem;
        margin-bottom: 1rem;
    }

    .filters :deep(input),
    .filters :deep(select) {
        padding: 0.5rem 0.7rem;
        font-size: 0.85rem;
    }

    button {
        padding: 0.6rem 1.5rem;
        font-size: 0.9rem;
    }
}
</style>