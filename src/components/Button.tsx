import { ForwardedRef, forwardRef, HTMLProps } from 'react'

export type ButtonProps = {
  onClick?: () => void
  label: string
  field: string
} & HTMLProps<HTMLButtonElement>

const _Button = (props: ButtonProps, ref: ForwardedRef<any>) => {
  const { onClick, label, field, ...buttonProps } = props
  return (
    <button
      id={field}
      className="btn btn-sm btn-outline btn-accent ml-4 w-full"
      onClick={onClick}
      {...buttonProps}
      type="submit"
      ref={ref}
    >
      <div className="text-[13px] font-normal">{label}</div>
    </button>
  )
}

export default forwardRef(_Button)
