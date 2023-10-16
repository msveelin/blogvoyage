<template>

<header class="px-5 py-5 w-full align-center bg-black shadow-md flex items-center align-center justify-between font-bold">
    <div>
      <h1 class="text-4xl text-sky-400">BlogVoyage</h1>
      <h1 class="text-white italic">Your Journey, Your Story</h1>
    </div>
    <nav class="w-1/3 flex align-center text-white justify-between">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <div v-if="user.isAuthenticated">
      <span>Profile</span>
      <span class="ml-3" @click="userSignOut">Sign Out</span>
      </div>
      <div v-else>
        <RouterLink class="mx-2" to="/signup">Sign Up</RouterLink>
        <RouterLink to="/login">Log In</RouterLink>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { SITE_INFO } from '@/queries';
import { useUserStore } from '@/stores/user'
import { ref, onMounted } from 'vue';
import apolloClient from "@/apollo-config";
import { useRouter } from 'vue-router'

const mySite = ref(null)
const userStore = useUserStore()
const router = useRouter()

const user = ref({
  isAuthenticated: false,
  token: userStore.getToken || "",
  user: userStore.getUser || null,
})

const fetchSiteInfo = async () => {

  try {
    const response = await apolloClient.query({
      query: SITE_INFO,
    });
    mySite.value = response.data.site;
    if(user.value.token) {
      user.value.isAuthenticated = true
    }
  } catch (error) {
    console.error('Error fetching site information:', error);
  }
};

const userSignOut = () => {
  userStore.removeToken()
  userStore.removeUser()
  router.push('/login')

}

onMounted(() => {
  fetchSiteInfo()
  user
})
</script>

<style scoped></style>