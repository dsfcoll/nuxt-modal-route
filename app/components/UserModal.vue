<script setup lang="ts">
const { closeModal, modalParams } = useBackgroundRoute()

const dialogRef = ref<HTMLDialogElement>()

const users: Record<number, { id: number; name: string; email: string }> = {
  1: { id: 1, name: 'John', email: 'john@example.com' },
  2: { id: 2, name: 'Jessica', email: 'jessica@example.com' },
  3: { id: 3, name: 'James', email: 'james@example.com' },
}

// Get user from modal params (not from route)
const user = computed(() => users[Number(modalParams.value.id)])

onMounted(() => {
  dialogRef.value?.showModal()
})

function handleClose() {
  closeModal()
}

function handleBackdropClick(event: MouseEvent) {
  if (event.target === dialogRef.value) {
    closeModal()
  }
}
</script>

<template>
  <dialog
    ref="dialogRef"
    @close="handleClose"
    @click="handleBackdropClick"
  >
    <div class="modal-content">
      <button class="close-btn" @click="closeModal">X</button>
      <div v-if="user">
        <h2>{{ user.name }}</h2>
        <p>Email: {{ user.email }}</p>
        <p>ID: {{ user.id }}</p>
      </div>
      <div v-else>
        <p>User not found</p>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
dialog {
  border: none;
  border-radius: 8px;
  padding: 0;
  max-width: 400px;
  width: 90%;
}

dialog::backdrop {
  background: rgba(0, 0, 0, 0.5);
}

.modal-content {
  padding: 20px;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}
</style>
