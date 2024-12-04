import { PaymentCard } from '@repo/ui'; 
 
export default function Page() {
  const cardData = {
    balance: {
      amount: 89.99,
      autopayDate: 'September 12, 2024',
      lastPayment: {
        amount: 50.00,
        date: 'September 12, 2024'
      },
      showBillDetails: true
    },
    settings: {
      creditCard: {
        type: 'discover',
        lastFour: '5000'
      },
      autopayEnabled: true,
      paperlessEnabled: true
    },
    alert: {
      type: 'success',
      message: 'Payment successful'
    }
  };

  return <PaymentCard {...cardData} />;
}