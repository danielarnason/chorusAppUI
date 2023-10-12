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

      <ion-card v-for="event in allEvents">
        <ion-card-header>
          <ion-card-title>{{ event.attributes.placering }}</ion-card-title>
          <ion-card-subtitle>{{ event.attributes.dato }}</ion-card-subtitle>
          <ion-card-subtitle>{{ event.attributes.type }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <p>Materiale: <strong>{{ event.attributes.materiale }}</strong></p>
          <ion-toggle v-if="checkAttendance(event)">Deltager ikke</ion-toggle>
          <ion-toggle v-else checked>Deltager ikke</ion-toggle>
        </ion-card-content>
      </ion-card>

    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonToggle} from '@ionic/vue';
import { onMounted, ref } from 'vue';

const title = 'Aktiviteter'
const allEvents = ref([])
const allUserAttendance = ref([])
const username = 'kristine'

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
  fetch(`http://localhost:8080/api/attendances?filters[user][username][$eq]=${username}&populate=event`)
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
