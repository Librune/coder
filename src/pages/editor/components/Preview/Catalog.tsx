import { useAsync } from 'react-use'
import { usePreview, usePreviewActions } from '../../provider'
import { invoke } from '@tauri-apps/api/core'
import { useEffect } from 'react'

const Catalog = () => {
  // const { uuid } = useEditor()
  const { catalog, bid } = usePreview()
  const { setCatalog, setCid } = usePreviewActions()
  const { value } = useAsync(async () => {
    if (bid) {
      return await invoke<any[]>('get_catalog', { bid })
    } else {
      return undefined
    }
  }, [bid])
  useEffect(() => {
    if (value) {
      setCatalog(value)
    }
  }, [value])
  return !!value ? (
    <div className="p-4">
      <div className="flex items-center mb-3">
        <div className="badge badge-neutral">书籍目录</div>
      </div>
      {/* <div className="option text-xs font-normal text-neutral-500 mb-2">
        可以点击具体条目查看正文
      </div> */}
      {!!catalog?.length &&
        catalog.map((item: any) => (
          <div key={item.vid}>
            <div className="text-xs text-neutral-500 font-normal mt-3 mb-2">
              {item.title}
            </div>
            <ul className="menu bg-base-200 rounded-box w-full">
              {item.chapters.map((chapter: any) => (
                <li
                  key={chapter.cid}
                  className="text-xs text-neutral-500 font-normal cursor-pointer hover:text-accent cursor-pointer mt-3"
                  onClick={() => {
                    setCid(chapter.cid)
                  }}
                >
                  {chapter.title}
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  ) : (
    <></>
  )
}

export default Catalog
