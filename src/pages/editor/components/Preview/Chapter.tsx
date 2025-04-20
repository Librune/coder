import { useAsync } from 'react-use'
import { usePreview, usePreviewActions } from '../../provider'
import { useEffect } from 'react'
import { invoke } from '@tauri-apps/api/core'

const Chapter = () => {
  const { cid, chapter, bid } = usePreview()
  const { setChapter } = usePreviewActions()
  const { value } = useAsync(async () => {
    if (cid) {
      return await invoke<any>('get_chapter', { cid, bid })
    } else {
      return undefined
    }
  }, [cid])
  useEffect(() => {
    if (value) {
      setChapter(value)
    }
  }, [value])
  useEffect(() => {
    setChapter({})
  }, [bid])
  return !!value ? (
    <div className="p-4 pt-0">
      {/* <div className="flex items-center mb-3">
        <div className="badge badge-neutral">正文内容</div>
      </div> */}
      <div className="option text-xs font-normal text-neutral-500 mb-2 whitespace-pre-wrap">
        {chapter?.content
          ? chapter.content.replace(/<br\s*\/?>/gi, '\n')
          : '暂无正文'}
      </div>
    </div>
  ) : (
    <></>
  )
}

export default Chapter
