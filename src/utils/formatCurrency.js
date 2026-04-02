const CURRENCY_SYMBOL = '£'

export function formatCurrency(amount) {
  const numericAmount = Number(amount)

  if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
    return `${CURRENCY_SYMBOL}0.00`
  }

  return `${CURRENCY_SYMBOL}${numericAmount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}
