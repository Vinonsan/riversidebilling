const defaultBill = {
  invoiceNumber: 'RA-1001',
  billDate: new Date().toISOString().slice(0, 10),
  customerName: 'Mohmad tosif mussagi',
  customerAddress: '59 maynard road, LE2 0ap',
  customerEmail: 'toshim46@gmail.com',
  customerPhone: '07466921746',
  vehicleNumber: 'LE2-0AP',
  serviceType: 'Volkswagen Touran',
  price: '12500',
  quantity: '1',
  note: 'Car has repaired in front left',
  accountNumber: '',
  accountName: '',
  bankDetails: '',
  companyPhone: '+44 7824 812356',
  companyAddress: '1 Horston Rd, LE5 5QA',
}

export default defaultBill
