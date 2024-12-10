import { PersonalizedBanner, StickerSheet } from "@repo/ui";

export default function Page() {
  const accounts = [
    {
      id: '1',
      type: 'DIRECTV SATELLITE',
      number: '987654321'
    }
  ];
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
          makeAPayementCTA="Make a payment"
          showMakeAPayment={true}
          showMorePaymentOptions={true}
          morePaymentOptionsCTA="More payment options"
          showPaymentsOptions={true}
          alertType="success"
          alertMessage="Payment successful"
        />
      </div>
      <div>
        <h3>Discover Card</h3>
        <StickerSheet
          currentBalanceAmt={89.99}
          autopayScheduledDate="September 12, 2024"
          lastPaymentAmt={50.0}
          lastPaymentReceivedDate="September 12, 2024"
          cardNumber="5000"
          cardType="discover"
          billDetailsText="View charges"
        />
      </div>
      <div>
        <h3>MasterCard</h3>
        <StickerSheet
          currentBalanceAmt={150.75}
          autopayScheduledDate="October 10, 2024"
          lastPaymentAmt={75.0}
          lastPaymentReceivedDate="October 10, 2024"
          cardNumber="1234"
          cardType="mastercard"
          autopayEligible={true}
          paperlessEligible={true}
          autopayEnrolled={false}
          paperlessEnrolled={true}
          makeAPayementCTA="Pay Now"
          showMakeAPayment={true}
          showMorePaymentOptions={false}
          showPaymentsOptions={true}
          alertType="error"
          alertMessage="Payment failed"
        />
      </div>
      <div>
        <h3>Amex Card</h3>
        <StickerSheet
          currentBalanceAmt={200.00}
          autopayScheduledDate="November 15, 2024"
          lastPaymentAmt={100.0}
          lastPaymentReceivedDate="November 15, 2024"
          cardNumber="6789"
          cardType="amex"
          autopayEligible={false}
          paperlessEligible={false}
          autopayEnrolled={false}
          paperlessEnrolled={false}
          showPaymentsOptions={false}
          billDetailsText="View charges"
        />
      </div>
      <div>
        <h3>PayPal</h3>
        <StickerSheet
          currentBalanceAmt={300.50}
          autopayScheduledDate="December 20, 2024"
          lastPaymentAmt={150.0}
          lastPaymentReceivedDate="December 20, 2024"
          cardNumber="4321"
          cardType="paypal"
          autopayEligible={true}
          paperlessEligible={true}
          autopayEnrolled={true}
          paperlessEnrolled={true}
          makeAPayementCTA="Pay Now"
          showMakeAPayment={true}
          showMorePaymentOptions={true}
          morePaymentOptionsCTA="More Options"
          showPaymentsOptions={true}
          alertType="success"
          alertMessage="Payment successful"
        />
      </div>
      <div>
        <h3>Bank Account</h3>
        <StickerSheet
          currentBalanceAmt={450.75}
          autopayScheduledDate="January 15, 2025"
          lastPaymentAmt={200.0}
          lastPaymentReceivedDate="January 15, 2025"
          cardNumber="9876"
          cardType="bank"
          autopayEligible={false}
          paperlessEligible={true}
          autopayEnrolled={false}
          paperlessEnrolled={true}
          showPaymentsOptions={true}
          billDetailsText="View charges"
        />
      </div>
    </div>
    </>
    
  );
  
}
