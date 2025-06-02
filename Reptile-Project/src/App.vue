<template>
  <div>
    <HeaderComponent />

    <RouterView />

    <FooterComponent />
  </div>
</template>

<script setup>
import HeaderComponent from '@/components/common/HeaderComponent.vue'
import FooterComponent from '@/components/common/FooterComponent.vue'
import { RouterView } from 'vue-router'
</script>

<style scoped></style>