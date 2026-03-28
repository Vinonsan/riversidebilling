import { useState } from 'react'
import BillForm from '../components/BillForm'
import BillPreview from '../components/BillPreview'
import defaultBill from '../data/defaultBill'
import { generateInvoicePdf } from '../utils/generateInvoicePdf'

function BillingPage() {
  const [bill, setBill] = useState(defaultBill)

  const handleChange = (event) => {
    const { name, value } = event.target
    setBill((currentBill) => ({
      ...currentBill,
      [name]: value,
    }))
  }

  const handleReset = () => {
    setBill(defaultBill)
  }

  const handleGenerate = () => {
    generateInvoicePdf(bill)
  }

  return (
    <main className="billing-page">
      <section className="billing-shell">
        <div className="billing-hero">
          <p className="billing-kicker">Riverside Automotive</p>
          <h1>Billing Template</h1>
          <p className="billing-copy">
            Start with reusable form components now, then we can connect this
            to PDF bill generation next.
          </p>
        </div>

        <div className="billing-grid">
          <BillForm
            bill={bill}
            onChange={handleChange}
            onReset={handleReset}
            onGenerate={handleGenerate}
          />
          <BillPreview bill={bill} />
        </div>
      </section>
    </main>
  )
}

export default BillingPage
