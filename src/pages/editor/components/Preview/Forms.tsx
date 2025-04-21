import Input from '@/components/Input'
import Button from '@/components/Button'
import { useForm } from 'react-hook-form'
import { usePreview } from '../../provider'
import { invoke } from '@tauri-apps/api/core'

const InputCmp = {
  input: Input,
  button: Button,
}

const Forms = () => {
  const { forms } = usePreview()
  const { register, handleSubmit, reset } = useForm()

  const onSubmit = async (data: any, event: any) => {
    const id = event.nativeEvent.submitter.id
    await invoke('set_envs', { envs: data })
    try {
      await invoke<Record<string, any>>('run_action', {
        action: id,
      })
      let envs = await invoke<Record<string, any>>('get_envs')
      reset(envs)
    } catch (err) {
      console.error('err:', err)
    }
  }

  return !!forms ? (
    <div className="p-4">
      <div className="flex items-center mb-3">
        <div className="badge badge-neutral">表单信息</div>
      </div>
      <div className="space-y-1.5 text-sm mt-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          {forms.map((item) => (
            <div
              key={item.name}
              className="flex flex-col items-start font-mono text-xs break-all w-full"
            >
              <div className="font-bold">{item.name}</div>
              {item.fields.map((field) => {
                const Cmp = InputCmp[field.type]
                return (
                  <div
                    key={field.label}
                    className="flex items-start font-mono text-xs break-all w-full mt-3"
                  >
                    <Cmp
                      {...field}
                      key={field.field}
                      {...register(field.field)}
                    />
                  </div>
                )
              })}
              <p className="fieldset-label mt-3">{item.desc}</p>
            </div>
          ))}
        </form>
      </div>
    </div>
  ) : (
    <></>
  )
}

export default Forms
