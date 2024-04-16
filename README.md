# memcode

<a href="https://www.npmjs.com/package/memcode" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/npm/v/memcode" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/package/memcode" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/npm/dt/memcode" alt="NPM Downloads" /></a>
<a href="https://github.com/alexzhang1030/memcode/blob/main/LICENSE" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/github/license/alexzhang1030/memcode" alt="License" /></a>

Organize your filles and download them in your browser.

## Installation

```bash
pnpm i memcode
```

## Usage

```ts
import { MemCode } from 'memcode'

// add files when creating
const code = new MemCode([{
  name: 'src/index.ts',
  content: 'console.log("hello world")'
}])

// add
code.add('package.json', JSON.stringify({
  name: 'hello world'
}))

// add also support directory
code.add('/src/index.ts', 'console.log("hello world")')
code.add('/src/foo/bar.ts', 'console.log("hello foo bar"')

// update
code.update('src/index.ts', 'const a = 1')

// remove
code.remove('src/index.ts')

// To zip
const blob = await code.toZipBlob()

// Download zip
code.downloadZip(blob, 'memcode.zip')
```

## License

MIT
