import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react'

// 定义 Modal 的 Props 类型
interface ModalProps {
  title?: ReactNode
  content: ReactNode
  footer?: ReactNode
  width?: string | number
  className?: string
  showClose?: boolean
  onConfirm?: () => void
  onCancel?: () => void
  confirmText?: string
  cancelText?: string
}

// 定义 Modal Context 类型
interface ModalContextType {
  open: (options: ModalProps) => void
  close: () => void
}

// 创建 Modal Context
const ModalContext = createContext<ModalContextType | undefined>(undefined)

// Modal Provider 组件
export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modalProps, setModalProps] = useState<ModalProps | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const { showClose = true } = modalProps || {}

  // 打开 Modal
  const open = useCallback((options: ModalProps) => {
    setModalProps(options)
    setIsOpen(true)
  }, [])

  // 关闭 Modal
  const close = useCallback(() => {
    setIsOpen(false)
    // 延迟清空内容，保证关闭动画完成后再清空内容
    setTimeout(() => {
      setModalProps(null)
    }, 300)
  }, [])

  // 处理确认
  const handleConfirm = useCallback(() => {
    if (modalProps?.onConfirm) {
      modalProps.onConfirm()
    }
    close()
  }, [modalProps, close])

  // 处理取消
  const handleCancel = useCallback(() => {
    if (modalProps?.onCancel) {
      modalProps.onCancel()
    }
    close()
  }, [modalProps, close])

  return (
    <ModalContext.Provider value={{ open, close }}>
      {children}

      {/* DaisyUI Modal */}
      <dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
        <div
          className={`modal-box ${modalProps?.className || ''}`}
          style={{ width: modalProps?.width }}
        >
          {/* 标题区域 */}
          {(modalProps?.title || showClose) && (
            <div className="flex justify-between items-center">
              {modalProps?.title && (
                <h3 className="font-bold text-lg">{modalProps.title}</h3>
              )}
              {showClose && (
                <button
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  onClick={close}
                >
                  ✕
                </button>
              )}
            </div>
          )}

          {/* 内容区域 */}
          <div className="py-4">{modalProps?.content}</div>

          {/* 自定义底部 */}
          {modalProps?.footer && (
            <div className="modal-action">{modalProps.footer}</div>
          )}

          {/* 默认底部（如果没有自定义底部且有确认或取消按钮） */}
          {!modalProps?.footer &&
            (modalProps?.onConfirm || modalProps?.onCancel) && (
              <div className="modal-action">
                {modalProps?.onCancel && (
                  <button className="btn" onClick={handleCancel}>
                    {modalProps?.cancelText || '取消'}
                  </button>
                )}
                {modalProps?.onConfirm && (
                  <button className="btn btn-primary" onClick={handleConfirm}>
                    {modalProps?.confirmText || '确认'}
                  </button>
                )}
              </div>
            )}
        </div>

        {/* 背景蒙层，点击关闭 */}
        <div className="modal-backdrop" onClick={close}>
          <button hidden>close</button>
        </div>
      </dialog>
    </ModalContext.Provider>
  )
}

// 自定义 Hook 用于在组件中使用 Modal
export const useModal = () => {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}
