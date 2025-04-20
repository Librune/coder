import { useEffect } from 'react'
import { usePreview, usePreviewActions } from '../../provider'
import { invoke } from '@tauri-apps/api/core'

const BookDetail = () => {
  const { bookDetail, bid } = usePreview()
  const { setBookDetail } = usePreviewActions()
  useEffect(() => {
    invoke<string>('get_book_detail', { bid }).then((res) => {
      setBookDetail(res)
    })
  }, [bid])
  return !!bookDetail ? (
    <div className="p-4 pt-0">
      {/* <div className="flex items-center mb-3">
        <div className="badge badge-neutral">书籍详情</div>
      </div> */}
      <div className="flex">
        <img
          src={bookDetail.cover}
          className="w-22 h-32 fit-cover rounded-sm"
        />
        <div className="ml-4 flex-1 flex flex-col justify-between items-start text-left font-normal text-sm break-all max-h-[120px]">
          <div className="text-sm font-bold">{bookDetail.name}</div>
          <div className="text-xs text-neutral-500 font-normal">
            {bookDetail.author}/{bookDetail.status}/{bookDetail.words}字
          </div>
          {!!bookDetail.latestChapter && (
            <div className="text-xs text-neutral-500 font-normal">
              {bookDetail.latestChapter.title}
            </div>
          )}
          {!!bookDetail.copyright && (
            <div className="text-xs text-neutral-500 font-normal">
              版权所属：{bookDetail.copyright}
            </div>
          )}
        </div>
      </div>
      {!!bookDetail.extraData && (
        <div className="flex flex-row items-center mt-2">
          {bookDetail.extraData.map((item: any, index: number) => (
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
          <span className="text-neutral-500 font-normal">
            {bookDetail.intro}
          </span>
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}

export default BookDetail
