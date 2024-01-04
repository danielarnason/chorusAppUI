<template>
    <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
    </ion-refresher>
</template>

<script setup>
import { IonRefresher, IonRefresherContent } from "@ionic/vue";
import { useUserStore } from "./stores/user";

const store = useUserStore()

const handleRefresh = async (event) => {
    console.log('refresh!')
    await store.fetchAllNews()
    await store.fetchEvents()
    event.target.complete()
}

</script>