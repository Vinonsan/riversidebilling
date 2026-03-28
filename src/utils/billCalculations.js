function toNumber(value) {
  const parsedValue = Number(value)
  return Number.isFinite(parsedValue) ? parsedValue : 0
}

export function calculateLineTotal(bill) {
  return toNumber(bill.price) * toNumber(bill.quantity || 1)
}

export function calculateGrandTotal(bill) {
  return calculateLineTotal(bill)
}
