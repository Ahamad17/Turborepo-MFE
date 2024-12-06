import { StickerSheet } from '@repo/ui';

export default function Page() {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
      <StickerSheet
        currentBalanceAmt={89.99}
        autopayScheduledDate="September 12, 2024"
        lastPaymentAmt={50.0}
        lastPaymentReceivedDate="September 12, 2024"
        cardNumber="5000"
        cardType="discover"
        autopayEligible={true}
        paperlessEligible={true}
        autopayEnrolled={true}
        paperlessEnrolled={false}
        makeAPayementCTA="Make a payment"
        showMakeAPayment={true}
        showMorePaymentOptions={true}
        morePaymentOptionsCTA="More payment options"
        showPaymentsOptions={true}
        alertType="success"
        alertMessage="Payment successful"
        borderRadius={3}
        maxWidth={375}
        backgroundColor="#fafafa"
        alertSuccessColor="#e6ffe6"
        alertErrorColor="#ffe6e6"
        // onPayBalanceClick={() => {
        //   // Custom payment handling
        // }}
        // onBillDetailsClick={() => {
        //   // Custom bill details handling
        // }}
        // onEditCardClick={() => {
        //   // Custom edit card handling
        // }}
        // onEditAutopayClick={() => {
        //   // Custom edit autopay handling
        // }}
        // onEditPaperlessClick={() => {
        //   // Custom edit paperless handling
        // }}
        // onTermsClick={() => {
        //   // Custom terms handling
        // }}
        // onMoreOptionsClick={() => {
        //   // Custom more options handling
        // }}
      />
      <StickerSheet
        currentBalanceAmt={89.99}
        autopayScheduledDate="September 12, 2024"
        lastPaymentAmt={50.0}
        lastPaymentReceivedDate="September 12, 2024"
        cardNumber="5000"
        cardType="discover" />
    </div>
  );
}