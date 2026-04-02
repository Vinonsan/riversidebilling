import { useState } from 'react'
import BillForm from '../components/BillForm'
import BillPreview from '../components/BillPreview'
import defaultBill, { createEmptyBill } from '../data/defaultBill'
import { generateInvoicePdf } from '../utils/generateInvoicePdf'

const logoSrc = `${import.meta.env.BASE_URL}logo.jpeg`

function BillingPage() {
  const [bill, setBill] = useState(() => ({ ...defaultBill }))
  const [isGenerating, setIsGenerating] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setBill((currentBill) => ({
      ...currentBill,
      [name]: value,
    }))
  }

  const handleReset = () => {
    setBill(createEmptyBill())
  }

  const handleGenerate = async () => {
    setIsGenerating(true)

    try {
      await generateInvoicePdf(bill)
    } catch (error) {
      console.error('Failed to generate invoice PDF', error)
      window.alert('Unable to generate the bill PDF right now. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <main className="billing-page">
      <section className="billing-shell">
        <div className="billing-hero">
          <div className="billing-hero__brand">
            <img
              className="billing-hero__logo"
              src={logoSrc}
              alt="Riverside Automotive logo"
            />
            <div>
              <p className="billing-kicker">Riverside Automotive</p>
              <h1>Billing Template</h1>
            </div>
          </div>
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
            isGenerating={isGenerating}
          />
          <BillPreview bill={bill} />
        </div>
      </section>
    </main>
  )
}

export default BillingPage
