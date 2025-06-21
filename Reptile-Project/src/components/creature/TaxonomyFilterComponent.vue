<template>
    <div>
        <div v-for="(level) in taxonomyLevels" :key="level.value">
            <label>{{ level.label }}</label>
            <select v-model="selectedIds[level.value]" @change="onGroupChange(level.value, $event.target.value)">
                <option value="">선택 안함</option>
                <option v-for="group in groups[level.value]" :key="group.groupId" :value="group.groupId">
                    {{ group.groupName }}
                </option>
            </select>

        </div>
    </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useTaxonomyStore } from '@/stores/TaxonomyStore'

const emit = defineEmits(['update:selectedGroup'])

const taxonomyLevels = [
    { label: '목(Order)', value: 'ORDER' },
    { label: '과(Family)', value: 'FAMILY' },
    { label: '족(Tribe)', value: 'TRIBE' },
    { label: '속(Genus)', value: 'GENUS' },
    { label: '종(Species)', value: 'SPECIES' }
]

const selectedIds = reactive({
    ORDER: null,
    FAMILY: null,
    TRIBE: null,
    GENUS: null,
    SPECIES: null
})

const groups = reactive({
    ORDER: [],
    FAMILY: [],
    TRIBE: [],
    GENUS: [],
    SPECIES: []
})

const store = useTaxonomyStore()

onMounted(async () => {
    await store.loadGroupChildren('ORDER', null)
    console.log('store.groupTree', store.groupTree)
    groups.ORDER = [...store.groupTree]  // 💡 배열 복사로 반응형 보장
})

const onGroupChange = async (level, value) => {
    console.log("Group Changed", { level, value })
    selectedIds[level] = value

    const index = taxonomyLevels.findIndex((l) => l.value === level)
    const next = taxonomyLevels[index + 1]?.value

    if (next) {
        selectedIds[next] = null
        groups[next] = []

        if (value) {
            const children = await store.loadGroupChildren(next, Number(value))
            groups[next] = children
        }
    }

    const last = taxonomyLevels.findLast((t) => selectedIds[t.value])
    emit('update:selectedGroup', last ? {
        level: last.value,
        groupId: selectedIds[last.value]
    } : null)
}
</script>

<style scoped>
div {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    border: 1px solid #e8f5e8;
    box-shadow: 0 2px 8px rgba(76, 175, 80, 0.08);
}

p {
    font-weight: 700;
    color: #1b5e20;
    margin: 0 0 1.5rem 0;
    font-size: 1.1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e8f5e8;
}

div>div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
    padding: 0;
    background: none;
    border: none;
    box-shadow: none;
}

div>div:last-child {
    margin-bottom: 0;
}

label {
    font-weight: 600;
    color: #2e7d32;
    font-size: 0.9rem;
    letter-spacing: 0.02em;
}

select {
    padding: 0.75rem 1rem;
    border: 2px solid #c8e6c9;
    border-radius: 8px;
    background: #fafafa;
    font-size: 0.95rem;
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
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 187, 106, 0.1);
    transform: translateY(-1px);
}

select:hover {
    border-color: #4caf50;
    background: white;
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
</style>