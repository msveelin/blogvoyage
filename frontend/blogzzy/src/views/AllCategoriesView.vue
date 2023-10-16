<template>
     <nav-bar />
    <div class="flex flex-col place-content-center place-items-center">
        <div class="py-8 border-b-2">
            <h1 class="text-4xl font-extrabold">All Categories</h1>
        </div>
        <div class="list-none py-8">
            <li v-for="(category, index) in categories" class="bg-cyan-400 p-5 rounded-md my-4 cursor-pointer" :key="index">
                <router-link class="text-xl" :to="`/category/${category.slug}`">{{ category.name }}</router-link>
            </li>
        </div>
    </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import gql from "graphql-tag"
import { ref, onMounted } from 'vue';
import apolloClient from "@/apollo-config";

const categories = ref(null)

const fetchPostInfo = async () => {
    try {
        console.log('Fetching site information...');
        const response = await apolloClient.query({
            query: gql`
        query {
            allCategories{
                name
                slug
                description
            }
        }
      `,
        });
        console.log('Response:', response);
        categories.value = response.data.allCategories;
  
    } catch (error) {
        console.error('Error fetching site information:', error);
    }
};

onMounted(() => {
    fetchPostInfo()
})

</script>