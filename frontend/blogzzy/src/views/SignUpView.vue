<template>
    <div class=" container items-center flex justify-center align-center w-full">
        <form class="bg-sky-300 text-white w-1/2 p-6 rounded-md shadow-md" @submit.prevent="signUpUser">
            <h2 class="text-center font-bold text-2xl">Sign Up</h2>
            <div class="flex flex-col">
                <label for="username">Username:</label>
                <input class="bg-white text-black p-2 mt-2 mb-2 rounded-md" type="text" id="username" v-model="signUpDetails.username" required>
            </div>
            <div class="flex flex-col">
                <label for="email">Email:</label>
                <input class="bg-white text-black p-2 mt-2 mb-2 rounded-md" type="email" id="email" v-model="signUpDetails.email" required>
            </div>
            <div class="flex flex-col">
                <label for="password">Password:</label>
                <input class="bg-white text-black p-2 mt-2 mb-2 rounded-md" type="password" id="password" v-model="signUpDetails.password"
                    required>
            </div>
            <button class="bg-sky-700 text-white mt-4 mb-3 w-full p-3 rounded-md" type="submit">Sign Up</button>
            <p>Don't have an account? <router-link class="text-sky-700 font-bold" to="/login">Log In</router-link></p>
        </form>
    </div>
</template>
<script setup>

import { USER_SIGNUP } from '../queries';
import { ref } from 'vue';
import apolloClient from "@/apollo-config";

const signUpDetails = ref({
    username: '',
    email: '',
    password: '',
});

const signUpUser = async () => {
    try {
        const { data } = await apolloClient.mutate({
            mutation: USER_SIGNUP, // Add the mutation field
            variables: {
                username: signUpDetails.value.username,
                email: signUpDetails.value.email,
                password: signUpDetails.value.password
            }
        });
        console.log(data.createUser.user)
        // Reset the form fields after successful submission if needed.
        signUpDetails.value.username = '';
        signUpDetails.value.email = '';
        signUpDetails.value.password = '';
    }
    catch (error) {
        console.error('Error signing up the user: ', error);
    }
}
</script>
<style scoped>
.container{
    height: 100vh;
}

</style>