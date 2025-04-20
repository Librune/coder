import { useLogPreview } from '@/providers/log-provider'

const LogPreview = () => {
  const { logs, clear } = useLogPreview()
  return (
    <div className=" pl-2 pr-2 pt-2 h-full overflow-auto">
      {logs.map((log, index) => {
        return (
          <div
            key={index}
            className="w-full mb-2 p-2  rounded-md bg-base-200  rounded-lg hover:bg-base-300"
          >
            <div className="text-xs text-gray-500 _line-clamp-2">  ▶ {log}</div>
          </div>
        )
      })}
      <button
        className="absolute right-7 bottom-4 rounded-full p-3 btn btn-active btn-accent"
        onClick={clear}
      >
        <span className="mgc_delete_2_line"></span>
      </button>
    </div>
  )
}

export default LogPreview
