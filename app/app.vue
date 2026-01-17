<script setup lang="ts">
const { isModalOpen } = useBackgroundRoute()
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />

    <!-- Modal overlay - background page stays mounted -->
    <UserModal v-if="isModalOpen" />
  </div>
</template>
