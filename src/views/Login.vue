<template>
    <ion-page>
        <ion-content class="ion-padding">
            <h3>Login til Chorus Soranus</h3>
            <ion-item>
                <ion-label>E-mail</ion-label>
                <ion-input label="Email" v-model="email"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label>Password</ion-label>
                <ion-input label="Password" v-model="password" type="password"></ion-input>
            </ion-item>
    
            <ion-button @click="handleLogin()">Login</ion-button>
            <ion-button @click="openLoginModal()" fill="outline">Tilmeld</ion-button>
        </ion-content>

        <SignupModal :modalVisible="loginModalVisible" @closeLoginModalEvent="closeLoginModal" @signupEvent="closeLoginModal"/>
        
    </ion-page>
</template>

<script setup>
import { IonPage, IonItem, IonLabel, IonInput, IonButton, IonContent } from '@ionic/vue';
import { useUserStore } from './stores/user.js'
import { ref } from 'vue';
import SignupModal from './SignupModal.vue'

const store = useUserStore()
const email = ref()
const password = ref()
const loginModalVisible = ref(false)

const handleLogin = () => {
    store.login(email.value, password.value)
}

const openLoginModal = () => {
    loginModalVisible.value = true
}

const closeLoginModal = () => {
    loginModalVisible.value = false
}
</script>