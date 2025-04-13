import { useEditor, usePreview } from '../../provider'
import { useAsync } from 'react-use'
import { invoke } from '@tauri-apps/api/core'

const BookDetail = () => {
  const { bid } = usePreview()
  const { uuid } = useEditor()
  const { value } = useAsync(async () => {
    if (bid) {
      return await invoke<any>('get_book_detail', { bid, uuid })
    } else {
      return undefined
    }
  }, [bid])
  return !!value ? (
    <div className="p-4">
      <div className="flex items-center mb-3">
        <div className="badge badge-neutral">书籍详情</div>
      </div>
      <div className="flex">
        <img src={value.cover} className="w-22 h-32 fit-cover rounded-sm" />
        <div className="ml-4 flex-1 flex flex-col justify-between items-start text-left font-normal text-sm break-all max-h-[120px]">
          <div className="text-sm font-bold">{value.name}</div>
          <div className="text-xs text-neutral-500 font-normal">
            {value.author}/{value.status}/{value.words}字
          </div>
          {!!value.latestChapter && (
            <div className="text-xs text-neutral-500 font-normal">
              {value.latestChapter.title}
            </div>
          )}
          {!!value.copyright && (
            <div className="text-xs text-neutral-500 font-normal">
              版权所属：{value.copyright}
            </div>
          )}
        </div>
      </div>
      {!!value.extraData && (
        <div className="flex flex-row items-center mt-2">
          {value.extraData.map((item: any, index: number) => (
            <div className="stats flex-1 items-center" key={index}>
              <div className="stat">
                <div className="stat-title text-xs">{item.label}</div>
                <div className="stat-value text-base">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-0">
        <div className="text-xs leading-5">
          <span className="font-bold">书籍简介：</span>
          <span className="text-neutral-500 font-normal">{value.intro}</span>
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}

export default BookDetail
