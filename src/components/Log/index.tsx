import { useLogPreview } from '@/providers/log-provider'

const LogPreview = () => {
  const { logs } = useLogPreview()
  return (
    <div>
      {logs.map((log, index) => {
        return (
          <div key={index} className="w-full p-2">
            <div className="text-sm text-gray-500">{log}</div>
          </div>
        )
      })}
    </div>
  )
}

export default LogPreview
