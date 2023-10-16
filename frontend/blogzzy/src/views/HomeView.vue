<script setup>

</script>

<template>
  <main class="bg-gray-100 pb-5">
    <nav-bar />
    <div>
      <div class="intro h-80 item-center flex align-center justify-center mb-5 text-center py-10">
        <h1 class="text-7xl font-bold">Welcome to <span class="text-white">BlogVoyage.</span></h1>
      </div>
      <div class="flex justify-end px-5">
        <router-link class="bg-sky-400 mb-3 font-bold text-white rounded-md p-2" to="/add-post">+ Add Post</router-link>
      </div>
      <div class="p-5">
        <h1 class="font-bold text-4xl">Recent Posts</h1>
        <span class="text-lg text-gray-400">A blog created with Django, Vue.js and Tailwind css</span>
      </div>

      <div class="mb-5 px-6 grid mt-5 gap-5 grid-cols-4">

        <div v-for="(post, index) in posts" :key="index" class="py-5 h-96 px-4 rounded-md bg-white border-b-2 flex">
          <div>
            <img :src="`http://localhost:8000/${post.featuredImage}`" class="w-full h-40 mb-3 object-cover" alt="">
            <h2 class="text-lg font-bold">{{ post.title }}</h2>
            <span class="text-lg text-gray-400">{{ post.createdAt }}</span> <br>
            <RouterLink to="#" class="text-cyan-700 mb-3">{{ post.category.name }}</RouterLink> <br>
            <RouterLink :to="`/post/${post.slug}`" class="text-cyan-400 mt-4">Read More</RouterLink>
          </div>
        </div>
      </div>
    </div>
    <footer-bar/>
  </main>
</template>
<script setup>
import NavBar from "@/components/Navbar.vue"
import gql from "graphql-tag"
import { ref, onMounted } from 'vue';
import apolloClient from "@/apollo-config";
import FooterBar from '@/components/FooterBar.vue'

const posts = ref(null)

const fetchPostInfo = async () => {


  try {
    console.log('Fetching site information...');
    const response = await apolloClient.query({
      query: gql`
        query {
          allPosts{
            title
            slug
            content
            featuredImage
            isPublished
            isFeatured
            category {
                id
                name
                slug
              }
            createdAt
            modifiedAt
      }
        }
      `,
    });
    // console.log('Response:', response);

    posts.value = response.data.allPosts;

  } catch (error) {
    console.error('Error fetching site information:', error);
  }
};

onMounted(() => {
  fetchPostInfo()
})

</script>

<style scoped>
.intro {
  background-image: url('../assets/images/intro-bg.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>