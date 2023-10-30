<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <h1 class="ion-padding">Hej {{ store.userFullName }}</h1>
      <ion-card v-for="event in allEvents">
        <ion-card-header class="eventHeader" @click="openModal(event)">
          <ion-card-title>{{ event.placering }}</ion-card-title>
          <ion-card-subtitle>{{ event.dato }}</ion-card-subtitle>
          <ion-card-subtitle>{{ event.type }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <p>Materiale: <strong>{{ event.materiale }}</strong></p>
          <ion-item>
            <ion-toggle @ion-change="toggleAttendance(event)" v-if="checkAttendance(event)">Deltager</ion-toggle>
            <ion-toggle @ion-change="toggleAttendance(event)" v-else checked>Deltager ikke</ion-toggle>
          </ion-item>
        </ion-card-content>
      </ion-card>

      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button @click="store.logout">
          <ion-icon :icon="logOutOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      
      <BeskrivelseModal @closeModalEvent="closeModal" :modalVisible="modalVisible" :event="clickedEvent"/>

    </ion-content>
  </ion-page>
</template>

<script setup>
import { 
  IonFab,
  IonFabButton,
  IonIcon,
  IonPage, 
  IonContent, 
  IonCard, 
  IonCardContent, 
  IonCardHeader, 
  IonCardSubtitle, 
  IonCardTitle, 
  IonToggle} from '@ionic/vue';
import { onMounted, ref } from 'vue';
import BeskrivelseModal from './BeskrivelseModal.vue';
import { useUserStore } from './stores/user.js';
import { supabase } from '../lib/supabaseClient';
import { create, logOutOutline } from "ionicons/icons";

const store = useUserStore()

const title = 'Aktiviteter'
const allEvents = ref([])
const modalVisible = ref(false)
const clickedEvent = ref()

const openModal = (event) => {
  clickedEvent.value = event
  modalVisible.value = true
}

const closeModal = () => {
  modalVisible.value = false
}

const toggleAttendance = async event => {
  
  const attendanceEventIdx = store.userAttendance.findIndex(record => record.event_id === event.event_id)
  const attendanceRecord = store.userAttendance[attendanceEventIdx]

  if (attendanceRecord) {
    try {
      const { error } = await supabase
        .from('attendance')
        .update({ present: !attendanceRecord.present })
        .eq('id', attendanceRecord.id)
      if (error) throw error
    } catch (error) {
      alert(error.message)
    }
  } else {
    try {
      const { error } = await supabase
        .from('attendance')
        .insert({
          event_id: event.event_id,
          user_id: store.userId,
          present: false
        })
      if (error) throw error
    } catch (error) {
      alert(error.message)
    }
  }

  store.fetchAttendance()
}

const checkAttendance = event => {
  const attendanceEventIdx = store.userAttendance.findIndex(record => record.event_id === event.event_id)
  if (attendanceEventIdx > -1) {
    return store.userAttendance[attendanceEventIdx].present
  } else {
    return true
  }
}

const fetchEvents = async () => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select()
    if (error) throw error

    allEvents.value = data
    store.fetchingData = false
  } catch (error) {
    alert(error.message)
  }
}

onMounted(() => {
  fetchEvents()
  store.fetchUserData()
})
</script>

<style scoped>
.eventHeader {
  cursor: pointer;
}
</style>