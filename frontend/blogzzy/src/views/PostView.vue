<template>
    <nav-bar />
    <div v-if="postBySlug" class="p-5 flex items-start justify-between w-full">
        <div class="w-2/3 mx-2 p-3">
            <h1 class="text-4xl font-bold">{{ postBySlug.title }}</h1>

            
            <div class="flex align-center mb-4 items-center mt-4">
                <span class="text-gray-500 italic">{{ postBySlug.likesCount }} Likes</span>
                <button class="bg-sky-400 text-white rounded-md p-2 mx-2" @click="updatePostLikes">Like Post</button>
            </div>
            <img :src="imageUrl" class="w-full h-auto mb-5" alt="">
            <div v-html="postBySlug.content"></div>
        </div>


        <div class="w-1/3 p-3">
            <h3 class="text-xl font-bold mt-4">Comments</h3>
            <div v-if="user.isAuthenticated">
                <form @submit.prevent="commentSystem">
                    <textarea class="bg-gray-100 p-3 rounded-md mt-4 w-full" v-model="commentContent" name=""
                        placeholder="Comments" id="" cols="30" rows="4"></textarea>
                    <button type="submit" class="w-full text-center bg-sky-400 text-white text-base p-2 rounded-md mt-2">Add
                        Comment</button>
                </form>

            </div>
            <div v-else>
                <p>You are not logged in. Please log in to comment</p>
            </div>

            <div class="mt-5">
                <div class="border-2 my-2 p-2" v-for="(comment, index) in comments" :key="index">
                    <h1 class="text-base font-bold">{{ comment.user.username }}</h1>
                    <p>{{ comment.likesCount }} likes</p>
                    <span class="text-gray-300 text-sm italic">{{ comment.createdAt }}</span>
                    <p>{{ comment.content }}</p>
                    <button class="bg-sky-400 text-white font-bold rounded-md md mt-3 p-2"
                        @click="updateCommentLikes(comment.id)">Like Comment</button>
                </div>
            </div>
        </div>
    </div>
    <footer-bar/>
</template>
<script setup>
import NavBar from '@/components/NavBar.vue'
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { POST_BY_SLUG, SUBMIT_COMMENT, UPDATE_POST_LIKE, UPDATE_COMMENT_LIKE } from "@/queries";
import { useUserStore } from '@/stores/user'
import apolloClient from "@/apollo-config";
import FooterBar from '../components/FooterBar.vue';
// import axios from 'axios'

// import from "../../../../backend/backend/mediafiles/"

const userStore = useUserStore()

const user = ref({
    isAuthenticated: false,
    token: userStore.getToken || "",
    user: userStore.getUser || null,
})


const route = useRoute()

const slug = ref(route.params.slug)
const postBySlug = ref(null)
const comments = ref(null)

const commentContent = ref("")
const postId = ref(null)
const userId = ref("")

const imageUrl = ref("")

const fetchPostInfo = async () => {
    
    try {
        console.log('Fetching site information...');
        const post = await apolloClient.query({
            query: POST_BY_SLUG,
            variables: { slug: slug.value },
        });
        postBySlug.value = post.data.postBySlug;
        comments.value = post.data.postBySlug.comments;
        if (user.value.token) {
            user.value.isAuthenticated = true
        }
        if (postBySlug.value && postBySlug.value.featuredImage) {
            const baseMediaURL = "http://localhost:8000/"; // Adjust this URL according to your server configuration
            const featuredImage = postBySlug.value.featuredImage;
            imageUrl.value = baseMediaURL + featuredImage;
        }
        console.log(imageUrl.value)
        postId.value = postBySlug.value.id
        
    } catch (error) {
        console.error('Error fetching site information:', error);
    }
};

const userData = userStore.getUser

const updatePostLikes = async () => {
    try {
        if (postBySlug.value && postBySlug.value.id) {
            postId.value = postBySlug.value.id

        }

        if (userData && userData.id) {
            userId.value = userData.id
            console.log(userId.value)
        }
        const { data } = await apolloClient.mutate({
            mutation: UPDATE_POST_LIKE, // Use the actual mutation name
            variables: {
                postId: postId.value,
                userId: userId.value,
            },
        });


        if (data.updatePostLikes && data.updatePostLikes.post) {
            console.log(data.updatePostLikes.post)
            location.reload();
        }

    } catch (error) {
        console.error('Error updating post likes: ', error);
    }
}


const updateCommentLikes = async (commentId) => {
    try {
        if (postBySlug.value.comments && postBySlug.value.comments.id) {
            commentId = postBySlug.value.comments.id
            console.log(commentId)
        }

        if (userData && userData.id) {
            userId.value = userData.id

        }
        const { data } = await apolloClient.mutate({
            mutation: UPDATE_COMMENT_LIKE, // Use the actual mutation name
            variables: {
                commentId: commentId,
                userId: userId.value,
            },
        });


        if (data.updateCommentLikes && data.updateCommentLikes.comment) {
            console.log(data.updateCommentLikes.comment)
            location.reload();
        }

    } catch (error) {
        console.error('Error updating post likes: ', error);
    }
}


const commentSystem = async () => {
    try {
        // Ensure postId and userId values are set correctly
        // postId.value = postBySlug.value.id; // Set the postId based on the post you are commenting on
        // Check if postBySlug is available and has a valid ID
        if (postBySlug.value && postBySlug.value.id) {
            postId.value = postBySlug.value.id;
        } else {
            console.error('Post data is not available. Cannot create a comment.');
            return;
        }

        if (userData && userData.id) {
            userId.value = userData.id;
        } else {
            console.error('User is not logged in. Cannot create a comment.');
            return;
        }

        if (userData && userData.id) {
            userId.value = userData.id
        } else {
            console.error('User is not logged in. Cannot create a comment.');
            return;
        }

        const data = await apolloClient.mutate({
            mutation: SUBMIT_COMMENT, // Add the mutation field
            variables: {
                content: commentContent.value,
                userId: userId.value,
                postId: postId.value,
            }
        })
        if (data.data.createComment.comment && data.data.createComment.comment.content) {
            console.log(data.data.createComment.comment)
            // Refresh the page after successfully sending the comment
            location.reload();
        } else {
            console.error('Mutation response does not contain the expected structure.');
        }
        // Reset the form fields after successful submission if needed.
        commentContent.value = '';

    }
    catch (error) {
        console.error('Error sending comment: ', error);
    }
}

onMounted(() => {
    fetchPostInfo()
   
})

</script>