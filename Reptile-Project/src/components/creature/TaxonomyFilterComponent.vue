<template>
    <div>
        <p>TaxonomyFilterComponent</p>
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