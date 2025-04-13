import { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react'

export type InputProps = {
  placeholder?: string
  field: string
  password?: boolean
} & InputHTMLAttributes<HTMLInputElement>

const _Input = (props: InputProps, ref: ForwardedRef<any>) => {
  const { placeholder = '请输入', field, password, ...inputProps } = props
  return (
    <input
      className="input focus:outline-none input-sm w-full"
      placeholder={placeholder}
      {...inputProps}
      type={password ? 'password' : 'text'}
      ref={ref}
    />
  )
}

export default forwardRef(_Input)
