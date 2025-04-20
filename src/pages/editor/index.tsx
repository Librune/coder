import { useRef } from 'react'
import CodeEditor, { CodeEditorRef } from './components/CodeEditor'
import Preview from './components/Preview'
import { invoke } from '@tauri-apps/api/core'
import { useDrawer } from '@/providers/drawer-provider'
import { message, save } from '@tauri-apps/plugin-dialog'
import { writeTextFile } from '@tauri-apps/plugin-fs'
import EditorProvider, { usePreview, usePreviewActions } from './provider'
import LogPreview from '@/components/Log'

const Editor = () => {
  const codeEditorRef = useRef<CodeEditorRef>(null)
  const { setMetadata, setForm, setActions } = usePreviewActions()
  const { metadata } = usePreview()
  const { open } = useDrawer()
  const handleSubmitCode = async () => {
    try {
      const code = await codeEditorRef.current?.getCode()
      await invoke<string>('emit_code', { code })
      try {
        const metadata = await invoke<string>('get_metadata')
        const forms = await invoke<string>('get_forms')
        const actions = await invoke<string>('get_actions')
        setMetadata(JSON.parse(metadata))
        setForm(JSON.parse(forms))
        setActions(JSON.parse(actions))
      } catch (err) {
        console.log('err:', err)
        message(String(err), { title: '调用错误', kind: 'error' })
      }
    } catch (err) {
      message(String(err), { title: '代码错误', kind: 'error' })
    }
  }

  const handleSave = async () => {
    try {
      const code = await codeEditorRef.current?.getCode()
      const path = await save({
        filters: [
          {
            name: 'Untitled',
            extensions: ['js'],
          },
        ],
      })
      if (path === null) return
      await writeTextFile(path, code!)
    } catch (err) {
      message(String(err), { title: '代码错误', kind: 'error' })
    }
  }
  // useEffect(() => {
  //   codeEditorRef.current?.layout()
  // }, [!!code])
  return (
    <>
      {/* <NavBar /> */}
      {/* <FileTabs /> */}
      <div className="flex flex-grow flex-col md:flex-row h-full pt-1">
        <div className="flex-1 flex h-full flex-col pr-2 relative min-w-[0px]">
          <div className="flex-row pl-4">
            <button className="btn btn-ghost btn-sm" onClick={handleSubmitCode}>
              <span className="mgc_play_line text-[15px]"></span>
              <div className="text-[13px] font-normal">运行</div>
            </button>
            <button className="btn btn-ghost btn-sm">
              <span className="mgc_refresh_2_line text-[15px]"></span>
              <div className="text-[13px] font-normal">重置</div>
            </button>
            <button className="btn btn-ghost btn-sm" onClick={handleSave}>
              <span className="mgc_folder_download_line text-[15px]"></span>
              <div className="text-[13px] font-normal">保存</div>
            </button>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => {
                open({
                  title: '日志',
                  content: <div className="w-[400px] h-[400px]">日志</div>,
                  width: '400px',
                })
              }}
            >
              <span className="mgc_web_line text-[15px]"></span>
              <div className="text-[13px] font-normal">日志</div>
            </button>
          </div>
          <CodeEditor ref={codeEditorRef} />
        </div>
        {!!metadata && (
          <div className="w-[450px] h-[calc(100vh-48px)] flex-col flex mr-4">
            {/* <NavBar /> */}
            <div className="bg-neutral-100/50 w-full h-full rounded-lg mt-1 border border-neutral-300 overflow-auto">
              {/* <MetaData />
              <SearchBooks /> */}
              {/* <BookSourceFormGroup /> */}
              <Preview />
            </div>
          </div>
        )}
        {
          <div className="w-[420px] h-[calc(100vh-48px)] flex-col flex mr-4">
            <div className="bg-neutral-100/50 w-full h-full rounded-lg mt-1 border border-neutral-300">
              {/* <MetaData />
              <SearchBooks /> */}
              {/* <BookSourceFormGroup /> */}
              <LogPreview />
            </div>
          </div>
        }
        {/* <CodeEditor />
        <div className="hidden md:block md:w-1/4 lg:w-1/3">
          <SuggestionSidebar />
        </div> */}
      </div>
    </>
  )
}

export default () => {
  return (
    <EditorProvider>
      <Editor />
    </EditorProvider>
  )
}
