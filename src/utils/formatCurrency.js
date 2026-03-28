export function formatCurrency(amount, currency = 'LKR') {
  const numericAmount = Number(amount)

  if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
    return `${currency} 0.00`
  }

  return `${currency} ${numericAmount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}
