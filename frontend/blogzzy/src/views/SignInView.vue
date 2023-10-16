<template>
    <div class=" container items-center flex justify-center align-center w-full">
        <form class="bg-sky-300 text-white w-1/2 p-6 rounded-md shadow-md" @submit.prevent="userSignIn">
            <h2 class="text-center font-bold text-2xl">Log In</h2>
            <div class="flex flex-col">
                <label for="username">Username:</label>
                <input class="bg-white text-black p-2 mt-2 mb-2 rounded-md" type="text" id="username" v-model="signInDetails.username" required>
            </div>
            <div class="flex flex-col">
                <label for="password">Password:</label>
                <input class="bg-white  text-black p-2 mt-2 rounded-md" type="password" id="password" v-model="signInDetails.password"
                    required>
            </div>
            <button class="bg-sky-700 text-white mt-4 mb-3 w-full p-3 rounded-md" type="submit">Log In</button>
            <p>Don't have an account? <router-link class="text-sky-700 font-bold" to="/signup">Sign Up</router-link></p> 
        </form>
    </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { USER_SIGNIN } from '@/queries'
import apolloClient from "@/apollo-config";
import { useRouter } from 'vue-router';
import { ref } from 'vue'

const userStore = useUserStore()
const router = useRouter()

const signInDetails = ref({
    username: '',
    password: ''
});

const userSignIn = async () => {
    try {
        const user = await apolloClient.mutate({
            mutation: USER_SIGNIN,
            variables: {
                username: signInDetails.value.username,
                password: signInDetails.value.password,
            },
        })
        userStore.setToken(JSON.stringify(user.data.tokenAuth.token))
        userStore.setUser(JSON.stringify(user.data.tokenAuth.user))
        signInDetails.value.username = '';
        signInDetails.value.password = '';
        console.log("Logged in: ", user.data.tokenAuth.user)
        router.push('/')
    } catch (error) {
        console.error('Error signing up the user: ', error);
    }

}

</script>
<style scoped>
.container{
    height: 100vh;
}

</style>