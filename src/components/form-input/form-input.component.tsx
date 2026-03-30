import { CSSProperties, InputHTMLAttributes } from "react"

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  value: string
}

interface RdFormProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  value?: string
  RdLabelProps?: CSSProperties
}

const labelStyle: CSSProperties = {
  fontSize: '0.95rem',
  fontWeight: 700,
  color: 'var(--text-muted)',
}

const inputStyle: CSSProperties = {
  width: '100%',
  padding: '0.9rem 1rem',
  borderRadius: '0.75rem',
  border: '1px solid var(--panel-border)',
  fontSize: '1rem',
  color: 'var(--text-primary)',
  background: 'rgba(255, 255, 255, 0.08)',
  outline: 'none',
}

const BaseFormInput = ({
  label,
  value,
  RdLabelProps,
  ...inputProps
}: {
  label: string
  value?: string
  RdLabelProps?: CSSProperties
} & InputHTMLAttributes<HTMLInputElement>) => (
  <div style={{ display: 'grid', gap: '0.5rem', margin: '1rem 0' }}>
    <label style={{ ...labelStyle, ...RdLabelProps }}>{label}</label>
    <input value={value ?? ''} style={inputStyle} {...inputProps} />
  </div>
)

export const FormInput = ({ label, value, ...otherInputProps }: FormInputProps) => (
  <BaseFormInput label={label} value={value} {...otherInputProps} />
)

export const RdFormInput = ({ label, value, RdLabelProps, ...inputProps }: RdFormProps) => (
  <BaseFormInput
    label={label}
    value={typeof value === 'string' ? value : ''}
    RdLabelProps={RdLabelProps}
    {...inputProps}
  />
)
