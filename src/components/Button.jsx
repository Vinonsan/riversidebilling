function Button({
  children,
  type = 'button',
  variant = 'primary',
  onClick,
  className = '',
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`billing-button billing-button--${variant} ${className}`.trim()}
    >
      {children}
    </button>
  )
}

export default Button
