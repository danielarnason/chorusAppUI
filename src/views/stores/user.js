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

        const { data: { user } } = await supabase.auth.getUser()

        const { data, error } = await supabase.from('profiles').select().eq('id', user.id)
        userFullName.value = `${data[0].first_name} ${data[0].last_name}`
        
        router.push('/')
    }

    return { user, jwt, userAttendance, login, fetchingData, isLoggedIn, userFullName }
})