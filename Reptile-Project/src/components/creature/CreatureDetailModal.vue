<template>
    <div class="modal-backdrop" @click.self="emit('close')">
        <div class="modal-content">
            <h2>{{ creature.name }}</h2>

            <!-- 주요 정보 -->
            <div class="info-block">
                <p><strong>서식지역:</strong> {{ creature.region || '정보 없음' }}</p>
                <p><strong>멸종위기 등급:</strong> {{ creature.endangeredLevel || '정보 없음' }}</p>
            </div>

            <!-- 분류 체계 -->
            <div class="taxonomy-block">
                <h3>분류 체계</h3>
                <ul>
                    <li><strong>목 (Order):</strong> {{ creature.orderName || '정보 없음' }}</li>
                    <li><strong>과 (Family):</strong> {{ creature.familyName || '정보 없음' }}</li>
                    <li><strong>족 (Tribe):</strong> {{ creature.tribeName || '정보 없음' }}</li>
                    <li><strong>속 (Genus):</strong> {{ creature.genusName || '정보 없음' }}</li>
                    <li><strong>종 (Species):</strong> {{ creature.speciesName || '정보 없음' }}</li>
                </ul>
            </div>

            <!-- 설명 및 이미지 -->
            <p class="description">{{ creature.description }}</p>

            <img v-if="creature.imageUrl" :src="creature.imageUrl" alt="생물 이미지" class="creature-image" />

            <button class="close-button" @click="emit('close')">닫기</button>
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
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.modal-content {
    background: #fff;
    padding: 2rem;
    border-radius: 1rem;
    max-width: 600px;
    width: 90%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

h2 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    color: #2e7d32;
}

.info-block p {
    font-size: 0.95rem;
    margin-bottom: 0.5rem;
}

.taxonomy-block {
    margin: 1rem 0;
}

.taxonomy-block h3 {
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
    color: #388e3c;
}

.taxonomy-block ul {
    list-style: none;
    padding: 0;
}

.taxonomy-block li {
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
}

.description {
    font-size: 0.9rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.creature-image {
    width: 100%;
    max-height: 240px;
    object-fit: cover;
    border-radius: 0.5rem;
}

.close-button {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.2s;
}

.close-button:hover {
    background-color: #388e3c;
}
</style>
