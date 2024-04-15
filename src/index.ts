import { PathTreeBuilder, ROOT_NAME, walkPathTree } from 'to-path-tree'
import JSZip from 'jszip'
import FileSaver from 'file-saver'

export class MemCode {
  #pathTreeBuilder = new PathTreeBuilder<{
    code: string
  }>()

  constructor(files?: { path: string, code: string }[]) {
    files?.forEach(({ path, code }) => {
      this.add(path, code)
    })
  }

  add(path: string, code: string) {
    this.#pathTreeBuilder.addPath(path, {
      code,
    })
  }

  remove(path: string) {
    this.#pathTreeBuilder.removePath(path)
  }

  /**
   * @param path `/` means root
   */
  listFiles(path: string) {
    return this.#pathTreeBuilder.getItems(path === '/' ? ROOT_NAME : path)
  }

  async toZipBlob() {
    const folderMapping = new Map<string, JSZip>()
    const zipBuilder = new JSZip()
    walkPathTree(this.#pathTreeBuilder.tree, (node) => {
      let parentFolder: JSZip
      if (node.parent)
        parentFolder = folderMapping.get(node.parent.path)!
      const folder = parentFolder!
        ? parentFolder.folder(node.relativePathName)
        : zipBuilder.folder(node.relativePathName)
      if (!folder)
        return
      folderMapping.set(node.path, folder)
      node.items.forEach((item) => {
        folder.file(item.file, item.data?.code ?? '')
      })
    })
    return await zipBuilder.generateAsync({ type: 'blob' })
  }

  /**
   * @param zipBlob
   * @param name default: 'export.zip'
   */
  downloadZip(zipBlob: Blob, name = 'export.zip') {
    FileSaver.saveAs(zipBlob, name)
  }
}
