<template>
    <header>
        <h1>Reptile & Amphibian Haven</h1>
        <nav>
            <a id="speciesLink" href="#">Species Guide</a>
            <a id="forumLink" href="#">Community Forum</a>
            <a id="marketLink" href="#">Marketplace</a>
        </nav>
    </header>
</template>

<script setup>

</script>

<style scoped>
header {
    background-color: #2c5e3f;
    color: white;
    padding: 15px;
    text-align: center;
}

nav {
    display: flex;
    justify-content: center;
    gap: 20px;
    padding: 10px;
    background: #3a7d54;
}

nav a {
    color: white;
    text-decoration: none;
    font-weight: bold;
}
</style>