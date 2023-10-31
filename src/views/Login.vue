<template>
    <ion-page>
        <ion-content class="ion-padding">
            <h3>Login til Chorus Soranus</h3>
            <ion-item>
                <ion-label>E-mail</ion-label>
                <ion-input v-model="email"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label>Password</ion-label>
                <ion-input v-model="password" type="password"></ion-input>
            </ion-item>
    
            <ion-button @click="handleLogin()">Login</ion-button>
            <ion-button fill="outline">Sign up</ion-button>
        </ion-content>

        <SignupModal :modalVisible="loginModalVisible" @closeModal="closeLoginModal" />
        
    </ion-page>
</template>

<script setup>
import { IonPage, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
import { useUserStore } from './stores/user.js'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import SignupModal from './SignupModal.vue'

const store = useUserStore()
const email = ref()
const password = ref()
const router = useRouter()
const loginModalVisible = ref(false)

const handleLogin = () => {
    store.login(email.value, password.value)
}
</script>