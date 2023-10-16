<template>
    <nav-bar></nav-bar>
    <quill-editor v-model:content="quillContent"></quill-editor>
</template>

<script setup>
import { ref } from 'vue';
import NavBar from "@/components/NavBar.vue"

const quillContent = ref('')

console.log(quillContent)
</script>