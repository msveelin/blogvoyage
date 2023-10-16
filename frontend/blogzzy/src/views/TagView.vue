<!-- <template>
  <div>
    <input type="file" @change="handleFileChange" />
    <button @click="handleImageUpload">Upload Image</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useApolloClient, useMutation, gql } from '@vue/apollo-composable';

const selectedFile = ref(null);
const apolloClient = useApolloClient();

const { mutate: uploadImageMutation } = useMutation(gql`
  mutation ($file: Upload!) {
    uploadImage(file: $file) {
      # Define the fields you want in the response
    }
  `);

const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0];
};

const handleImageUpload = async () => {
  if (!selectedFile.value) {
    return;
  }

  const formData = new FormData();
  formData.append('file', selectedFile.value);

  try {
    const response = await apolloClient.mutate({
      mutation: gql`
        mutation ($file: Upload!) {
          uploadImage(file: $file) {
            # Define the fields you want in the response
          }
        }
      `,
      variables: {
        file: selectedFile.value,
      },
    });

    // Handle the response as needed
    console.log(response);
  } catch (error) {
    // Handle errors
    console.error(error);
  }
};
</script> -->
<template>
  bvksd
</template>