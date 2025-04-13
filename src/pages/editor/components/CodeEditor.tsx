import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import { Editor, useMonaco } from '@monaco-editor/react'
import { editor } from 'monaco-editor'
import { useWindowSize } from 'react-use'
import declare from '../../../libs/declare.d.ts?raw'
import { convert } from '../../../libs/convert'
import { useEditor } from '../provider'

export interface CodeEditorRef {
  getCode: () => Promise<string | undefined>
  layout: () => void
}

const CodeEditor = forwardRef<CodeEditorRef, {}>((_, ref) => {
  const monaco = useMonaco()
  const editorRef = useRef<editor.IStandaloneCodeEditor>()
  const windowSize = useWindowSize()
  const { code } = useEditor()

  useEffect(() => {
    editorRef.current?.layout()
  }, [windowSize])

  // 暴露getCode方法给父组件
  useImperativeHandle(ref, () => ({
    getCode: () => convert(monaco, editorRef),
    layout: () => {
      editorRef.current?.layout()
    },
  }))

  // 获取编辑器实例
  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor
  }

  useEffect(() => {
    if (monaco) {
      console.log('here is the monaco instance:', monaco)
      monaco.editor.defineTheme('coder', {
        base: 'vs',
        inherit: true,
        rules: [],
        colors: {
          'editor.background': '#00000000',
          focusBorder: '#00000000',
        },
      })
      // 设置主体
      monaco.editor.setTheme('coder')

      // 添加自定义类型定义文件
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        declare,
        'file:///declare.d.ts'
      )
      // 为类型定义创建虚拟文件
      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        target: monaco.languages.typescript.ScriptTarget.ES2020,
        allowNonTsExtensions: true,
        moduleResolution:
          monaco.languages.typescript.ModuleResolutionKind.NodeJs,
        module: monaco.languages.typescript.ModuleKind.ESNext,
        noEmit: false,
        checkJs: true,
        isolatedModules: false,
        lib: ['es2020'],
        typeRoots: ['file:///'],
        baseUrl: 'file:///',
        types: ['declare.d.ts'],
        allowSyntheticDefaultImports: true,
      })
    }
  }, [monaco])

  return (
    <div className="flex-1 mt-2">
      <div id="coder" className="h-full">
        <Editor
          width={!code ? '100%' : 'calc(100vw - 450px)'}
          language="typescript"
          options={{
            automaticLayout: true,
            minimap: { enabled: false },
            renderLineHighlight: 'none',
            glyphMargin: false,
            folding: false,
            lineNumbers: 'on',
            scrollbar: {
              vertical: 'hidden',
              horizontal: 'hidden',
            },
          }}
          theme={'coder'}
          onMount={handleEditorDidMount}
        />
      </div>
    </div>
  )
})

export default CodeEditor
