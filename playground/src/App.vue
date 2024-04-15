<script setup lang="ts">
import { MemCode } from 'memcode'

const code = new MemCode()

code.add('package.json', JSON.stringify({
  name: 'hello world'
}))

code.add('/src/index.ts', 'console.log("hello world")')
code.add('/src/foo/bar.ts', 'console.log("hello foo bar"')

</script>

<template>
  <button @click="async() => {
    const blob = await code.toZipBlob()
    code.downloadZip(blob, 'memcode.zip')
  }">
    download
  </button>
</template>
