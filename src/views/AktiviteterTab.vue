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

      <h1 class="ion-padding">Hej {{ store.username }}</h1>

      <ion-card v-for="event in allEvents">
        <ion-card-header class="eventHeader" @click="openModal(event)">
          <ion-card-title>{{ event.attributes.placering }}</ion-card-title>
          <ion-card-subtitle>{{ event.attributes.dato }}</ion-card-subtitle>
          <ion-card-subtitle>{{ event.attributes.type }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <p>Materiale: <strong>{{ event.attributes.materiale }}</strong></p>
          <ion-toggle @ion-change="toggleAttendance(event)" v-if="checkAttendance(event)">Deltager ikke</ion-toggle>
          <ion-toggle @ion-change="toggleAttendance(event)" v-else checked>Deltager ikke</ion-toggle>
        </ion-card-content>
      </ion-card>

      <BeskrivelseModal @closeModalEvent="closeModal" :modalVisible="modalVisible" :event="clickedEvent"/>

    </ion-content>
  </ion-page>
</template>

<script setup>
import { 
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

const store = useUserStore()

const title = 'Aktiviteter'
const allEvents = ref([])
const allUserAttendance = ref([])
// const username = 'daniar'
const userid = 1
const modalVisible = ref(false)
const clickedEvent = ref()

const openModal = (event) => {
  clickedEvent.value = event
  modalVisible.value = true
}

const closeModal = () => {
  modalVisible.value = false
}

const toggleAttendance = event => {
  // console.log(event)

  const payload = {
    "data": {
      user: userid,
      event: event.id,
      present: true
    }
  }

  fetch(`http://localhost:8080/api/attendances?filters[user][username][$eq]=${store.username}&filters[event][id][$eq]=${event.id}`)
    .then(response => response.json())
    .then(data => {
      if (data.data.length > 0) {
        console.log(data.data)
        payload.data.present = !data.data[0].attributes.present
        const attendanceId = data.data[0].id
        updateAttendance(payload, attendanceId)
      } else {
        payload.data.present = false
        createAttendance(payload)
      }
    })
}

const createAttendance = async (payload) => {
  await fetch('http://localhost:8080/api/attendances', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
}

const updateAttendance = async (payload, attendanceId) => {
  await fetch(`http://localhost:8080/api/attendances/${attendanceId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
}

const checkAttendance = event => {
  const attendanceLog = allUserAttendance.value
  
  const eventLogged = attendanceLog.some(obj => obj.attributes.event.data.id === event.id)
  if (eventLogged) {
    for (let i = 0; i < attendanceLog.length; i++) {
      if (event.id == attendanceLog[i].attributes.event.data.id) {
        return attendanceLog[i].attributes.present
      }
    }
  } else {
    return true
  }
}

const fetchUserAttendance = () => {
  fetch(`http://localhost:8080/api/attendances?filters[user][username][$eq]=${store.username}&populate=event`)
    .then(response => response.json())
    .then(data => {
      allUserAttendance.value = data.data
    })
}

const fetchEvents = () => {
  fetch('http://localhost:8080/api/events')
    .then(response => response.json())
    .then(data => {
      // console.log(data.data)
      allEvents.value = data.data
    })
}


onMounted(() => {
  fetchUserAttendance()
  fetchEvents()
})
</script>

<style scoped>
.eventHeader {
  cursor: pointer;
}
</style>