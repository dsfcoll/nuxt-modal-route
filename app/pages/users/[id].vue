<script setup lang="ts">
const route = useRoute()

const users: Record<number, { id: number; name: string; email: string }> = {
  1: { id: 1, name: 'John', email: 'john@example.com' },
  2: { id: 2, name: 'Jessica', email: 'jessica@example.com' },
  3: { id: 3, name: 'James', email: 'james@example.com' },
}

const user = computed(() => users[Number(route.params.id)])
</script>

<template>
  <div>
    <h1>User Details</h1>
    <nav>
      <NuxtLink to="/">Home</NuxtLink>
      |
      <NuxtLink to="/about">About</NuxtLink>
    </nav>

    <div v-if="user">
      <h2>{{ user.name }}</h2>
      <p>Email: {{ user.email }}</p>
      <p>ID: {{ user.id }}</p>
    </div>
    <div v-else>
      <p>User not found</p>
    </div>
  </div>
</template>
