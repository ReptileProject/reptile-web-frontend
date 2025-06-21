<template>
    <div class="search-field">
        <label for="regionSelect">서식지 지역</label>
        <select id="regionSelect" :value="modelValue" @change="onChange">
            <option value="">전체</option>
            <option v-for="region in regions" :key="region.regionId" :value="region.regionId">
                {{ region.regionName }}
            </option>
        </select>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as creatureApi from '@/axios/CreatureAxios'

const props = defineProps({
    modelValue: [String, Number]
})
const emit = defineEmits(['update:modelValue'])

const regions = ref([])

function onChange(event) {
    emit('update:modelValue', event.target.value)
}

onMounted(async () => {
    try {
        const res = await creatureApi.getAllRegions()
        regions.value = res.data
    } catch (e) {
        console.error('지역 목록 불러오기 실패:', e)
    }
})
</script>

<style scoped>
.search-field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
    min-width: 200px;
}

label {
    font-weight: 600;
    color: #2e7d32;
    font-size: 0.9rem;
    letter-spacing: 0.02em;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

label::before {
    content: "🌍";
    font-size: 1rem;
}

select {
    padding: 0.75rem 1rem;
    border: 2px solid #c8e6c9;
    border-radius: 12px;
    background: white;
    font-size: 1rem;
    transition: all 0.3s ease;
    outline: none;
    cursor: pointer;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2366bb6a' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 0.75rem center;
    background-repeat: no-repeat;
    background-size: 1.5em 1.5em;
    padding-right: 2.5rem;
    appearance: none;
}

select:focus {
    border-color: #66bb6a;
    box-shadow: 0 0 0 3px rgba(102, 187, 106, 0.1);
    transform: translateY(-1px);
}

select:hover {
    border-color: #4caf50;
}

select:disabled {
    background: #f5f5f5;
    color: #9e9e9e;
    cursor: not-allowed;
    border-color: #e0e0e0;
}

option {
    padding: 0.5rem;
    background: white;
    color: #2e7d32;
}

option:hover {
    background: #e8f5e8;
}

option:checked {
    background: #66bb6a;
    color: white;
}
</style>