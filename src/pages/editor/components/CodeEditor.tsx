import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import { Editor, OnChange, useMonaco } from '@monaco-editor/react'
import { editor } from 'monaco-editor'
import { useMeasure } from 'react-use'
import declare from '../../../libs/declare.d.ts?raw'
import { convert } from '../../../libs/convert'
import initialCodes from '@/assets/code?raw'

export interface CodeEditorRef {
  getCode: () => Promise<string | undefined>
  reset: () => void
  layout: () => void
}

const CodeEditor = forwardRef<CodeEditorRef, {}>((_, ref) => {
  const monaco = useMonaco()
  const editorRef = useRef<editor.IStandaloneCodeEditor>()
  useImperativeHandle(ref, () => ({
    getCode: () => convert(monaco, editorRef),
    layout: () => {
      editorRef.current?.layout()
    },
    reset: () => {
      editorRef.current?.setValue(initialCodes)
    },
  }))

  // 获取编辑器实例
  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor
     // 设置默认代码
     const currentCode = localStorage.getItem('currentCode')
     if (currentCode) {
       editorRef.current?.setValue(currentCode)
     }else{
       editorRef.current?.setValue(initialCodes)
     }
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

  const [xref, { width, height }] = useMeasure<HTMLDivElement>()

  useEffect(() => {
    // 刷新编辑器布局
    editorRef.current?.layout()
  }, [width, height])

  const onCodeChange:OnChange = (value)=>{
    localStorage.setItem('currentCode', value || '')
  }

  return (
    <div className="flex-1 mt-2 h-full overflow-hidden" ref={xref} id="coder">
      <Editor
        language="typescript"
        options={{
          stickyScroll: {
            enabled: false,
          },
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
        onChange={onCodeChange}
      />
    </div>
  )
})

export default CodeEditor
