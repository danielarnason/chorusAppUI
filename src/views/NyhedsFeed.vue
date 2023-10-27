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
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/vue';
import { onMounted, ref } from 'vue';
import { supabase } from '../lib/supabaseClient';

const allNews= ref()

const fetchAllNews = async () => {
  try {
    const { data, error } = await supabase
      .from('news')
      .select()
    if (error) throw error

    allNews.value = data
  } catch (error) {
    alert(error.message)
  }
  // fetch('http://localhost:8080/api/nyheder')
  //   .then(response => response.json())
  //   .then(data => {
  //     allNews.value = data.data
  //   })
}

const parseDate = timestamp => {
  const date = new Date(timestamp)
  const formattedDate = `${date.toISOString().split('T')[0]} ${date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}`;
  return formattedDate
}

onMounted(() => {
  fetchAllNews()
})

</script>
