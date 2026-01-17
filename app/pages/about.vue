<script setup lang="ts">
const { openAsModal } = useBackgroundRoute()

function showUserModal(id: number) {
  openAsModal({ name: 'users-id', params: { id } })
}
</script>

<template>
  <div>
    <h1>About</h1>
    <nav>
      <NuxtLink to="/">Home</NuxtLink>
      |
      <NuxtLink to="/about">About</NuxtLink>
    </nav>

    <p>This is the about page.</p>
    <p>
      <button @click="showUserModal(1)">Open User 1 as modal</button>
    </p>
  </div>
</template>
