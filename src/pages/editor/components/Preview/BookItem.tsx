import { SearchBook } from '@/libs/declare'
import { usePreviewActions } from '../../provider'

 

const BookItem = (props: SearchBook) => {
  const { id } = props
  const { setBid } = usePreviewActions()
  const handlClick = () => {
    setBid(id)
  }
  return (
    <div
      className="card bg-base-100 shadow-xl p-3 flex flex-row cursor-pointer"
      onClick={handlClick}
    >
      <img
        src={props.cover}
        alt="Book Cover"
        referrerPolicy="no-referrer"
        width={72}
        className="fit-cover rounded-sm mr-3"
      />

      <div className="flex-1 flex flex-col justify-between mt-1 mb-1">
        <h3 className="card-title text-sm font-bold text-neutral-900">
          {props.name}
        </h3>
        <p className="option text-xs font-normal text-neutral-500">
          作者：{props.author}
        </p>
        <p className="option text-xs font-normal text-neutral-500">
          更新时间：{props.last_update_time}
        </p>
        <p className="option text-xs font-normal text-neutral-500">
          标签：{props.tags?.join(', ')}
        </p>
      </div>
    </div>
  )
}

export default BookItem
