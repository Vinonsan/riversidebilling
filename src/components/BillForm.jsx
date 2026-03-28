import Button from './Button'
import Input from './Input'

function BillForm({ bill, onChange, onReset, onGenerate }) {
  return (
    <form className="billing-card">
      <div className="billing-card__header">
        <h2>Bill Details</h2>
        <p>Fill the invoice details and download the bill PDF.</p>
      </div>

      <div className="billing-form">
        <Input
          id="invoiceNumber"
          label="Invoice Number"
          value={bill.invoiceNumber}
          onChange={onChange}
        />
        <Input
          id="billDate"
          label="Bill Date"
          type="date"
          value={bill.billDate}
          onChange={onChange}
        />
        <Input
          id="customerName"
          label="Customer Name"
          placeholder="Customer full name"
          value={bill.customerName}
          onChange={onChange}
        />
        <Input
          id="customerPhone"
          label="Customer Phone"
          placeholder="0771234567"
          value={bill.customerPhone}
          onChange={onChange}
        />
        <Input
          id="customerEmail"
          label="Customer Email"
          placeholder="customer@email.com"
          value={bill.customerEmail}
          onChange={onChange}
        />
        <Input
          id="customerAddress"
          label="Customer Address"
          placeholder="Customer address"
          value={bill.customerAddress}
          onChange={onChange}
        />
        <Input
          id="vehicleNumber"
          label="Vehicle Number"
          placeholder="CAB-1234"
          value={bill.vehicleNumber}
          onChange={onChange}
        />
        <Input
          id="serviceType"
          label="Car Details"
          placeholder="Volkswagen Touran"
          value={bill.serviceType}
          onChange={onChange}
        />
        <Input
          id="price"
          label="Price"
          type="number"
          placeholder="12500"
          value={bill.price}
          onChange={onChange}
          min="0"
          step="0.01"
        />
        <Input
          id="quantity"
          label="QTY"
          type="number"
          placeholder="1"
          value={bill.quantity}
          onChange={onChange}
          min="1"
          step="1"
        />
        <Input
          id="currency"
          label="Currency"
          placeholder="GBP"
          value={bill.currency}
          onChange={onChange}
        />
        <Input
          id="note"
          label="Note"
          placeholder="Car has repaired in front left"
          value={bill.note}
          onChange={onChange}
        />
        <Input
          id="accountNumber"
          label="Account Number"
          placeholder="Optional"
          value={bill.accountNumber}
          onChange={onChange}
        />
        <Input
          id="accountName"
          label="A/C Name"
          placeholder="Optional"
          value={bill.accountName}
          onChange={onChange}
        />
        <Input
          id="bankDetails"
          label="Bank Details"
          placeholder="Optional"
          value={bill.bankDetails}
          onChange={onChange}
        />
        <Input
          id="companyPhone"
          label="Company Phone"
          placeholder="+44 7824 812356"
          value={bill.companyPhone}
          onChange={onChange}
        />
        <Input
          id="companyAddress"
          label="Company Address"
          placeholder="1 Horston Rd, LE5 5QA"
          value={bill.companyAddress}
          onChange={onChange}
        />
      </div>

      <div className="billing-actions">
        <Button type="button" onClick={onGenerate}>
          Generate Bill PDF
        </Button>
        <Button type="button" variant="secondary" onClick={onReset}>
          Clear
        </Button>
      </div>
    </form>
  )
}

export default BillForm
