<template>
    <ion-modal :initial-breakpoint="0.75" :breakpoints="[0, 0.75]" :is-open="modalVisible" @didDismiss="$emit('closeSignupModalEvent')">
        <ion-content class="ion-padding">
            <h3>Tilmeld til Chorus Soranus</h3>
            <ion-item>
                <ion-label>E-mail</ion-label>
                <ion-input v-model="email"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label>Password</ion-label>
                <ion-input v-model="password" type="password"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label>Fornavn</ion-label>
                <ion-input v-model="fornavn"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label>Efternavn</ion-label>
                <ion-input v-model="efternavn"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label>Stemmegruppe</ion-label>
                <ion-select @ion-change="setStemmegruppe($event.detail.value)" aria-label="Stemmegruppe" interface="action-sheet" placeholder="Vælg stemmegruppe">
                    <ion-select-option value="1. sopran">1. sopran</ion-select-option>
                    <ion-select-option value="2. sopran">2. sopran</ion-select-option>
                    <ion-select-option value="1. alt">1. alt</ion-select-option>
                    <ion-select-option value="2. alt">2. alt</ion-select-option>
                    <ion-select-option value="1. tenor">1. tenor</ion-select-option>
                    <ion-select-option value="2. tenor">2. tenor</ion-select-option>
                    <ion-select-option value="1. bas">1. bas</ion-select-option>
                    <ion-select-option value="2. bas">2. bas</ion-select-option>
                </ion-select>
            </ion-item>
    
            <ion-button @click="handleSignup()">Tilmeld og login</ion-button>
        </ion-content>
    </ion-modal>
</template>

<script setup>
import { IonModal, IonContent, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton } from '@ionic/vue'
import { ref } from 'vue';
import { useUserStore } from './stores/user';

const store = useUserStore()
const props = defineProps(['modalVisible'])
const email = ref()
const password = ref()
const fornavn = ref()
const efternavn = ref()
const stemmegruppe = ref()

const setStemmegruppe = (valgtStemmegruppe) => {
    stemmegruppe.value = valgtStemmegruppe
}

const emit = defineEmits(['signupEvent'])

const handleSignup = () => {
    store.signup(email.value, password.value, fornavn.value, efternavn.value, stemmegruppe.value)
    emit('signupEvent')
}
</script>