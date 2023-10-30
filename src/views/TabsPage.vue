<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="aktiviteter" href="/tabs/aktiviteter">
          <ion-icon aria-hidden="true" :icon="calendarOutline" />
          <ion-label>Aktiviteter</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="nyhedsfeed" href="/tabs/nyhedsfeed">
          <ion-icon aria-hidden="true" :icon="newspaperOutline" />
          <ion-label>Nyheder</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="signOut" @click="store.logout">
          <ion-icon aria-hidden="true" :icon="logOutOutline" />
          <ion-label>Log ud</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet} from '@ionic/vue';
import { newspaperOutline , calendarOutline, logOutOutline, chevronDownCircle } from 'ionicons/icons';
import { useUserStore } from './stores/user';

const store = useUserStore()
</script>
