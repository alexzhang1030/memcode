<script setup lang="ts">
import { selected } from '../composables/useMemCode'

defineProps<{
  file: string
  ext: string
  path: string
}>()
</script>

<template>
  <div>
    <div
      class="flex items-center py-1 px-2 rounded-md cursor-pointer text-sm
        bg-black bg-op-90 transition-colors"
      :class="[selected === path ? 'bg-green-500' : 'hover:(bg-gray-500 bg-op-20)']"
      @click="() => {
        selected = path
      }"
    >
      <div class="i-solar-document-bold-duotone" />
      <div class="ml-2">
        {{ file }}
      </div>
    </div>
  </div>
</template>
