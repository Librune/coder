import { usePreviewActions } from '../../provider'

type BookItemProps = {
  bid: string
  name: string
  author: string
  cover: string
  description: string
  creationStatus: string
  tag: string[]
  update: string
}

const BookItem = (props: BookItemProps) => {
  const { bid } = props
  const { setBid } = usePreviewActions()
  const handlClick = () => {
    setBid(bid)
  }
  return (
    <div
      className="card bg-base-100 shadow-xl p-3 flex flex-row cursor-pointer"
      onClick={handlClick}
    >
      <img
        src={props.cover}
        alt="Book Cover"
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
          更新时间：{props.update}
        </p>
        <p className="option text-xs font-normal text-neutral-500">
          标签：{props.tag.join(', ')}
        </p>
      </div>
    </div>
  )
}

export default BookItem
