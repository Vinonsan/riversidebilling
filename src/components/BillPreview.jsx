import { calculateGrandTotal, calculateLineTotal } from '../utils/billCalculations'
import { formatCurrency } from '../utils/formatCurrency'

function BillPreview({ bill }) {
  const lineTotal = calculateLineTotal(bill)
  const grandTotal = calculateGrandTotal(bill)

  return (
    <aside className="billing-card billing-card--preview">
      <div className="billing-card__header">
        <h2>Preview</h2>
        <p>Invoice-style layout based on your reference design.</p>
      </div>

      <div className="invoice-preview">
        <div className="invoice-preview__bar" />

        <header className="invoice-preview__header">
          <div className="invoice-preview__brand">
            <div className="invoice-preview__brand-mark">
              <span className="invoice-preview__brand-gear">R</span>
            </div>
            <div>
              <p className="invoice-preview__brand-name">RIVERSIDE</p>
              <p className="invoice-preview__brand-subtitle">AUTOMOTIVE</p>
            </div>
          </div>

          <h3 className="invoice-preview__title">INVOICE</h3>
        </header>

        <section className="invoice-preview__intro">
          <div>
            <p className="invoice-preview__section-title">INVOICE TO:</p>
            <p className="invoice-preview__text-strong">
              {bill.customerName || 'Walk-in Customer'}
            </p>
            <p>{bill.customerAddress || '-'}</p>
            <p>{bill.customerEmail || '-'}</p>
            <p>{bill.customerPhone || '-'}</p>
          </div>

          <div>
            <p>
              <strong>Invoice No :</strong> #{bill.invoiceNumber || '-'}
            </p>
            <p>
              <strong>Invoice Date:</strong> {bill.billDate || '-'}
            </p>
          </div>
        </section>

        <section className="invoice-preview__table">
          <div className="invoice-preview__table-head invoice-preview__table-grid">
            <span>Car Details</span>
            <span>Price</span>
            <span>QTY</span>
            <span>Total</span>
          </div>

          <div className="invoice-preview__table-row invoice-preview__table-grid">
            <strong>{bill.serviceType || bill.vehicleNumber || '-'}</strong>
            <strong>{formatCurrency(bill.price, bill.currency)}</strong>
            <strong>{bill.quantity || '1'}</strong>
            <strong>{formatCurrency(lineTotal, bill.currency)}</strong>
          </div>
        </section>

        <section className="invoice-preview__notes">
          <div className="invoice-preview__line invoice-preview__line--note">
            <span>
              <strong>Note:</strong> {bill.note || 'Vehicle service note'}
            </span>
          </div>
          <div className="invoice-preview__line" />
          <div className="invoice-preview__line" />
          <div className="invoice-preview__line" />
        </section>

        <section className="invoice-preview__summary">
          <div>
            <p className="invoice-preview__thanks">Thank you for your business</p>
            <p className="invoice-preview__payment-title">Payment info:</p>
            <p>Account No : {bill.accountNumber || '-'}</p>
            <p>A/C Name : {bill.accountName || '-'}</p>
            <p>Bank Details: {bill.bankDetails || '-'}</p>
            <p className="invoice-preview__terms">TERMS & CONDITIONS:</p>
          </div>

          <div className="invoice-preview__total-box">
            <span>TOTAL</span>
            <strong>{formatCurrency(grandTotal, bill.currency)}</strong>
          </div>
        </section>

        <footer className="invoice-preview__footer">
          <span>{bill.companyPhone || '+94 000 000 0000'}</span>
          <span>{bill.companyAddress || 'Riverside Automotive Workshop'}</span>
        </footer>

        <div className="invoice-preview__bottom-bar">
          <div className="invoice-preview__bottom-accent" />
        </div>
      </div>
    </aside>
  )
}

export default BillPreview
