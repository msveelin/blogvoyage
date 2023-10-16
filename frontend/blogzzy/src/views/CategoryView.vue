<template>
    <nav-bar />
    <div class="bg-gray-100">
        <h1 class="text-2xl font-semibold mb-4">Posts in {{ $route.params.category }}</h1>
        <div class="grid grid-cols-4 gap-5">
            <div v-for="post in posts" :key="post.id" class="py-5 px-4 rounded-md bg-white border-b-2 flex">
                <div>
                    <h2 class="text-lg font-bold">{{ post.title }}</h2>
                    <span class="text-lg text-gray-400">{{ post.createdAt }}</span> <br>
                    <RouterLink :to="`/post/${post.slug}`" class="text-cyan-400 mt-4">Read More</RouterLink>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import NavBar from "@/components/Navbar.vue"
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { POSTS_BY_CATEGORY } from "@/queries";

import apolloClient from "@/apollo-config";
const route = useRoute()

const category = ref(route.params.category)
const posts = ref(null)

const fetchPostInfo = async () => {
    try {
        console.log('Fetching site information...');
        const response = await apolloClient.query({
            query: POSTS_BY_CATEGORY,
            variables: { category: category.value },
        });
        posts.value = response.data.postsByCategory;

    } catch (error) {
        console.error('Error fetching site information:', error);
    }
};

onMounted(() => {
    fetchPostInfo()
})

</script>
