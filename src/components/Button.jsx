function Button({
  children,
  type = 'button',
  variant = 'primary',
  onClick,
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`billing-button billing-button--${variant} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
