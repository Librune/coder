import Actions from './Actions'
import BookDetail from './BookDetail'
import Catalog from './Catalog'
import Chapter from './Chapter'
import Forms from './Forms'
import MetaData from './MetaData'
import SearchBooks from './SearchBooks'

const Preview = () => {
  return (
    // <>
    //   <MetaData />
    //   <Forms />
    //   <Actions />
    //   <SearchBooks />
    //   <BookDetail />
    //   <Catalog />
    //   <Chapter />
    // </>
    <div className="tabs text-sm">
      <input
        type="radio"
        name="my_tabs_2"
        defaultChecked
        className="tab"
        aria-label="概览"
        style={{ marginLeft: '12px' }}
      />
      <div
        className="tab-content overflow-auto"
        style={{ height: 'calc(100vh - 108px)' }}
      >
        <MetaData />
        <Forms />
        <Actions />
      </div>

      <input
        type="radio"
        name="my_tabs_2"
        className="tab ml-3"
        aria-label="搜索"
        style={{ marginLeft: '12px' }}
      />
      <div
        className="tab-content overflow-auto"
        style={{ height: 'calc(100vh - 108px)' }}
      >
        <SearchBooks />
      </div>

      <input
        type="radio"
        name="my_tabs_2"
        className="tab"
        aria-label="详情"
        style={{ marginLeft: '12px' }}
      />
      <div
        className="tab-content overflow-auto"
        style={{ height: 'calc(100vh - 108px)' }}
      >
        <BookDetail />
      </div>
      <input
        type="radio"
        name="my_tabs_2"
        className="tab"
        aria-label="目录"
        style={{ marginLeft: '12px' }}
      />
      <div
        className="tab-content overflow-auto"
        style={{ height: 'calc(100vh - 108px)' }}
      >
        <Catalog />
      </div>
      <input
        type="radio"
        name="my_tabs_2"
        className="tab"
        aria-label="章节"
        style={{ marginLeft: '12px' }}
      />
      <div
        className="tab-content overflow-auto"
        style={{ height: 'calc(100vh - 108px)' }}
      >
        <Chapter />
      </div>
    </div>
  )
}

export default Preview
