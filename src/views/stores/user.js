import { defineStore } from "pinia";
import { ref } from "vue";
import router from "../../router";
import { supabase } from "../../lib/supabaseClient";

export const useUserStore = defineStore('user', () => {
    const isLoggedIn = ref(false)
    const userAttendance = ref([])
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

            fetchUserData()
            
            isLoggedIn.value = true
            
        } catch (error) {
            alert(error.error_description || error.message)
        }

        router.push('/tabs/aktiviteter')
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
    
        fetchAttendance()
    }

    const fetchAttendance = async () => {
        try {
            const { data, error } = await supabase.from('attendance').select().eq('user_id', userId.value)
            if (error) throw error
            userAttendance.value = data
        } catch (error) {
            alert(error.message)
        }
      }

    const logout = async () => {
        try {
            const { error } = await supabase.auth.signOut()
            if (error) throw error
            // userId.value = null
            // userAttendance.value = []
            router.push('/')
        } catch (error) {
            alert(error.message)
        }
    }

    return { userAttendance, login, fetchingData, isLoggedIn, userFullName, logout, userId, fetchUserData, fetchAttendance }
})