function Input({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  name,
  required = false,
  className = '',
  ...props
}) {
  return (
    <label className={`billing-input ${className}`} htmlFor={id}>
      <span className="billing-input__label">{label}</span>
      <input
        id={id}
        name={name ?? id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="billing-input__field"
        {...props}
      />
    </label>
  )
}

export default Input
