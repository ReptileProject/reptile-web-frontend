<template>
    <div class="filters">
        <NameFilter v-model="searchName" />
        <TaxonomyFilter @update:selectedGroup="onGroupSelected" />
        <RegionFilter v-model="selectedRegion" />
        <IucnFilter v-model="selectedIucnGroup" />
        <button @click="emitSearch">검색</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import NameFilter from '@/components/creature/NameFilterComponent.vue'
import TaxonomyFilter from '@/components/creature/TaxonomyFilterComponent.vue'
import RegionFilter from '@/components/creature/RegionFilterComponent.vue'
import IucnFilter from '@/components/creature/IucnFilterComponent.vue'
const emit = defineEmits(['search'])

const searchName = ref('')
const selectedRegion = ref('')
const selectedIucnGroup = ref('')
const selectedTaxonomy = ref(null)

const onGroupSelected = (groupInfo) => {
    selectedTaxonomy.value = groupInfo
}

const emitSearch = () => {
    emit('search', {
        name: searchName.value,
        region: selectedRegion.value,
        taxonomy: selectedTaxonomy.value?.id,
        iucn: selectedIucnGroup.value
    })
}
</script>

<style scoped>
.filters {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1rem;
    background: linear-gradient(135deg, #f8fdf8 0%, #e8f5e8 100%);
    border-radius: 8px;
    box-shadow: 0 1px 8px rgba(76, 175, 80, 0.06);
    border: 1px solid rgba(139, 195, 74, 0.15);
    max-width: 100%;
    margin: 0 auto 1rem;
}

/* 검색 버튼 스타일 */
button {
    padding: 0.5rem 1.5rem;
    background: linear-gradient(135deg, #66bb6a, #4caf50);
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 0.25rem;
    align-self: center;
    min-width: 100px;
}

button:hover {
    background: linear-gradient(135deg, #4caf50, #388e3c);
    transform: translateY(-1px);
    box-shadow: 0 3px 8px rgba(76, 175, 80, 0.25);
}

button:active {
    transform: translateY(0);
}

/* 공통 필드 스타일 - 더 컴팩트하게 */
.filters :deep(.search-field) {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    width: 100%;
}

.filters :deep(label) {
    font-weight: 600;
    color: #2e7d32;
    font-size: 0.8rem;
    letter-spacing: 0.02em;
}

.filters :deep(input),
.filters :deep(select) {
    padding: 0.5rem 0.7rem;
    border: 1px solid #c8e6c9;
    border-radius: 6px;
    background: white;
    font-size: 0.85rem;
    transition: all 0.3s ease;
    outline: none;
}

.filters :deep(input:focus),
.filters :deep(select:focus) {
    border-color: #66bb6a;
    box-shadow: 0 0 0 2px rgba(102, 187, 106, 0.08);
}

.filters :deep(input::placeholder) {
    color: #81c784;
    font-style: italic;
}

.filters :deep(select) {
    cursor: pointer;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2366bb6a' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 0.5rem center;
    background-repeat: no-repeat;
    background-size: 1em 1em;
    padding-right: 1.8rem;
    appearance: none;
}

.filters :deep(select:hover),
.filters :deep(input:hover) {
    border-color: #4caf50;
}

/* TaxonomyFilter는 가로 배치를 유지하도록 오버라이드 제거 */
.filters :deep(.taxonomy-filter) {
    /* 기본 스타일을 그대로 사용 */
}

/* 반응형 - 작은 화면에서 더 컴팩트 */
@media (max-width: 768px) {
    .filters {
        padding: 0.75rem;
        gap: 0.6rem;
        margin-bottom: 0.75rem;
    }

    .filters :deep(input),
    .filters :deep(select) {
        padding: 0.45rem 0.6rem;
        font-size: 0.8rem;
    }

    button {
        padding: 0.45rem 1.2rem;
        font-size: 0.85rem;
    }
}
</style>