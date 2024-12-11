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

type AlertType = "success" | "error";

type CardType = 'visa' | 'mastercard' | 'amex' | 'americanexpress' | 'discover' | 'paypal' | 'bank';

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
  editCardText?: string;
  editAutopayText?: string;
  editPaperlessText?: string;
};

type StickerSheetActions = {
  onBillDetailsClick?: () => void;
  onEditCardClick?: () => void;
  onEditAutopayClick?: () => void;
  onEditPaperlessClick?: () => void;
  onTermsClick?: () => void;
  onPayBalanceClick?: () => void;
  onMoreOptionsClick?: () => void;
};

type StickerSheetProps = StickerSheetBaseProps & StickerSheetActions;

const BaseCard = styled(Card)<{ customTheme: { borderRadius: number; maxWidth: number; backgroundColor: string } }>(({ theme, customTheme }) => ({
  width: "100%",
  maxWidth: customTheme?.maxWidth,
  backgroundColor: customTheme?.backgroundColor,
  borderRadius: theme.spacing(customTheme?.borderRadius),
  boxShadow: theme.shadows[1],
  margin: "0 auto",
}));

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

const BalanceSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

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

const PaySettings = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

const DividerBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  paddingTop: 0,
  paddingBottom: 0,
}));

const PaymentDivider = styled(Divider)(({ theme }) => ({
  height: 1,
  backgroundColor: theme.palette.divider,
}));

const ActionButton = styled(Button)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(1),
  borderRadius: theme.spacing(5),
  textTransform: "none",
  boxShadow: "none",
}));

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

export const StickerSheet = ({
  currentBalanceAmt,
  autopayScheduledDate,
  lastPaymentAmt,
  lastPaymentReceivedDate,
  cardNumber,
  cardType,
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
  editCardText = "Edit",
  editAutopayText = "Edit",
  editPaperlessText = "Edit",
  ...actions
}: StickerSheetProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <BaseCard className={className} customTheme={{ borderRadius, maxWidth, backgroundColor }}>
      {alertType && alertMessage && (
        <Alert type={alertType} customColors={{ success: alertSuccessColor, error: alertErrorColor }}>
          {alertType === "success" && <CheckCircleIcon color="success" />}
          {alertType === "error" && <ErrorIcon />}
          <Typography variant={isMobile ? "body2" : "body1"}>{alertMessage}</Typography>
        </Alert>
      )}
      
      <BalanceSection>
        <Typography variant="body2" color="textSecondary">
          Current balance
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 0.5 }}>
          <Typography variant={isMobile ? "h5" : "h3"}>
            {currency}{currentBalanceAmt.toFixed(2)}
          </Typography>
          <ActionLink onClick={actions.onBillDetailsClick} ariaLabel="View bill details">
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

      <DividerBox>
        <PaymentDivider />
      </DividerBox>

      <PaySettings>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CardIcon cardType={cardType} size={30} />
            <Typography variant="body1">•••• •••• •••• {cardNumber}</Typography>
          </Box>
          <ActionLink onClick={actions.onEditCardClick} ariaLabel="Edit card details">
            {editCardText}
          </ActionLink>
        </Box>
        {autopayEligible && (
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {autopayEnrolled ? (
                <CheckCircleIcon color="success" sx={{ fontSize: 18 }} />
              ) : (
                <CancelIcon color="error" sx={{ fontSize: 18, color: "grey.500" }} />
              )}
              <Typography variant="body1">Autopay</Typography>
            </Box>
            <ActionLink onClick={actions.onEditAutopayClick} ariaLabel="Edit autopay settings">
              {editAutopayText}
            </ActionLink>
          </Box>
        )}
        {paperlessEligible && (
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {paperlessEnrolled ? (
                <CheckCircleIcon color="success" sx={{ fontSize: 18 }} />
              ) : (
                <CancelIcon color="error" sx={{ fontSize: 18, color: "grey.500" }} />
              )}
              <Typography variant="body1">Paperless</Typography>
            </Box>
            <ActionLink onClick={actions.onEditPaperlessClick} ariaLabel="Edit paperless settings">
              {editPaperlessText}
            </ActionLink>
          </Box>
        )}
        {showPaymentsOptions && (
          <>
            <Typography variant="body2" color="textSecondary">
              By selecting Pay Balance Now, I agree to the Payment Authorization{" "}
              <ActionLink onClick={actions.onTermsClick} ariaLabel="View terms and conditions">
                Terms & Conditions
              </ActionLink>
            </Typography>

            {showMakeAPayment && (
              <ActionButton variant="contained" color="primary" onClick={actions.onPayBalanceClick} aria-label="Pay balance now">
                {makeAPayementCTA}
              </ActionButton>
            )}

            {showMorePaymentOptions && (
              <ActionButton variant="outlined" onClick={actions.onMoreOptionsClick} aria-label="View more payment options">
                {morePaymentOptionsCTA}
              </ActionButton>
            )}
          </>
        )}
      </PaySettings>
    </BaseCard>
  );
};
