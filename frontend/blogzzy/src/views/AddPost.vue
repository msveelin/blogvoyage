<template>
    <nav-bar></nav-bar>
    <form @submit.prevent="createPost" class="p-5">
        <div class="flex mb-4 flex-col">
            <label class="mb-2" for="postTitle">Title:</label>
            <input class="bg-gray-100 mb-2 rounded-md p-3" id="postTitle" v-model="title" required />
        </div>
        <div class="flex mb-4 flex-col">
            <label class="mb-2" for="categorySelect">Category:</label>
            <select class="bg-gray-100 p-3 mb-2 rounded-md" name="" id="categorySelect" v-model="selectedCategory">
                <option value="">Select a category</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
            </select>

        </div>
        <div>
            <upload-file ref="selectedFile" />

            <!-- <input type="file" class="mb-4 file:bg-sky-700 file:text-white file:border-0 file:p-2 file:rounded-r-3xl file:mr-4"  accept="image/*" @change="handleImageUpload" name="featured_image" id=""> -->
        </div>
        <div>
            <!-- <h2 class="my-5">{{ quillContent }}</h2> -->
            <quill-editor theme="snow" v-model:content="quillContent" :content="initialContent" :contentType="contentFormat"
                :modules="modules" toolbar="full" placeholder="Content goes here..." required />
        </div>
        <button class="bg-sky-700 text-white mt-4 p-3 rounded-md w-full" type="submit">Create Post</button>
    </form>
</template>
  
<script setup>
import NavBar from "@/components/NavBar.vue";
import BlotFormatter from 'quill-blot-formatter'
import { CREATE_POST, CATEGORY } from '@/queries'
import { useUserStore } from '@/stores/user'
import apolloClient from "@/apollo-config";
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';


import UploadFile from "@/components/UploadFile.vue";

const quillContent = ref(''); // Content that you want to edit.
const initialContent = 'This is the initial content.'; // Content for the Quill editor.
const contentFormat = 'html'; // Content format (can be 'delta', 'html', or 'text').


const title = ref("")
// const content = ref("")
const selectedCategory = ref("")
const router = useRouter()
const userId = ref(null)

const categories = ref([])

const userStore = useUserStore()
const userData = userStore.getUser

const selectedFile = ref(null)


const modules = ref({
    name: 'blotFormatter',
    module: BlotFormatter,
    options: {/* options */ }
})

// const handleImageUpload = (event) => {
//     selectedFile.value = event.target.files[0]
// }

const fetchCategories = async () => {
    try {
        const { data } = await apolloClient.query({
            query: CATEGORY,
        })
        categories.value = data.allCategories
    } catch (error) {
        console.error('Error fetching category:', error);
    }
}

const generatedSlug = ref("")

const generateSlug = () => {
    let slug = title.value.toLowerCase()

    slug = slug.replace(/\s+/g, '-')

    // Remove special characters
    slug = slug.replace(/[^a-z0-9-]/g, '');

    generatedSlug.value = slug
    console.log(generatedSlug.value)
}

// const handleTextChange = ({ delta, oldContents, source }) => {
//     const contentText = delta.ops.map(op => op.insert).join('')
//     content.value = contentText
// }

const createPost = async () => {
    if (selectedFile.value) {
        const filePath = selectedFile.value.filePath; // Access the filePath variable
        console.log('Selected File Path:', filePath);
    }
    if (userData && userData.id) {
        userId.value = userData.id;
    }
    generateSlug();

    console.log('Selected Category:', selectedCategory.value);
    // Convert selectedCategory.value to an integer
    const categoryId = parseInt(selectedCategory.value);
    const newUser = parseInt(userId.value)
    // Log the data before making the request
    console.log('Mutation Variables:', {
        title: title.value,
        slug: generatedSlug.value,
        content: quillContent.value,
        userId: newUser,
        categoryId: categoryId,
        featured_image: selectedFile.value.filePath
    });

    try {
        const { data } = await apolloClient.mutate({
            mutation: CREATE_POST,
            variables: {
                title: title.value,
                slug: generatedSlug.value,
                content: quillContent.value,
                userId: userId.value,
                categoryId: selectedCategory.value,
                featuredImage: selectedFile.value.filePath
            }
        });

        // Log the response data for debugging
        console.log('Response Data:', data);

        if (data.createPost && data.createPost.post) {
            console.log(data.createPost.post);
            location.reload();
            router.push('/');
        }
    } catch (error) {
        console.error('Error creating post:', error);
    }
};


onMounted(() => {
    fetchCategories()
})

</script>
  