import { defineStore } from "pinia";
import { ref } from "vue";
import router from "../../router";
import { supabase } from "../../lib/supabaseClient";

export const useUserStore = defineStore('user', () => {
    const user = ref()
    const jwt = ref()
    const isLoggedIn = ref(false)
    const userAttendance = ref()
    const fetchingData = ref(false)
    const userFullName = ref()


    
    const login = async (email, password) => {
        fetchingData.value = true
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            })
            if (error) throw error
            
            isLoggedIn.value = true
            
        } catch (error) {
            alert(error.error_description || error.message)
        }

        router.push('/')
    }

    return { user, jwt, userAttendance, login, fetchingData, isLoggedIn, userFullName }
})