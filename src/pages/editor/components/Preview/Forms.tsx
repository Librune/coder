import { useAsync } from 'react-use'
import { useEditor } from '../../provider'
import { invoke } from '@tauri-apps/api/core'
import { Form } from '@/libs/declare'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { useForm } from 'react-hook-form'

const InputCmp = {
  input: Input,
  button: Button,
}

const Forms = () => {
  const { code, uuid } = useEditor()

  const { value } = useAsync(async () => {
    const res = await invoke<string>('get_form', { code })
    return JSON.parse(res) as Form[]
  }, [code])

  const { register, handleSubmit, reset } = useForm()

  const onSubmit = async (data: any, event: any) => {
    const id = event.nativeEvent.submitter.id
    await invoke('set_env', { uuid, env: data })
    try {
      const res = await invoke<Record<string, any>>('run_action', {
        uuid,
        action: id,
      })
      reset(res)
    } catch (err) {
      console.error('err:', err)
    }
  }

  return !!value ? (
    <div className="p-4">
      <div className="flex items-center mb-3">
        <div className="badge badge-neutral">表单信息</div>
      </div>
      <div className="space-y-1.5 text-sm mt-2">
        {/* <fieldset className="fieldset flex flex-col"> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {value.map((item) => (
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
        {/* </fieldset> */}
      </div>
    </div>
  ) : (
    <></>
  )
}

export default Forms
