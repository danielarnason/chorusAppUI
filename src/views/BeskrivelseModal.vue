<template>
    <ion-modal :initial-breakpoint="0.75" :breakpoints="[0, 0.25, 0.5, 0.75]" :is-open="modalVisible" @didDismiss="$emit('closeModalEvent')">
        <ion-header>
          <ion-toolbar>
            <ion-title>{{ props.event.placering }} <br> {{ props.event.dato }}</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="$emit('closeModalEvent')">Close</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          Her kan vi skrive hvad som helst! <br>
          Alle ekstra info om en given aktivitet<br><br>
          F.eks. data om selve begivenheden fra API'et.<br>
          Man kunne også vise links til optagelser fra Spotify/youtube eller have links til pdf noder.
          <br><br>

          Deltagere: {{props.event.participants}}
        </ion-content>
      </ion-modal>
</template>

<script setup>
import { IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent } from '@ionic/vue';

const props = defineProps(['modalVisible', 'event'])

</script>