<template>
    <input type="file" @change="uploadFile" name="" id="fileInput"> <br>
    <p v-if="filePath">File Upload: {{ filePath }}</p>
  </template>
  
  <script setup>
  import { ref, defineExpose } from 'vue';
  import axios from 'axios';
  
  const filePath = ref(null);

  // Define emi
  
  const uploadFile = (event) => {
    const selectedFile = event.target.files[0];
  
    const formData = new FormData();
    formData.append('file', selectedFile);
  
    axios.post('http://localhost:8000/api/posts/', formData)
      .then(response => {
        filePath.value = response.data.file_path;
      })
      .catch(error => {
        console.error('Error uploading file: ', error);
      });
  }

  defineExpose({
    filePath
  })
  </script>
  