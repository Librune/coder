import { useState } from 'react'
import { usePreview, usePreviewActions } from '../../provider'
import { invoke } from '@tauri-apps/api/core'
import BookItem from './BookItem'

const SearchBooks = () => {
  // const { code, uuid } = useEditor()
  const [key, setKey] = useState<string>('')
  const { searchResult = [] } = usePreview()
  const { setSearchResult } = usePreviewActions()
  const onSearch = async (key: string) => {
    const res = await invoke<Record<string, any>[]>('search_books', {
      key,
      page: 0,
      count: 10,
    })
    setSearchResult(res)
  }
  return (
    <div className="p-4 pt-0">
      {/* <div className="flex items-center mb-3">
        <div className="badge badge-neutral">搜索书籍</div>
      </div> */}
      {/* <div className="option text-xs font-normal text-neutral-500 mb-2">
        只展示前三条搜索结果，点击书籍卡片以进行下一步
      </div> */}
      <fieldset className="fieldset flex" style={{ padding: '0 0 0 0' }}>
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="input focus:outline-none input-sm"
          placeholder="请输入关键词"
        />
        <button
          className="btn btn-sm btn-outline btn-accent ml-4"
          onClick={() => onSearch(key)}
        >
          <span className="mgc_search_line text-[15px]"></span>
          <div className="text-[13px] font-normal">搜索</div>
        </button>
      </fieldset>
      {searchResult.map((book) => (
        <div key={book.id} className="mt-3">
          <BookItem {...book} />
        </div>
      ))}
    </div>
  )
}

export default SearchBooks
