import { defineStore } from 'pinia'
import axios from "axios"
import {useLocalStorage} from "@vueuse/core"

export const useAuthStore = defineStore('store', {
    id: 'auth',
    state: () => ({
        user: useLocalStorage('USER', null)
    }),
    getters: {
        myuser: (state) => state.user,
        isLoggedIn: (state) => state.user
    },
    actions: {
        async login(username, password) {
            let login_data = null
            try {
                login_data = await axios.post("http://zimmermatic:3443/api/user/login", {
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
            this.user = login_data;
            console.log(this.user);
            // store user details and jwt in local storage to keep user logged in between page refreshes
            localStorage.setItem('USER', JSON.stringify(this.user));
            return {
                status: "success"
            }
        },
        logout() {
            this.user = null;
            localStorage.removeItem('USER');
            router.push('/login');
        },
    },
});