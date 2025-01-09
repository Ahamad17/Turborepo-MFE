'use client'

import { AppDrawer, PersonalizedBanner, StickerSheet } from "@repo/ui";
import billingCardContent from '../CMS/stream/accountOverview.json';
import { useState } from "react";
import PaymentMethodForm from "@/components/PaymentForm";
import { Typography } from '@mui/material';

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
    setOpen(true);
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

  const [open, setOpen] = useState(false);
  

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
          showMakeAPayment={true}
          showMorePaymentOptions={true}
          showPaymentsOptions={true}
          alertType="success"
          alertMessage="Payment successful"
          makeAPayementCTA={billingCard.ctaPayBalNow}
          morePaymentOptionsCTA={billingCard.ctaMoreOpts}
          billDetailsText={billingCard.lnkBillDetails}
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
          onBillDetailsClick={handleBillDetailsClick}
          onEditCardClick={handleEditCardClick}
          onEditAutopayClick={handleEditAutopayClick}
          onEditPaperlessClick={handleEditPaperlessClick}
          onTermsClick={handleTermsClick}
          onPayBalanceClick={handlePayBalanceClick}
          onMoreOptionsClick={handleMoreOptionsClick}
        />
      </div>
    </div>

    <AppDrawer
      open={open}
      onClose={() => setOpen(false)}
      header={<Typography variant="h6">Manage Payment Method</Typography>}
    >
      <PaymentMethodForm />
    </AppDrawer>
    </>
  );
}
