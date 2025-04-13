import { useEffect, useRef } from 'react'
import CodeEditor, { CodeEditorRef } from './components/CodeEditor'
import EditorProvider, { useEditor } from './provider'
import { useModal } from '@/providers/modal-provider'
import Preview from './components/Preview'
import { invoke } from '@tauri-apps/api/core'
import { useDrawer } from '@/providers/drawer-provider'

const Editor = () => {
  const codeEditorRef = useRef<CodeEditorRef>(null)
  const { setCode, code, setUuid } = useEditor()
  const { open: openModal } = useModal()
  const { open } = useDrawer()
  const handleSubmitCode = async () => {
    try {
      const code = await codeEditorRef.current?.getCode()
      // console.log('code:', code)
      const uuid = await invoke<string>('emit_code', { code })
      setCode(code!)
      setUuid(uuid)
      // const res = await invoke('get_metadata', { code })
      // console.log('res:', res)
    } catch (err) {
      openModal({
        title: '错误',
        content: String(err),
      })
    }
  }
  useEffect(() => {
    codeEditorRef.current?.layout()
  }, [!!code])
  return (
    <>
      {/* <NavBar /> */}
      {/* <FileTabs /> */}
      <div className="flex flex-grow flex-col md:flex-row h-full pt-1 ">
        <div className="flex-1 flex h-full flex-col pr-2 relative">
          <div className="flex-row pl-4">
            <button className="btn btn-ghost btn-sm">
              <span className="mgc_add_line text-[15px]"></span>
              <div className="text-[13px] font-normal">新建</div>
            </button>
            <button className="btn btn-ghost btn-sm">
              <span className="mgc_folder_open_line text-[15px]"></span>
              <div className="text-[13px] font-normal">打开</div>
            </button>
            <button className="btn btn-ghost btn-sm">
              <span className="mgc_folder_download_line text-[15px]"></span>
              <div className="text-[13px] font-normal">保存</div>
            </button>
            <button className="btn btn-ghost btn-sm">
              <span className="mgc_refresh_2_line text-[15px]"></span>
              <div className="text-[13px] font-normal">重置</div>
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
          <button
            className="btn btn-circle absolute btn-accent bottom-4 right-4 z-[1000px]"
            onClick={handleSubmitCode}
          >
            <span className="mgc_arrow_right_line" />
          </button>
        </div>
        {!!code && (
          <div className="w-[450px] flex-col flex mr-4 overflow-auto">
            {/* <NavBar /> */}
            <div className="flex-1 bg-neutral-100/50 w-full rounded-lg mt-1 border border-neutral-300">
              {/* <MetaData />
              <SearchBooks /> */}
              {/* <BookSourceFormGroup /> */}
              <Preview />
            </div>
          </div>
        )}
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
