<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <Refresher />
      <h1 class="ion-padding">{{ store.userFullName }}</h1>
              <ion-card v-for="event in store.futureEvents">
        <ion-card-header class="eventHeader" @click="openModal(event)">
          <ion-card-title>{{ event.description }}</ion-card-title>
          <ion-card-subtitle>{{ parseDate(event.startDate) }}</ion-card-subtitle>
          <ion-card-subtitle>{{ event.location.split(',')[0] }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <p>Materiale: <strong>{{ event.repertoire }}</strong></p>
        </ion-card-content>
      </ion-card>
      
      <BeskrivelseModal @closeModalEvent="closeModal" :modalVisible="modalVisible" :event="clickedEvent"/>

    </ion-content>
  </ion-page>
</template>

<script setup>
import { 
  IonPage, 
  IonContent, 
  IonCard, 
  IonCardContent, 
  IonCardHeader, 
  IonCardSubtitle, 
  IonCardTitle} from '@ionic/vue';
import { onMounted, ref } from 'vue';
import BeskrivelseModal from './BeskrivelseModal.vue';
import { useUserStore } from './stores/user.js';
import { supabase } from '../lib/supabaseClient';
import Refresher from './Refresher.vue';

const store = useUserStore()

const modalVisible = ref(false)
const clickedEvent = ref()

const openModal = (event) => {
  clickedEvent.value = event
  modalVisible.value = true
}

const closeModal = () => {
  modalVisible.value = false
}

const parseDate = timestamp => {
  const date = new Date(timestamp)
  const formattedDate = `${date.toISOString().split('T')[0]} ${date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}`;
  return formattedDate
}

onMounted(() => {
  store.fetchEvents()
  store.fetchUserData()
})
</script>

<style scoped>
.eventHeader {
  cursor: pointer;
}
</style>