<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <Refresher />
      <ion-card v-for="news in store.allNewsSorted">
        <ion-card-header>
          <ion-card-title>{{ news.titel }}</ion-card-title>
          <ion-card-subtitle>{{ parseDate(news.created_at) }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content class="ion-padding">
          <p>{{ news.besked }}</p>
        </ion-card-content>
      </ion-card>

    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/vue';
import { onMounted } from 'vue';
import { useUserStore } from './stores/user';
import Refresher from './Refresher.vue';

const store = useUserStore()

const parseDate = timestamp => {
  const date = new Date(timestamp)
  const formattedDate = `${date.toISOString().split('T')[0]} ${date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}`;
  return formattedDate
}

onMounted(() => {
  store.fetchAllNews()
})

</script>
