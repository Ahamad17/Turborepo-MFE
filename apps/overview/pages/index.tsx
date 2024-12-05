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
    maxWidth: 450,
    backgroundColor: '#fafafa',
    alertColors: {
      success: '#e6ffe6',
      error: '#ffe6e6',
    },
  };

  const successCard = {
    currentBalance: 89.99,
    autopayDate: 'September 12, 2024',
    lastPaymentAmount: 50.00,
    lastPaymentDate: 'September 12, 2024',
    cardLastFour: '5000',
    cardType: 'discover' as const,
    autopaySettings: {
        enabled: true,
        status: "on" as const,
    },
    paperlessSettings: {
      enabled: true,
      status: "off" as const,
    },
    alert: {
      type: 'success' as const,
      message: 'Payment successful'
    },
    theme: customTheme,
  };

  const failureCard = {
    currentBalance: 89.99,
    autopayDate: 'September 12, 2024',
    lastPaymentAmount: 50.00,
    lastPaymentDate: 'September 12, 2024',
    cardLastFour: '5000',
    cardType: 'discover' as const,
    autopaySettings: {
      enabled: true,
      status: "on" as const,
  },
  paperlessSettings: {
    enabled: true,
    status: "off" as const,
  },
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