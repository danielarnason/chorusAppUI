import { defineStore } from "pinia";
import { computed, ref } from "vue";
import router from "../../router";
import { supabase, api } from "../../lib/supabaseClient";

export const useUserStore = defineStore('user', () => {
    const isLoggedIn = ref(false)
    const fetchingData = ref(false)
    const userFullName = ref()
    const userId = ref()
    const allNews = ref()
    const allEvents = ref()

    const futureEvents = computed(() => {
        const currentDate = new Date()
        return allEvents.value?.filter(obj => {
          const objDate = new Date(obj.startDate)

          const currentDateOnly = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
          const objDateOnly = new Date(objDate.getFullYear(), objDate.getMonth(), objDate.getDate())
          
          return objDateOnly >= currentDateOnly
        })
      })

    const allNewsSorted = computed(() => {
        const sortedNews = allNews.value?.sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at)
        })
        return sortedNews
    })

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

    const fetchAllNews = async () => {
        try {
          const { data, error } = await supabase
            .from('news')
            .select()
          if (error) throw error
      
          allNews.value = data
        } catch (error) {
          alert(error.message)
        }
      }

      const fetchEvents = async () => {
        const data = await fetch(api.itemUri, {
            headers: {
                'x-app-token': api.token,
            }
        })
            .then(resp => resp.json())
        allEvents.value = data
      }

    return { login, fetchingData, isLoggedIn, userFullName, logout, userId, fetchUserData, signup, fetchAllNews, allNewsSorted, fetchEvents, futureEvents }
})