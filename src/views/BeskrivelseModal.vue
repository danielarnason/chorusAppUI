<template>
    <ion-modal :initial-breakpoint="0.5" :breakpoints="[0, 0.25, 0.5, 0.75]" :is-open="modalVisible" @didDismiss="$emit('closeModalEvent')">
        <ion-header>
          <ion-toolbar>
            <ion-title>{{ props.event.attributes.placering }} <br> {{ props.event.attributes.dato }}</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="$emit('closeModalEvent')">Close</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          {{props.event.attributes.beskrivelse}}
        </ion-content>
      </ion-modal>
</template>

<script setup>
import { IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent } from '@ionic/vue';

const props = defineProps(['modalVisible', 'event'])

</script>