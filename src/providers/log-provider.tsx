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
  clear: () => void
}>({
  logs: [],
  pushLog: () => {},
  clear: () => {},
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

  const clear = useCallback(() => {
    setLog([])
  }, [setLog])

  useEffect(() => {
    listen<string>('log', (event) => {
      const log = event.payload
      setLog((prev) => [...prev, log])
    })
  }, [])

  return (
    <LogPreviewContext.Provider value={{ logs, pushLog, clear }}>
      {children}
    </LogPreviewContext.Provider>
  )
}
