import './App.css'
import Editor from './pages/editor'
import { ModalProvider } from '@/providers/modal-provider'
import { DrawerProvider } from './providers/drawer-provider'

function App() {
  return (
    <ModalProvider>
      <DrawerProvider>
        <Editor />
      </DrawerProvider>
    </ModalProvider>
  )
  // return <div>233</div>
}

export default App
