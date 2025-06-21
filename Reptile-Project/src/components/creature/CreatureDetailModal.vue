<template>
    <div class="modal-backdrop" @click.self="emit('close')">
        <div class="modal-content">
            <h2>{{ creature.name }}</h2>
            <p>{{ creature.description }}</p>
            <!-- 예: 이미지 -->
            <img v-if="creature.imageUrl" :src="creature.imageUrl" alt="생물 이미지" />
            <button @click="emit('close')">닫기</button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    creature: Object
})
const emit = defineEmits(['close'])
</script>

<style scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.modal-content {
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    max-width: 500px;
    width: 100%;
}
</style>
