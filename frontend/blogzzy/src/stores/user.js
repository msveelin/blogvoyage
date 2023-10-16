import { defineStore } from "pinia";

export const useUserStore = defineStore({
    id: "user",
    state: () => ({
        token: localStorage.getItem("token") || null,
        user: localStorage.getItem("user") || null,
    
    }),
    getters: {
        getToken: (state) => state.token,
        getUser: (state) => JSON.parse(state.user),
       
    },
    actions: {
        setToken(token) {
            this.token = token;
            //save token to local storage
            localStorage.setItem("token", token)
         
        },
        removeToken() {
            this.token = null
            localStorage.removeItem("token")
     
        },
        setUser(user){
            this.user = user
            localStorage.setItem("user", user)
        
        },
        removeUser(){
            this.user = null
            localStorage.removeItem("user")
      
        }
    }
})