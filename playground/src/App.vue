<script setup lang="ts">
import { VueShikiInput } from 'vue-shiki-input'
import FileExplorer from './components/FileExplorer.vue'
import { code, lang, langs } from './composables/useMemCode'
</script>

<template>
  <div class="w-80% h-85% bg-[#121212] rounded-lg grid grid-cols-[220px_1fr] p3 box-border gap-4">
    <FileExplorer />
    <VueShikiInput
      v-model="code" :langs="langs" :themes="['vitesse-dark']" :code-to-hast-options="{
        lang,
        theme: 'vitesse-dark',
      }"
      disabled
    />
  </div>
</template>
