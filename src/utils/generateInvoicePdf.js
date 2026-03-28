import { calculateGrandTotal, calculateLineTotal } from './billCalculations'
import { formatCurrency } from './formatCurrency'

function escapePdfText(value) {
  return String(value ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
}

function addText(lines, x, y, text, options = {}) {
  const size = options.size ?? 12
  const r = options.r ?? 0
  const g = options.g ?? 0
  const b = options.b ?? 0
  const font = options.bold ? '/F2' : '/F1'
  const safeText = escapePdfText(text)
  lines.push(`BT ${font} ${size} Tf ${r} ${g} ${b} rg 1 0 0 1 ${x} ${y} Tm (${safeText}) Tj ET`)
}

function addLine(lines, x1, y1, x2, y2, options = {}) {
  const width = options.width ?? 1
  const r = options.r ?? 0
  const g = options.g ?? 0
  const b = options.b ?? 0
  lines.push(`${width} w ${r} ${g} ${b} RG ${x1} ${y1} m ${x2} ${y2} l S`)
}

function addFilledRect(lines, x, y, width, height, options = {}) {
  const r = options.r ?? 0
  const g = options.g ?? 0
  const b = options.b ?? 0
  lines.push(`${r} ${g} ${b} rg ${x} ${y} ${width} ${height} re f`)
}

function buildPdfContent(bill) {
  const total = calculateGrandTotal(bill)
  const lineTotal = calculateLineTotal(bill)
  const content = []

  addFilledRect(content, 0, 806, 595, 36, { r: 0.82, g: 0.12, b: 0.18 })
  addFilledRect(content, 0, 0, 595, 28, { r: 0.82, g: 0.12, b: 0.18 })
  addFilledRect(content, 0, 760, 230, 82, { r: 0.03, g: 0.03, b: 0.03 })
  addLine(content, 234, 760, 594, 760, { width: 1.2, r: 0.82, g: 0.12, b: 0.18 })

  addText(content, 24, 792, 'RIVERSIDE', { size: 28, bold: true, r: 1, g: 1, b: 1 })
  addText(content, 58, 772, 'AUTOMOTIVE', { size: 16, bold: true, r: 1, g: 1, b: 1 })
  addText(content, 372, 772, 'INVOICE', { size: 30, bold: true, r: 0.82, g: 0.12, b: 0.18 })

  addText(content, 54, 690, 'INVOICE TO:', { size: 17, bold: true, r: 0.82, g: 0.12, b: 0.18 })
  addText(content, 54, 666, bill.customerName || 'Walk-in Customer', { size: 13 })
  addText(content, 54, 646, bill.customerAddress || '-', { size: 12 })
  addText(content, 54, 626, bill.customerEmail || '-', { size: 12 })
  addText(content, 54, 606, bill.customerPhone || '-', { size: 12 })

  addText(content, 382, 646, `Invoice No  : ${bill.invoiceNumber || '-'}`, {
    size: 12,
    bold: true,
  })
  addText(content, 382, 626, `Invoice Date: ${bill.billDate || '-'}`, {
    size: 12,
  })

  addFilledRect(content, 56, 536, 482, 28, { r: 0.84, g: 0.84, b: 0.84 })
  addText(content, 126, 545, 'Car Details', { size: 12, bold: true, r: 0.82, g: 0.12, b: 0.18 })
  addText(content, 318, 545, 'PRICE', { size: 12, bold: true, r: 0.82, g: 0.12, b: 0.18 })
  addText(content, 402, 545, 'QTY', { size: 12, bold: true, r: 0.82, g: 0.12, b: 0.18 })
  addText(content, 475, 545, 'TOTAL', { size: 12, bold: true, r: 0.82, g: 0.12, b: 0.18 })

  addText(content, 120, 516, bill.serviceType || 'General automotive service', {
    size: 13,
    bold: true,
  })
  addText(content, 316, 516, formatCurrency(bill.price, bill.currency), { size: 12, bold: true })
  addText(content, 414, 516, String(bill.quantity || 1), { size: 12, bold: true })
  addText(content, 470, 516, formatCurrency(lineTotal, bill.currency), { size: 12, bold: true })

  addLine(content, 64, 494, 528, 494, { r: 0.5, g: 0.5, b: 0.5 })
  addText(content, 70, 472, `Note: ${bill.note || 'Vehicle serviced and inspected.'}`, {
    size: 12,
    bold: true,
    r: 0.82,
    g: 0.12,
    b: 0.18,
  })
  addLine(content, 64, 456, 528, 456, { r: 0.5, g: 0.5, b: 0.5 })
  addLine(content, 64, 430, 528, 430, { r: 0.7, g: 0.7, b: 0.7 })
  addLine(content, 64, 404, 528, 404, { r: 0.7, g: 0.7, b: 0.7 })
  addLine(content, 64, 378, 528, 378, { r: 0.7, g: 0.7, b: 0.7 })

  addText(content, 56, 322, 'Thank you for your business', {
    size: 16,
    bold: true,
    r: 0.82,
    g: 0.12,
    b: 0.18,
  })
  addText(content, 56, 300, 'Payment info:', { size: 12, bold: true })
  addText(content, 56, 278, `Account No : ${bill.accountNumber || '-'}`, { size: 12 })
  addText(content, 56, 258, `A/C Name   : ${bill.accountName || '-'}`, { size: 12 })
  addText(content, 56, 238, `Bank       : ${bill.bankDetails || '-'}`, { size: 12 })
  addText(content, 56, 206, 'TERMS & CONDITIONS:', {
    size: 13,
    bold: true,
    r: 0.82,
    g: 0.12,
    b: 0.18,
  })

  addFilledRect(content, 312, 306, 226, 40, { r: 0.84, g: 0.84, b: 0.84 })
  addText(content, 322, 320, 'TOTAL', { size: 16, bold: true, r: 0.82, g: 0.12, b: 0.18 })
  addText(content, 446, 320, formatCurrency(total, bill.currency), {
    size: 16,
    bold: true,
    r: 0.82,
    g: 0.12,
    b: 0.18,
  })

  addText(content, 54, 42, bill.companyPhone || '+94 000 000 0000', { size: 11, bold: true })
  addText(content, 358, 42, bill.companyAddress || 'Riverside Automotive Workshop', {
    size: 11,
    bold: true,
  })

  return content.join('\n')
}

export function generateInvoicePdf(bill) {
  const contentStream = buildPdfContent(bill)
  const objects = []

  objects.push('1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj')
  objects.push('2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj')
  objects.push(
    '3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >> endobj',
  )
  objects.push('4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj')
  objects.push('5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >> endobj')
  objects.push(
    `6 0 obj << /Length ${contentStream.length} >> stream\n${contentStream}\nendstream endobj`,
  )

  let pdf = '%PDF-1.4\n'
  const offsets = [0]

  objects.forEach((objectDefinition) => {
    offsets.push(pdf.length)
    pdf += `${objectDefinition}\n`
  })

  const xrefOffset = pdf.length
  pdf += `xref\n0 ${objects.length + 1}\n`
  pdf += '0000000000 65535 f \n'

  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, '0')} 00000 n \n`
  })

  pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`

  const blob = new Blob([pdf], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${bill.invoiceNumber || 'invoice'}.pdf`
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
