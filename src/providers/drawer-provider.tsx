import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  ChangeEventHandler,
} from 'react'

// 定义 Drawer 的 Props 类型
interface DrawerProps {
  title?: ReactNode
  content: ReactNode
  footer?: ReactNode
  width?: string | number
  className?: string
  end?: boolean
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
  const { end = false } = drawerProps || {}

  // 打开 Drawer
  const open = useCallback((options: DrawerProps) => {
    setDrawerProps(options)
    document.getElementById('my-drawer')?.click()
  }, [])

  // 关闭 Drawer
  const close = useCallback(() => {
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

  const handleToggle: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.checked) {
      handleClose()
    }
  }

  return (
    <DrawerContext.Provider value={{ open, close }}>
      <div className={`drawer ${end && 'drawer-end'} h-full`}>
        <input
          id="my-drawer"
          type="checkbox"
          className="drawer-toggle"
          onChange={handleToggle}
        />
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

export const useDrawer = () => {
  const context = useContext(DrawerContext)
  if (context === undefined) {
    throw new Error('useDrawer must be used within a DrawerProvider')
  }
  return context
}
