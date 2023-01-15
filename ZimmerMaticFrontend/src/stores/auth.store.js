import { defineStore } from 'pinia'
import axios from "axios"
import { useStorage } from "@vueuse/core"
const IP = import.meta.env.VITE_SERVER_IP;

export const useAuthStore = defineStore('store', {
    id: 'auth',
    state: () => {
        return {
            user: useStorage('USER', {}),
            token: useStorage('TOKEN', "")
        }
    },
    getters: {
        getUser(){
            return this.user
        },
        isLoggedIn: (state) => state.user
    },
    actions: {
        async login(username, password) {
            let login_data = null
            try {
                login_data = await axios.post(IP + "/api/user/login", {
                    username: username,
                    password: password
                }).then(response => response.data)
            } catch (error) {
                console.log(error.response.data);
                return {
                    status: "failed",
                    error: error.response.data
                }
            }
            console.log(login_data);
            // update pinia state
            this.user = login_data.user;
            this.token = login_data.token
            // store user details and jwt in local storage to keep user logged in between page refreshes
            localStorage.setItem('USER', JSON.stringify(this.user));
            localStorage.setItem('TOKEN', this.token);
            return {
                status: "success"
            }
        },
        logout() {
            this.user = null;
            localStorage.removeItem('USER');
            localStorage.removeItem('TOKEN');
        },
    },
});