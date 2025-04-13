import fs from 'fs'
import path from 'path'

import { Plugin, ResolvedConfig } from 'vite'

interface DtsImportOptions {
  /**
   * 是否包含注释
   */
  includeComments?: boolean
  /**
   * 自定义转换函数
   */
  transform?: (content: string, filePath: string) => string
}

export default function dtsImportPlugin(
  options: DtsImportOptions = {}
): Plugin {
  let config: ResolvedConfig

  return {
    name: 'vite-plugin-dts-import',

    configResolved(resolvedConfig) {
      config = resolvedConfig
    },

    resolveId(id, importer) {
      // 处理 .d.ts?raw 导入
      if (id.endsWith('.d.ts?raw')) {
        const rawId = id.replace('?raw', '')
        // 处理相对路径
        if (rawId.startsWith('.') && importer) {
          const resolvedPath = path.resolve(path.dirname(importer), rawId)
          return resolvedPath + '?raw'
        }
        return id
      }
      return null
    },

    async load(id) {
      if (id.endsWith('.d.ts?raw')) {
        const realPath = id.replace('?raw', '')

        try {
          let content = await fs.promises.readFile(realPath, 'utf-8')

          // 如果设置了不包含注释，则移除注释
          if (options.includeComments === false) {
            content = content.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
          }

          // 应用自定义转换
          if (options.transform) {
            content = options.transform(content, realPath)
          }

          return `export default ${JSON.stringify(content)};`
        } catch (error) {
          this.error(`Failed to load .d.ts file: ${realPath}`)
          return `export default "";`
        }
      }

      return null
    },
  }
}
