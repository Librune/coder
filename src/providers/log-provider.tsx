import { listen } from '@tauri-apps/api/event'
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

const LogPreviewContext = createContext<{
  logs: string[]
  pushLog: (log: string) => void
}>({
  logs: [],
  pushLog: () => {},
})

export const useLogPreview = () => {
  const context = useContext(LogPreviewContext)
  if (!context) {
    throw new Error('useLogPreview must be used within a LogPreviewProvider')
  }
  return context
}

export const LogPreviewProvider = ({ children }: PropsWithChildren<{}>) => {
  const [logs, setLog] = useState<string[]>([])

  const pushLog = useCallback(
    (log: string) => {
      setLog((prev) => [...prev, log])
    },
    [setLog]
  )

  useEffect(() => {
    listen<string>('log', (event) => {
      console.log('event:', event.payload)
      const log = event.payload
      setLog((prev) => [...prev, log])
    })
  }, [])

  return (
    <LogPreviewContext.Provider value={{ logs, pushLog }}>
      {children}
    </LogPreviewContext.Provider>
  )
}
