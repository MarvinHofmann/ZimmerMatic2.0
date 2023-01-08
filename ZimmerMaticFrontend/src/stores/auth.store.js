import { defineStore } from 'pinia'
import axios from "axios"

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: null
    }),
    getters: {
        user: (state) => state.user,
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

            // store user details and jwt in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            // redirect to previous url or default to home page
            router.push(this.returnUrl || '/');
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('/login');
        }
    }
});