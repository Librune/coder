import Actions from './Actions'
import BookDetail from './BookDetail'
import Catalog from './Catalog'
import Chapter from './Chapter'
import Forms from './Forms'
import MetaData from './MetaData'
import SearchBooks from './SearchBooks'

const Preview = () => {
  return (
    <>
      <MetaData />
      <Forms />
      <Actions />
      <SearchBooks />
      <BookDetail />
      <Catalog />
      <Chapter />
    </>
  )
}

export default Preview
