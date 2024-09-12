import { MemCode } from 'memcode'
import { ref, shallowRef, watchEffect } from 'vue'

const codes = [
  {
    path: 'index.ts',
    code: `console.log('Hello, World!')`,
  },
  {
    path: 'package.json',
    code: JSON.stringify({
      name: 'my-project',
      version: '0.0.1',
    }, null, 2),
  },
  {
    path: 'main.rs',
    code: `fn main() {
    println!("Hello, World!");
}`,
  },
]

const first = codes[0]

const memCode = shallowRef(new MemCode(codes))

export function useMemCode() {
  return memCode
}

export const selected = ref(first.path)
export const code = ref<string>()
export const lang = ref<string>('')

const mapping = {
  ts: 'typescript',
  json: 'json',
  rs: 'rust',
}

export const langs = Object.values(mapping)

watchEffect(() => {
  code.value = codes.find(c => c.path === selected.value)?.code ?? ''
  const ext = selected.value.split('.').pop()! as keyof typeof mapping
  lang.value = mapping[ext]!
})
