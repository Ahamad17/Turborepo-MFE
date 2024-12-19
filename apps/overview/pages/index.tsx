'use client'

import { PersonalizedBanner, StickerSheet } from "@repo/ui";
import billingCardContent from '../CMS/stream/accountOverview.json';

export default function Page() {
  const accounts = [
    {
      id: '1',
      type: 'DIRECTV SATELLITE',
      number: '987654321'
    }
  ];

  const handleBillDetailsClick = () => {
    console.log('Bill details clicked');
  };

  const handleEditCardClick = () => {
    console.log('Edit card clicked');
  };

  const handleEditAutopayClick = () => {
    console.log('Edit autopay clicked');
  };

  const handleEditPaperlessClick = () => {
    console.log('Edit paperless clicked');
  };

  const handleTermsClick = () => {
    console.log('Terms clicked');
  };

  const handlePayBalanceClick = () => {
    console.log('Pay balance clicked');
  };

  const handleMoreOptionsClick = () => {
    console.log('More options clicked');
  };

  const billingCard = billingCardContent[':items'].billingCard.elements;

  return (
    <>
    <PersonalizedBanner
    name="Bobby"
    accounts={accounts}
    selectedAccount="1"
    onAccountChange={(accountId) => console.log('Selected account:', accountId)}
  />
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "16px",
      }}
    >
      <div>
        <h3>Visa Card</h3>
        <StickerSheet
          currentBalanceAmt={89.99}
          autopayScheduledDate="September 12, 2024"
          lastPaymentAmt={50.0}
          lastPaymentReceivedDate="September 12, 2024"
          cardNumber="5000"
          cardType="visa"
          autopayEligible={true}
          paperlessEligible={true}
          autopayEnrolled={true}
          paperlessEnrolled={false}
          makeAPayementCTA={billingCard.ctaPayBalNow}
          showMakeAPayment={true}
          showMorePaymentOptions={true}
          morePaymentOptionsCTA={billingCard.ctaMoreOpts}
          showPaymentsOptions={true}
          alertType="success"
          alertMessage="Payment successful"
          billDetailsText={billingCard.lnkBillDetails}
          onBillDetailsClick={handleBillDetailsClick}
          onEditCardClick={handleEditCardClick}
          onEditAutopayClick={handleEditAutopayClick}
          onEditPaperlessClick={handleEditPaperlessClick}
          onTermsClick={handleTermsClick}
          onPayBalanceClick={handlePayBalanceClick}
          onMoreOptionsClick={handleMoreOptionsClick}
          cardLinkText={billingCard.lnkEdit}
          autopayLinkText={billingCard.lnkEnroll}
          paperlessLinkText={billingCard.lnkEnroll}
          currentBalanceText={billingCard.tltCurrentBal}
          autopayScheduledText={billingCard.txtAutopayScheduled}
          lastPaymentText={billingCard.txtLastPayment}
          autopayText={billingCard.txtAutopay}
          paperlessText={billingCard.txtPaperless}
          paymentAuthorizationText={billingCard.txtPaymentAuthorization}
          termsConditionsText={billingCard.lnkTerms}
        />
      </div>
    </div>
    </>
  );
}
