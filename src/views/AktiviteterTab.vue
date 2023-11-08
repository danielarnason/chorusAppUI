<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <h1 class="ion-padding">{{ store.userFullName }}</h1>
              <ion-card v-for="event in futureEvents">
        <ion-card-header class="eventHeader" @click="openModal(event)">
          <ion-card-title>{{ event.description }}</ion-card-title>
          <ion-card-subtitle>{{ parseDate(event.startDate) }}</ion-card-subtitle>
          <ion-card-subtitle>{{ event.location.split(',')[0] }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <p>Materiale: <strong>{{ event.repertoire }}</strong></p>
          <ion-item>
            <ion-toggle @ion-change="toggleAttendance(event)" v-if="checkAttendance(event)">Deltager</ion-toggle>
            <ion-toggle @ion-change="toggleAttendance(event)" v-else checked>Deltager ikke</ion-toggle>
          </ion-item>
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
  IonCardTitle, 
  IonToggle,
  IonItem} from '@ionic/vue';
import { computed, onMounted, ref } from 'vue';
import BeskrivelseModal from './BeskrivelseModal.vue';
import { useUserStore } from './stores/user.js';
import { supabase } from '../lib/supabaseClient';
import { personOutline } from 'ionicons/icons';

const store = useUserStore()

const allEvents = ref([])
const modalVisible = ref(false)
const clickedEvent = ref()

const futureEvents = computed(() => {
  const currentDate = new Date()
  return allEvents.value.filter(obj => {
    const objDate = new Date(obj.startDate)
    return objDate >= currentDate
  })
})

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

const toggleAttendance = async event => {
  
  const attendanceEventIdx = store.userAttendance.findIndex(record => record.event_id === event.id)
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
          event_id: event.id,
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
  const attendanceEventIdx = store.userAttendance.findIndex(record => record.event_id === event.id)
  if (attendanceEventIdx > -1) {
    return store.userAttendance[attendanceEventIdx].present
  } else {
    return true
  }
}

// const fetchEvents = async () => {
//   try {
//     const { data, error } = await supabase
//       .from('events')
//       .select()
//     if (error) throw error

//     allEvents.value = data
//     store.fetchingData = false
//   } catch (error) {
//     alert(error.message)
//   }
// }

const fetchEventsNy = async () => {
  const data = await fetch('https://cal.chorus.soranus.dk/api/items').then(resp => resp.json())
  // console.log(data)
  allEvents.value = data
  store.fetchingData = false
}

onMounted(() => {
  // fetchEvents()
  fetchEventsNy()
  store.fetchUserData()
})
</script>

<style scoped>
.eventHeader {
  cursor: pointer;
}
</style>