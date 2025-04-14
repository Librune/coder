import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react'

// 定义 Drawer 的 Props 类型
interface DrawerProps {
  title?: ReactNode
  content: ReactNode
  footer?: ReactNode
  width?: string | number
  className?: string
  showClose?: boolean
  position?: 'left' | 'right' // 抽屉位置
  onClose?: () => void
}

// 定义 Drawer Context 类型
interface DrawerContextType {
  open: (options: DrawerProps) => void
  close: () => void
}

// 创建 Drawer Context
const DrawerContext = createContext<DrawerContextType | undefined>(undefined)

// Drawer Provider 组件
export const DrawerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [drawerProps, setDrawerProps] = useState<DrawerProps | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const { showClose = true, position = 'right' } = drawerProps || {}

  // 打开 Drawer
  const open = useCallback((options: DrawerProps) => {
    setDrawerProps(options)
    // setIsOpen(true)
    document.getElementById('my-drawer')?.click()
  }, [])

  // 关闭 Drawer
  const close = useCallback(() => {
    setIsOpen(false)
    // 延迟清空内容，保证关闭动画完成后再清空内容
    setTimeout(() => {
      setDrawerProps(null)
    }, 300)
  }, [])

  // 处理关闭事件
  const handleClose = useCallback(() => {
    if (drawerProps?.onClose) {
      drawerProps.onClose()
    }
    close()
  }, [drawerProps, close])

  return (
    <DrawerContext.Provider value={{ open, close }}>
      {/* {children} */}

      {/* DaisyUI Drawer */}
      <div className="drawer h-full">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">{children}</div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </DrawerContext.Provider>
  )
}

// 自定义 Hook 用于在组件中使用 Drawer
export const useDrawer = () => {
  const context = useContext(DrawerContext)
  if (context === undefined) {
    throw new Error('useDrawer must be used within a DrawerProvider')
  }
  return context
}
