import { Monaco } from '@monaco-editor/react'
import { editor } from 'monaco-editor'
import { MutableRefObject } from 'react'

export const convert = async (
  monaco: Monaco | null,
  editorRef: MutableRefObject<editor.IStandaloneCodeEditor | undefined>
) => {
  if (!monaco) {
    throw new Error('Monaco is not initialized')
  }
  if (!editorRef.current) {
    throw new Error('Editor is not initialized')
  }
  const editor: editor.IStandaloneCodeEditor = editorRef.current
  const tsCode = editor.getValue()
  if (!tsCode.trim()) {
    throw new Error('Code is empty')
  }

  const tsModel = editor.getModel()
  if (!tsModel) {
    throw new Error('No model found for the editor')
  }
  const tsUri = tsModel.uri
  const worker = await monaco.languages.typescript.getTypeScriptWorker()
  const client = await worker(tsUri)
  const diagnostics = await client.getSyntacticDiagnostics(tsUri.toString())
  if (diagnostics.length > 0) {
    throw new Error(
      `Syntax errors found: ${diagnostics.map((d) => d.messageText).join(', ')}`
    )
  }
  const semanticDiagnostics = await client.getSemanticDiagnostics(
    tsUri.toString()
  )
  if (semanticDiagnostics.length > 0) {
    throw new Error(
      `Semantic errors found: ${semanticDiagnostics
        .map((d) => d.messageText)
        .join(', ')}`
    )
  }
  const output = await client.getEmitOutput(tsUri.toString())
  let code = output.outputFiles[0].text
  code = code.replace(/\nexport \{\};?(\r?\n)?/g, '')
  code = code.replace(/\s+$/, '')
  return code
}
