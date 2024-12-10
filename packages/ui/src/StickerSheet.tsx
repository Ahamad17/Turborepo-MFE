'use client'

import { styled } from "@mui/material/styles";
import {
  Box,
  Typography,
  Button,
  Card,
  Link,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ErrorIcon from '@mui/icons-material/Error';
import CancelIcon from '@mui/icons-material/Cancel';
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover, FaPaypal, FaUniversity } from 'react-icons/fa';

/**
 * Type for Alert.
 * - `success`: Represents a successful operation or message.
 * - `error`: Represents an error or failure state.
 */
type AlertType = "success" | "error";

/**
 * Supported card types.
 * - `visa`
 * - `mastercard`
 * - `amex`
 * - `discover`
 */
type CardType = 'visa' | 'mastercard' | 'amex' | 'americanexpress' | 'discover' | 'paypal' | 'bank';

/**
 * Base props for the StickerSheet component.
 * Includes payment-related data and configuration flags.
 */
type StickerSheetBaseProps = {
  currentBalanceAmt: number;
  autopayScheduledDate: string;
  lastPaymentAmt: number;
  lastPaymentReceivedDate: string;
  cardNumber: string;
  cardType: CardType;
  autopayEligible?: boolean;
  paperlessEligible?: boolean;
  autopayEnrolled?: boolean;
  paperlessEnrolled?: boolean;
  alertType?: AlertType;
  alertMessage?: string;
  className?: string;
  borderRadius?: number;
  maxWidth?: number;
  backgroundColor?: string;
  alertSuccessColor?: string;
  alertErrorColor?: string;
  currency?: string;
  makeAPayementCTA?: string
  showMakeAPayment?: boolean,
  showMorePaymentOptions?: boolean,
  morePaymentOptionsCTA?: string,
  showPaymentsOptions?: boolean,
  billDetailsText?: string;
};

/**
 * Action callbacks for interactive elements in the StickerSheet.
 */
type StickerSheetActions = {
  onBillDetailsClick?: () => void;
  onEditCardClick?: () => void;
  onEditAutopayClick?: () => void;
  onEditPaperlessClick?: () => void;
  onTermsClick?: () => void;
  onPayBalanceClick?: () => void;
  onMoreOptionsClick?: () => void;
};

/**
 * Combined props for StickerSheet, merging base props and actions.
 */
type StickerSheetProps = StickerSheetBaseProps & StickerSheetActions;

/**
 * Styled base card for StickerSheet.
 * Applies theme-based styling and allows for custom theming via props.
 */
const BaseCard = styled(Card)<{ customTheme: { borderRadius: number; maxWidth: number; backgroundColor: string } }>(({ theme, customTheme }) => ({
  width: "100%",
  maxWidth: customTheme?.maxWidth,
  backgroundColor: customTheme?.backgroundColor,
  borderRadius: theme.spacing(customTheme?.borderRadius),
  boxShadow: theme.shadows[1],
  margin: "0 auto",
}));

/**
 * Styled alert box with support for success and error types.
 * Allows customization of colors through theme props.
 */
const Alert = styled(Box)<{ type: AlertType; customColors?: { success: string; error: string } }>(
  ({ theme, type, customColors }) => ({
    backgroundColor: type === "success" 
      ? customColors?.success
      : customColors?.error,
    color: type === "success" ? "primary" : "#FFFFFF",
    padding: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
  })
);

/**
 * Styled section for displaying balance information.
 * Adapts spacing for mobile viewports.
 */
const BalanceSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

/**
 * Styled link for editing options and navigation.
 */
const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  fontSize: theme.typography.pxToRem(14),
  color: theme.palette.primary.main,
  "&:hover": {
    textDecoration: "underline",
  },
}));

const ActionLink: React.FC<{ onClick?: () => void; ariaLabel: string; children: React.ReactNode }> = ({ onClick, ariaLabel, children }) => (
  <StyledLink href="#" onClick={(e) => {
    e.preventDefault();
    onClick?.();
  }} aria-label={ariaLabel}>
    {children}
  </StyledLink>
);

/**
 * Styled container for payment settings, such as autopay and paperless billing.
 */
const PaySettings = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

/**
 * Divider section for visual separation of balance and payment settings.
 */
const DividerBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  paddingTop: 0,
  paddingBottom: 0,
}));

/**
 * Divider styling for use in StickerSheet.
 */
const PaymentDivider = styled(Divider)(({ theme }) => ({
  height: 1,
  backgroundColor: theme.palette.divider,
}));

/**
 * Styled button for StickerSheet actions.
 */
const ActionButton = styled(Button)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(1),
  borderRadius: theme.spacing(5),
  textTransform: "none",
  boxShadow: "none",
}));

/**
 * AlertMessage Component.
 * Renders the alert box with an icon and message.
 */
const AlertMessage: React.FC<{ alertType: AlertType; alertMessage: string; isMobile: boolean; alertSuccessColor: string; alertErrorColor: string }> = ({ alertType, alertMessage, isMobile, alertSuccessColor, alertErrorColor }) => (
  alertType && alertMessage && <Alert type={alertType} customColors={{ success: alertSuccessColor, error: alertErrorColor }}>
    {alertType === "success" && <CheckCircleIcon color="success" />}
    {alertType === "error" && <ErrorIcon />}
    <Typography variant={isMobile ? "body2" : "body1"}>{alertMessage}</Typography>
  </Alert>
);

/**
 * BalanceInfo Component.
 * Displays the current balance, autopay date, and last payment information.
 */
const BalanceInfo: React.FC<{
  currentBalanceAmt: number;
  autopayScheduledDate: string;
  lastPaymentAmt: number;
  lastPaymentReceivedDate: string;
  onBillDetailsClick?: () => void;
  isMobile: boolean;
  currency: string;
  billDetailsText: string;
}> = ({
  currentBalanceAmt,
  autopayScheduledDate,
  lastPaymentAmt,
  lastPaymentReceivedDate,
  onBillDetailsClick,
  isMobile,
  currency,
  billDetailsText,
}) => (
  <BalanceSection>
    <Typography variant="body2" color="textSecondary">
      Current balance
    </Typography>

    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 0.5 }}>
      <Typography variant={isMobile ? "h5" : "h3"}>
        {currency}{currentBalanceAmt.toFixed(2)}
      </Typography>
      <ActionLink onClick={onBillDetailsClick} ariaLabel="View bill details">
        {billDetailsText}
      </ActionLink>
    </Box>

    <Typography variant="body2" sx={{ mb: 2.5, fontSize: 16 }}>
      Autopay scheduled for {autopayScheduledDate}
    </Typography>
    <Typography variant="body2" color="textSecondary">
      Last payment of {currency}{lastPaymentAmt.toFixed(2)} was received on {lastPaymentReceivedDate}
    </Typography>
  </BalanceSection>
);

/**
 * PaymentSettings Component.
 * Displays payment method, autopay, and paperless settings.
 */
const PaymentSettings: React.FC<{
  cardNumber: string;
  cardType: CardType;
  autopayEligible: boolean;
  paperlessEligible: boolean;
  autopayEnrolled: boolean;
  paperlessEnrolled: boolean;
  makeAPayementCTA: string
  showMakeAPayment: boolean,
  showMorePaymentOptions: boolean,
  morePaymentOptionsCTA: string,
  showPaymentsOptions: boolean
  onEditCardClick?: () => void;
  onEditAutopayClick?: () => void;
  onEditPaperlessClick?: () => void;
  onTermsClick?: () => void;
  onPayBalanceClick?: () => void;
  onMoreOptionsClick?: () => void;
}> = ({
  cardNumber,
  autopayEligible,
  paperlessEligible,
  autopayEnrolled,
  paperlessEnrolled,
  makeAPayementCTA,
  showMakeAPayment,
  showMorePaymentOptions,
  morePaymentOptionsCTA,
  showPaymentsOptions,
  cardType,
  onEditCardClick,
  onEditAutopayClick,
  onEditPaperlessClick,
  onTermsClick,
  onPayBalanceClick,
  onMoreOptionsClick,
}) => (
  <PaySettings>
    <PaymentMethod cardType={cardType} lastFour={cardNumber} onEdit={onEditCardClick} />
    {autopayEligible && <SettingRow label="Autopay" status={autopayEnrolled} onEdit={onEditAutopayClick} />}
    {paperlessEligible && <SettingRow label="Paperless" status={paperlessEnrolled} onEdit={onEditPaperlessClick} />}
    <TermsAndButtons
      makeAPayementCTA={makeAPayementCTA}
      showMakeAPayment={showMakeAPayment}
      showMorePaymentOptions={showMorePaymentOptions}
      morePaymentOptionsCTA={morePaymentOptionsCTA}
      showPaymentsOptions={showPaymentsOptions} 
      onTermsClick={onTermsClick}
      onPayBalanceClick={onPayBalanceClick}
      onMoreOptionsClick={onMoreOptionsClick}
    />
  </PaySettings>
);

const CardIcon: React.FC<{cardType: CardType, size: number}> = ({ cardType, size = 50 }) => {
  const getIcon = () => {
    switch (cardType) {
      case 'visa':
        return <FaCcVisa size={size} style={{ color: '#1a1f71' }} />;
      case 'mastercard':
        return <FaCcMastercard size={size} style={{ color: '#ff5f00' }} />;
      case 'amex':
      case 'americanexpress':
        return <FaCcAmex size={size} style={{ color: '#2e77bc' }} />;
      case 'discover':
        return <FaCcDiscover size={size} style={{ color: '#ff6000' }} />;
      case 'paypal':
        return <FaPaypal size={size} style={{ color: '#003087' }} />;
      case 'bank':
        return <FaUniversity size={size} style={{ color: '#000' }} />;
      default:
        return <CreditCardIcon />;
    }
  };

  return getIcon()
};

/**
 * PaymentMethod Component.
 * Displays the last four digits of the card and an edit link.
 */
const PaymentMethod: React.FC<{ lastFour: string; cardType: CardType, onEdit?: () => void }> = ({ lastFour, cardType, onEdit }) => (
  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <CardIcon cardType={cardType} size={30} />
      <Typography variant="body1">•••• •••• •••• {lastFour}</Typography>
    </Box>
    <ActionLink onClick={onEdit} ariaLabel="Edit card details">
      Edit
    </ActionLink>
  </Box>
);

/**
 * SettingRow Component.
 * Displays a setting label and an edit link.
 */
const SettingRow: React.FC<{ label: string; status: boolean; onEdit?: () => void }> = ({ label, status, onEdit }) => (
  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {status ? (
        <CheckCircleIcon color="success" sx={{ fontSize: 18 }} />
      ) : (
        <CancelIcon color="error" sx={{ fontSize: 18, color: "grey.500" }} />
      )}
      <Typography variant="body1">{label}</Typography>
    </Box>
    <ActionLink onClick={onEdit} ariaLabel={`Edit ${label.toLowerCase()} settings`}>
      Edit
    </ActionLink>
  </Box>
);

/**
 * TermsAndButtons Component.
 * Displays terms and conditions text and action buttons.
 */
const TermsAndButtons: React.FC<{
  makeAPayementCTA: string
  showMakeAPayment: boolean,
  showMorePaymentOptions: boolean,
  morePaymentOptionsCTA: string,
  showPaymentsOptions: boolean
  onTermsClick?: () => void;
  onPayBalanceClick?: () => void;
  onMoreOptionsClick?: () => void;
}> = ({ makeAPayementCTA,
  showMakeAPayment,
  showMorePaymentOptions,
  morePaymentOptionsCTA,
  showPaymentsOptions, onTermsClick, onPayBalanceClick, onMoreOptionsClick }) => (
  showPaymentsOptions && <>
    <Typography variant="body2" color="textSecondary">
      By selecting Pay Balance Now, I agree to the Payment Authorization{" "}
      <ActionLink onClick={onTermsClick} ariaLabel="View terms and conditions">
        Terms & Conditions
      </ActionLink>
    </Typography>

    { showMakeAPayment && <ActionButton variant="contained" color="primary" onClick={onPayBalanceClick} aria-label="Pay balance now">
      {makeAPayementCTA}
    </ActionButton> }

    { showMorePaymentOptions && <ActionButton variant="outlined" onClick={onMoreOptionsClick} aria-label="View more payment options">
      {morePaymentOptionsCTA}
    </ActionButton> }
  </>
);

/**
 * StickerSheet Component.
 * Main component that combines balance info, payment settings, and alerts.
 */
export const StickerSheet = ({
  currentBalanceAmt,
  autopayScheduledDate,
  lastPaymentAmt,
  lastPaymentReceivedDate,
  cardNumber,
  autopayEligible = false,
  paperlessEligible = false,
  autopayEnrolled = false,
  paperlessEnrolled = false,
  makeAPayementCTA = "Pay Balance Now",
  showMakeAPayment = false,
  showMorePaymentOptions = false,
  morePaymentOptionsCTA = "More Payment Options",
  showPaymentsOptions = false,
  alertType = "success",
  alertMessage = "",
  className = "",
  borderRadius = 3,
  maxWidth = 375,
  backgroundColor = "#FFFFFF",
  alertSuccessColor = "#E7F4F0",
  alertErrorColor = "#D23627",
  currency = "$",
  billDetailsText = "Bill details",
  ...actions
}: StickerSheetProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <BaseCard className={className} customTheme={{ borderRadius, maxWidth, backgroundColor }}>
      {alertType && alertMessage && <AlertMessage alertType={alertType} alertMessage={alertMessage} isMobile={isMobile} alertSuccessColor={alertSuccessColor} alertErrorColor={alertErrorColor} />}
      
      <BalanceInfo
        currentBalanceAmt={currentBalanceAmt}
        autopayScheduledDate={autopayScheduledDate}
        lastPaymentAmt={lastPaymentAmt}
        lastPaymentReceivedDate={lastPaymentReceivedDate}
        onBillDetailsClick={actions.onBillDetailsClick}
        isMobile={isMobile}
        currency={currency}
        billDetailsText={billDetailsText} // Pass new prop
      />

      <DividerBox>
        <PaymentDivider />
      </DividerBox>

      <PaymentSettings
        makeAPayementCTA={makeAPayementCTA}
        showMakeAPayment={showMakeAPayment}
        showMorePaymentOptions={showMorePaymentOptions}
        morePaymentOptionsCTA={morePaymentOptionsCTA}
        showPaymentsOptions={showPaymentsOptions}
        cardNumber={cardNumber}
        autopayEligible={autopayEligible}
        paperlessEligible={paperlessEligible}
        autopayEnrolled={autopayEnrolled}
        paperlessEnrolled={paperlessEnrolled}
        {...actions}
      />
    </BaseCard>
  );
};
