<template>
  <div>
    <!--<HeaderComponent />
    
    <RouterView />

    <FooterComponent />-->

    <TaxonomyFilterComponent />
  </div>
</template>

<script setup>
import HeaderComponent from '@/components/common/HeaderComponent.vue'
import FooterComponent from '@/components/common/FooterComponent.vue'
import TaxonomyFilterComponent from './components/creature/TaxonomyFilterComponent.vue'
import { RouterView } from 'vue-router'
</script>

<style scoped></style>