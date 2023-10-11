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
        </ion-card-content>
      </ion-card>

    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle} from '@ionic/vue';
import { onMounted, ref } from 'vue';

const title = 'Aktiviteter'
const allEvents = ref([])

const fetchEvents = async () => {
  await fetch('http://localhost:8080/api/events')
    .then(response => response.json())
    .then(data => {
      allEvents.value = data.data
    })
}

onMounted(() => {
  fetchEvents()
})
</script>
