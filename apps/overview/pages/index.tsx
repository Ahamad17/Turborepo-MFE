import { PaymentCard } from '@repo/ui';

export default function Page() {
  // Handlers for the first card
  const handleActions = {
    onBillDetailsClick: () => console.log('Bill details clicked'),
    onEditCardClick: () => console.log('Edit card clicked'),
    onEditAutopayClick: () => console.log('Edit autopay clicked'),
    onEditPaperlessClick: () => console.log('Edit paperless clicked'),
    onTermsClick: () => console.log('Terms clicked'),
    onPayBalanceClick: () => console.log('Pay balance clicked'),
    onMoreOptionsClick: () => console.log('More options clicked'),
  };

  const successCard = {
    currentBalance: 89.99,
    autopayDate: 'September 12, 2024',
    lastPaymentAmount: 50.00,
    lastPaymentDate: 'September 12, 2024',
    cardLastFour: '5000',
    cardType: 'discover',
    isAutopayEnabled: true,
    isPaperlessEnabled: true,
    alert: {
      type: 'success' as const,
      message: 'Payment successful'
    },
    ...handleActions
  };

  const errorCard = {
    currentBalance: 89.99,
    autopayDate: 'September 12, 2024',
    lastPaymentAmount: 50.00,
    lastPaymentDate: 'September 12, 2024',
    cardLastFour: '5000',
    cardType: 'discover',
    isAutopayEnabled: true,
    isPaperlessEnabled: true,
    alert: {
      type: 'error' as const,
      message: 'Payment failure'
    },
    ...handleActions
  };

  return (
    <div 
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '16px',
        padding: '16px',
      }}
    >
      <PaymentCard {...successCard} />
      <PaymentCard {...errorCard} />
    </div>
  );
}