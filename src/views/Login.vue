<template>
    <ion-page>
        <h3>Login til Chorus Soranus</h3>
        <ion-item>
            <ion-label>Username</ion-label>
            <ion-input v-model="username"></ion-input>
        </ion-item>
        <ion-item>
            <ion-label>Password</ion-label>
            <ion-input v-model="password" type="password"></ion-input>
        </ion-item>

        <ion-button @click="handleLogin()">Login</ion-button>
        <!-- <ion-button @click="store.login(username, password)">Login</ion-button> -->
        <ion-button fill="outline">Sign up</ion-button>
        
    </ion-page>
</template>

<script setup>
import { IonPage, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
import { useUserStore } from './stores/user.js'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const store = useUserStore()
const username = ref()
const password = ref()
const router = useRouter()

const handleLogin = () => {
    store.login(username.value, password.value)
}

</script>