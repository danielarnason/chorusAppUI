import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore('user', () => {
    const user = ref()
    const jwt = ref()
    const isLoggedIn = ref(false)
    const userAttendance = ref()

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
            console.log(data)
            user.value = data.user
            jwt.value = data.jwt
            isLoggedIn.value = true
        })

        await fetch(`http://localhost:8080/api/attendances?filters[user][username][$eq]=${user.value.username}&populate=event`)
            .then(response => response.json())
            .then(data => {
            userAttendance.value = data.data
        })
    }

    return { user, jwt, userAttendance, login }
})