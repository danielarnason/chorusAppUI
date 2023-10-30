<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{title}}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{title}}</ion-title>
        </ion-toolbar>
      </ion-header>

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
            <ion-toggle @ion-change="toggleAttendance(event)" v-if="checkAttendance(event)">Deltager ikke</ion-toggle>
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
  IonHeader, 
  IonToolbar, 
  IonTitle, 
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
const allUserAttendance = ref([])
const modalVisible = ref(false)
const clickedEvent = ref()
const userFullName = ref()

const openModal = (event) => {
  clickedEvent.value = event
  modalVisible.value = true
}

const closeModal = () => {
  modalVisible.value = false
}

const toggleAttendance = async event => {
  
  const attendanceEventIdx = allUserAttendance.value.findIndex(record => record.event_id === event.event_id)
  const attendanceRecord = allUserAttendance.value[attendanceEventIdx]

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

  fetchAttendance()
}

const checkAttendance = event => {
  const attendanceEventIdx = allUserAttendance.value.findIndex(record => record.event_id === event.event_id)
  if (attendanceEventIdx > -1) {
    return allUserAttendance.value[attendanceEventIdx].present
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

const fetchUserData = async () => {
  try {
      const { data: { user }} = await supabase.auth.getUser()
      store.userId = user.id
      const { data, error } = await supabase.from('profiles').select().eq('id', user.id)
      store.userFullName = `${data[0].first_name} ${data[0].last_name}`
      if (error) throw error
  } catch (error) {
      alert(error.message)
  }

  fetchAttendance()
}

const fetchAttendance = async () => {
  try {
      const { data, error } = await supabase.from('attendance').select().eq('user_id', store.userId)
      if (error) throw error
      allUserAttendance.value = data
  } catch (error) {
      alert(error.message)
  }
}

onMounted(() => {
  fetchEvents()
  fetchUserData()
})
</script>

<style scoped>
.eventHeader {
  cursor: pointer;
}
</style>