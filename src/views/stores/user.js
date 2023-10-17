import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore('user', () => {
    const user = ref()
    const jwt = ref()
    const isLoggedIn = ref(false)


    const login = async (username, password) => {
        await fetch('http://localhost:8080/api/auth/local', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                identifier: username,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            user.value = data.user
            jwt.value = data.jwt
            isLoggedIn.value = true
        })
    }

    return { user, jwt, login }
})