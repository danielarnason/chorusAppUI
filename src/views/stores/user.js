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
    const userId = ref()


    
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

        fetchUserData()
        // fetchAttendanceData(userId.value)

        router.push('/')
    }

    const fetchAttendanceData = async (userId) => {
        try {
            const { data, error } = await supabase.from('attendance').select().eq('user_id', userId)
            if (error) throw error
            console.log(data)
        } catch (error) {
            alert(error.message)
        }
    }

    const fetchUserData = async () => {
        try {
            const { data: { user }} = await supabase.auth.getUser()
            userId.value = user.id
            const { data, error } = await supabase.from('profiles').select().eq('id', user.id)
            userFullName.value = `${data[0].first_name} ${data[0].last_name}`
            if (error) throw error
        } catch (error) {
            alert(error.message)
        }

        try {
            const { data, error } = await supabase.from('attendance').select().eq('user_id', userId.value)
            if (error) throw error
            console.log(data)
        } catch (error) {
            alert(error.message)
        }
    }

    const logout = async () => {
        try {
            const { error } = await supabase.auth.signOut()
            if (error) throw error
            router.push('/login')
        } catch (error) {
            alert(error.message)
        }
    }

    return { user, jwt, userAttendance, login, fetchingData, isLoggedIn, userFullName, logout, userId }
})