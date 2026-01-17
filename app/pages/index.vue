<script setup lang="ts">
const { openAsModal } = useBackgroundRoute()

const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jessica' },
  { id: 3, name: 'James' },
]

function showUserModal(id: number) {
  openAsModal({ name: 'users-id', params: { id } })
}
</script>

<template>
  <div>
    <h1>Home</h1>
    <nav>
      <NuxtLink to="/">Home</NuxtLink>
      |
      <NuxtLink to="/about">About</NuxtLink>
    </nav>

    <h2>Users</h2>
    <ul>
      <li v-for="user in users" :key="user.id">
        <button @click="showUserModal(user.id)">
          {{ user.name }} (modal)
        </button>
        |
        <NuxtLink :to="`/users/${user.id}`">
          {{ user.name }} (page)
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
