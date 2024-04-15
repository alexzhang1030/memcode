<script setup lang="ts">
import { useMemCode } from '../composables/useMemCode'
import File from './File.vue'

const memCode = useMemCode()
</script>

<template>
  <div class="flex flex-col gap-4">
    <template v-for="item in memCode.listFiles('/')" :key="item.path">
      <File :file="item.file" :ext="item.ext" :path="item.path" />
    </template>
    <div class="flex-auto" />
    <button
      class="cursor-pointer py2 bg-blue-5 outline-none border-none rounded-sm hover:bg-blue-4 transition-colors" @click="async () => {
        const blob = await memCode.toZipBlob()
        memCode.downloadZip(blob, 'mem-code.zip')
      }"
    >
      Export zip
    </button>
  </div>
</template>
