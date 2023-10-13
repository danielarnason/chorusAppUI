<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Nyheder</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Nyheder</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-card v-for="news in allNews">
        <ion-card-header>
          <ion-card-title>{{ news.attributes.Titel }}</ion-card-title>
          <ion-card-subtitle>{{ news.attributes.createdAt }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content class="ion-padding">
          <p>{{ news.attributes.Besked }}</p>
        </ion-card-content>
      </ion-card>

    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/vue';
import { onMounted, ref } from 'vue';

const allNews= ref()

const fetchAllNews = () => {
  fetch('http://localhost:8080/api/nyheder')
    .then(response => response.json())
    .then(data => {
      allNews.value = data.data
    })
}

onMounted(() => {
  fetchAllNews()
})

</script>
