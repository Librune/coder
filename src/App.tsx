import './App.css'
import Editor from './pages/editor'
import { ModalProvider } from '@/providers/modal-provider'
import { DrawerProvider } from './providers/drawer-provider'
import { LogPreviewProvider } from './providers/log-provider'

function App() {
  return (
    <LogPreviewProvider>
      <ModalProvider>
        <DrawerProvider>
          <Editor />
        </DrawerProvider>
      </ModalProvider>
    </LogPreviewProvider>
  )
  // return <div>233</div>
}

export default App
