<template>
    <ion-page class="ion-padding">
        <h1>Medlemmer</h1>
        <ion-content>
            <ion-list v-if="sopran_1.length > 0">
                <h2>1. sopran</h2>
                <ion-item v-for="user in sopran_1">
                    <ion-avatar aria-hidden="true" slot="start">
                        <img alt="" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                    </ion-avatar>
                    <ion-label>{{ user.fornavn }} {{ user.efternavn }}</ion-label>
                </ion-item>
            </ion-list>
            <ion-list v-if="sopran_2.length > 0">
                <h2>2. sopran</h2>
                <ion-item v-for="user in sopran_2">
                    <ion-avatar aria-hidden="true" slot="start">
                        <img alt="" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                    </ion-avatar>
                    <ion-label>{{ user.fornavn }} {{ user.efternavn }}</ion-label>
                </ion-item>
            </ion-list>
            <ion-list v-if="alt_1.length > 0">
                <h2>1. alt</h2>
                <ion-item v-for="user in alt_1">
                    <ion-avatar aria-hidden="true" slot="start">
                        <img alt="" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                    </ion-avatar>
                    <ion-label>{{ user.fornavn }} {{ user.efternavn }}</ion-label>
                </ion-item>
            </ion-list>
            <ion-list v-if="alt_2.length > 0">
                <h2>2. alt</h2>
                <ion-item v-for="user in alt_2">
                    <ion-avatar aria-hidden="true" slot="start">
                        <img alt="" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                    </ion-avatar>
                    <ion-label>{{ user.fornavn }} {{ user.efternavn }}</ion-label>
                </ion-item>
            </ion-list>
            <ion-list v-if="tenor_1.length > 0">
                <h2>1. tenor</h2>
                <ion-item v-for="user in tenor_1">
                    <ion-avatar aria-hidden="true" slot="start">
                        <img alt="" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                    </ion-avatar>
                    <ion-label>{{ user.fornavn }} {{ user.efternavn }}</ion-label>
                </ion-item>
            </ion-list>
            <ion-list v-if="tenor_2.length > 0">
                <h2>2. tenor</h2>
                <ion-item v-for="user in tenor_2">
                    <ion-avatar aria-hidden="true" slot="start">
                        <img alt="" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                    </ion-avatar>
                    <ion-label>{{ user.fornavn }} {{ user.efternavn }}</ion-label>
                </ion-item>
            </ion-list>
            <ion-list v-if="bas_1.length > 0">
                <h2>1. bas</h2>
                <ion-item v-for="user in bas_1">
                    <ion-avatar aria-hidden="true" slot="start">
                        <img alt="" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                    </ion-avatar>
                    <ion-label>{{ user.fornavn }} {{ user.efternavn }}</ion-label>
                </ion-item>
            </ion-list>
            <ion-list v-if="bas_2.length > 0">
                <h2>2. bas</h2>
                <ion-item v-for="user in bas_2">
                    <ion-avatar aria-hidden="true" slot="start">
                        <img alt="" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                    </ion-avatar>
                    <ion-label>{{ user.fornavn }} {{ user.efternavn }}</ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
        
    </ion-page>
</template>

<script setup>
import { IonPage, IonContent, IonList, IonItem, IonLabel, IonAvatar } from '@ionic/vue';
import { supabase } from '../lib/supabaseClient';
import { computed, onMounted, ref } from 'vue';

const allUsers = ref([])
const sopran_1 = computed(() => allUsers.value.filter(user => user.stemmegruppe === '1. sopran'))
const sopran_2 = computed(() => allUsers.value.filter(user => user.stemmegruppe === '2. sopran'))
const alt_1 = computed(() => allUsers.value.filter(user => user.stemmegruppe === '1. alt'))
const alt_2 = computed(() => allUsers.value.filter(user => user.stemmegruppe === '2. alt'))
const tenor_1 = computed(() => allUsers.value.filter(user => user.stemmegruppe === '1. tenor'))
const tenor_2 = computed(() => allUsers.value.filter(user => user.stemmegruppe === '2. tenor'))
const bas_1 = computed(() => allUsers.value.filter(user => user.stemmegruppe === '1. bas'))
const bas_2 = computed(() => allUsers.value.filter(user => user.stemmegruppe === '2. bas'))

const fetchUsers = async () => {
    const { data, error } = await supabase.from('medlemmer').select()
    allUsers.value = data
}

onMounted(() => {
    fetchUsers()
})
</script>