
import '@/assets/index.css'

import { createApp} from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { createUploadLink } from 'apollo-upload-client'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';

// HTTP connection to the API
const httpLink = createUploadLink({
    uri: "http://127.0.0.1:8000/graphql", // Matches the url and port that Django is using
  });
  
  
  // Create the apollo client
  const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

const app = createApp(App)

app.component('QuillEditor', QuillEditor)
app.provide(DefaultApolloClient, apolloClient)

app.use(router)
app.use(createPinia())
app.mount("#app")