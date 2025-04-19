import { invoke } from '@tauri-apps/api/core'
import { usePreview } from '../../provider'

const Actions = () => {
  const { actions } = usePreview()
  const onClick = async (action: string) => {
    const res = await invoke<string>('run_action', {
      action,
    })
    console.log('res:', res)
  }
  return !!actions ? (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <div className="badge badge-neutral">额外操作</div>
      </div>
      {actions.map((action) => (
        <div className="mt-3 w-full" key={action.action}>
          <button
            className="btn btn-sm btn-outline btn-accent ml-4 w-full"
            onClick={() => onClick(action.action)}
            type="submit"
          >
            <div className="text-[13px] font-normal">{action.name}</div>
          </button>
        </div>
      ))}
    </div>
  ) : (
    <></>
  )
}

export default Actions
