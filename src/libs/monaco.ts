import 'monaco-editor/esm/vs/editor/editor.all.js'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'

monaco.editor.defineTheme('myCustomTheme', {
  base: 'vs',
  inherit: true,
  rules: [{ token: 'comment', foreground: '#00000000' }],
  colors: {},
})

export { monaco }
