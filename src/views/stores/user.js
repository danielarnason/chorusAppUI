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
        const { data: { user }} = await supabase.auth.getUser()
        userId.value = user.id
        userFullName.value = `${user.user_metadata.fornavn} ${user.user_metadata.efternavn}`
    
        fetchAttendance()
    }

    const fetchAttendance = async () => {
        const { data, error } = await supabase.from('attendance').select().eq('user_id', userId.value)
        userAttendance.value = data
      }

    const logout = async () => {
        try {
            const { error } = await supabase.auth.signOut()
            if (error) throw error
            router.push('/')
        } catch (error) {
            alert(error.message)
        }
    }

    const signup = async (email, password, fornavn, efternavn, stemmegruppe) => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        fornavn: fornavn,
                        efternavn: efternavn,
                        stemmegruppe: stemmegruppe
                    }
                }
            })
            if (error) throw error
            router.push('/tabs/aktiviteter')
        } catch (error) {
            alert(error.message)
        }
    }

    return { userAttendance, login, fetchingData, isLoggedIn, userFullName, logout, userId, fetchUserData, fetchAttendance, signup }
})