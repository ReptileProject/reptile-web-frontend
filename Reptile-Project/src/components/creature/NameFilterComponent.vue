<template>
    <div class="search-field">
        <label for="speciesName">이름으로 검색</label>
        <input type="text" id="speciesName" :value="modelValue" @input="onInput" placeholder="예: 청개구리" />
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: String
})
const emit = defineEmits(['update:modelValue'])

function onInput(event) {
    emit('update:modelValue', event.target.value)
}
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
    content: "🔍";
    font-size: 1rem;
}

input {
    padding: 0.75rem 1rem;
    border: 2px solid #c8e6c9;
    border-radius: 12px;
    background: white;
    font-size: 1rem;
    transition: all 0.3s ease;
    outline: none;
}

input:focus {
    border-color: #66bb6a;
    box-shadow: 0 0 0 3px rgba(102, 187, 106, 0.1);
    transform: translateY(-1px);
}

input::placeholder {
    color: #81c784;
    font-style: italic;
}

input:hover {
    border-color: #4caf50;
}
</style>