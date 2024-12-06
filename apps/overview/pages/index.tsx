import { StickerSheet, useStickerSheetActions } from '@repo/ui';

export default function Page() {
  const handlers = useStickerSheetActions({
    onPayBalanceClick: () => {
      // Custom payment handling
    },
    onBillDetailsClick: () => {
      // Custom bill details handling
    },
  });

  const customTheme = {
    borderRadius: 3,
    maxWidth: 375,
    backgroundColor: '#fafafa',
    alertColors: {
      success: '#e6ffe6',
      error: '#ffe6e6',
    },
  };

  const successCard = {
    currentBalanceAmt: 89.99,
    autopayScheduledDate: 'September 12, 2024',
    lastPaymentAmt: 50.00,
    lastPaymentReceivedDate: 'September 12, 2024',
    cardNumber: '5000',
    cardType: 'discover' as const,
    autopayEligible: true,
    paperlessEligible: true,
    autopayEnrolled: true,
    paperlessEnrolled: false,
    alert: {
      type: 'success' as const,
      message: 'Payment successful'
    },
    theme: customTheme,
  };

  const failureCard = {
    currentBalanceAmt: 89.99,
    autopayScheduledDate: 'September 12, 2024',
    lastPaymentAmt: 50.00,
    lastPaymentReceivedDate: 'September 12, 2024',
    cardNumber: '5000',
    cardType: 'discover' as const,
    autopayEligible: true,
    paperlessEligible: true,
    autopayEnrolled: true,
    paperlessEnrolled: false,
    alert: {
      type: 'error' as const,
      message: 'Payment failed! Please try again.'
    },
    theme: customTheme,
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
      <StickerSheet {...successCard} {...handlers} />
      <StickerSheet {...failureCard} {...handlers} />
      <StickerSheet {...failureCard} {...handlers} />
    </div>
  );
}