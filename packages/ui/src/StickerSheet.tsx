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
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

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
type CardType = "visa" | "mastercard" | "amex" | "discover";

/**
 * Props for the alert box.
 * @property {AlertType} type - The type of the alert.
 * @property {string} message - The message to be displayed in the alert.
 */
type AlertProps = {
  type: AlertType;
  message: string;
};

/**
 * Theme configuration for the StickerSheet component.
 * - `borderRadius`: Border radius of the card.
 * - `maxWidth`: Maximum width of the card.
 * - `backgroundColor`: Background color of the card.
 * - `alertColors`: Custom colors for alerts.
 */
type StickerSheetTheme = {
  borderRadius?: number;
  maxWidth?: number;
  backgroundColor?: string;
  alertColors?: {
    success: string;
    error: string;
  };
};

/**
 * Base props for the StickerSheet component.
 * Includes payment-related data and configuration flags.
 */
type StickerSheetBaseProps = {
  currentBalance: number;
  autopayDate: string;
  lastPaymentAmount: number;
  lastPaymentDate: string;
  cardLastFour: string;
  cardType: CardType;
  isAutopayEnabled: boolean;
  isPaperlessEnabled: boolean;
  alert?: AlertProps;
  className?: string;
  theme?: StickerSheetTheme;
  currency?: string; // New property for currency
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
const BaseCard = styled(Card)<{ customTheme?: StickerSheetTheme }>(({ theme, customTheme }) => ({
  width: "100%",
  maxWidth: customTheme?.maxWidth || "400px",
  backgroundColor: customTheme?.backgroundColor || "#FFFFFF",
  borderRadius: theme.spacing(customTheme?.borderRadius || 2),
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
      ? customColors?.success || "#E7F4F0" 
      : customColors?.error || "#D23627",
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
  height: 2,
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
const AlertMessage: React.FC<{ alert: AlertProps; isMobile: boolean }> = ({ alert, isMobile }) => (
  <Alert type={alert.type}>
    {alert.type === "success" && <CheckCircleIcon color="success" />}
    {alert.type === "error" && <ErrorOutlineIcon />}
    <Typography variant={isMobile ? "body2" : "body1"}>{alert.message}</Typography>
  </Alert>
);

/**
 * BalanceInfo Component.
 * Displays the current balance, autopay date, and last payment information.
 */
const BalanceInfo: React.FC<{
  currentBalance: number;
  autopayDate: string;
  lastPaymentAmount: number;
  lastPaymentDate: string;
  onBillDetailsClick?: () => void;
  isMobile: boolean;
  currency?: string;
}> = ({
  currentBalance,
  autopayDate,
  lastPaymentAmount,
  lastPaymentDate,
  onBillDetailsClick,
  isMobile,
  currency = "$",
}) => (
  <BalanceSection>
    <Typography variant="body2" color="textSecondary">
      Current balance
    </Typography>

    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 0.5 }}>
      <Typography variant={isMobile ? "h5" : "h3"}>
        {currency}{currentBalance.toFixed(2)}
      </Typography>
      <StyledLink href="#" onClick={(e) => {
        e.preventDefault();
        onBillDetailsClick?.();
      }}>
        Bill details
      </StyledLink>
    </Box>

    <Typography variant="body2" sx={{ mb: 2.5, fontSize: 16 }}>
      Autopay scheduled for {autopayDate}
    </Typography>
    <Typography variant="body2" color="textSecondary">
      Last payment of {currency}{lastPaymentAmount.toFixed(2)} was received on {lastPaymentDate}
    </Typography>
  </BalanceSection>
);

/**
 * PaymentSettings Component.
 * Displays payment method, autopay, and paperless settings.
 */
const PaymentSettings: React.FC<{
  cardLastFour: string;
  isAutopayEnabled: boolean;
  isPaperlessEnabled: boolean;
  onEditCardClick?: () => void;
  onEditAutopayClick?: () => void;
  onEditPaperlessClick?: () => void;
  onTermsClick?: () => void;
  onPayBalanceClick?: () => void;
  onMoreOptionsClick?: () => void;
}> = ({
  cardLastFour,
  isAutopayEnabled,
  isPaperlessEnabled,
  onEditCardClick,
  onEditAutopayClick,
  onEditPaperlessClick,
  onTermsClick,
  onPayBalanceClick,
  onMoreOptionsClick,
}) => (
  <PaySettings>
    <PaymentMethod lastFour={cardLastFour} onEdit={onEditCardClick} />
    {isAutopayEnabled && <SettingRow label="Autopay" onEdit={onEditAutopayClick} />}
    {isPaperlessEnabled && <SettingRow label="Paperless" onEdit={onEditPaperlessClick} />}
    <TermsAndButtons 
      onTermsClick={onTermsClick}
      onPayBalanceClick={onPayBalanceClick}
      onMoreOptionsClick={onMoreOptionsClick}
    />
  </PaySettings>
);

/**
 * PaymentMethod Component.
 * Displays the last four digits of the card and an edit link.
 */
const PaymentMethod: React.FC<{ lastFour: string; onEdit?: () => void }> = ({ lastFour, onEdit }) => (
  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <CreditCardIcon />
      <Typography variant="body1">•••• •••• •••• {lastFour}</Typography>
    </Box>
    <EditLink onClick={onEdit} />
  </Box>
);

/**
 * SettingRow Component.
 * Displays a setting label and an edit link.
 */
const SettingRow: React.FC<{ label: string; onEdit?: () => void }> = ({ label, onEdit }) => (
  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <CheckCircleIcon color="success" sx={{ fontSize: 18 }} />
      <Typography variant="body1">{label}</Typography>
    </Box>
    <EditLink onClick={onEdit} />
  </Box>
);

/**
 * EditLink Component.
 * Displays an edit link that triggers the provided onClick handler.
 */
const EditLink: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <StyledLink href="#" onClick={(e) => {
    e.preventDefault();
    onClick?.();
  }}>
    Edit
  </StyledLink>
);

/**
 * TermsAndButtons Component.
 * Displays terms and conditions text and action buttons.
 */
const TermsAndButtons: React.FC<{
  onTermsClick?: () => void;
  onPayBalanceClick?: () => void;
  onMoreOptionsClick?: () => void;
}> = ({ onTermsClick, onPayBalanceClick, onMoreOptionsClick }) => (
  <>
    <Typography variant="body2" color="textSecondary">
      By selecting Pay Balance Now, I agree to the Payment Authorization{" "}
      <Link href="#" onClick={(e) => {
        e.preventDefault();
        onTermsClick?.();
      }}>
        Terms & Conditions
      </Link>
    </Typography>

    <ActionButton variant="contained" color="primary" onClick={onPayBalanceClick}>
      Pay balance now
    </ActionButton>

    <ActionButton variant="outlined" onClick={onMoreOptionsClick}>
      More payment options
    </ActionButton>
  </>
);

/**
 * StickerSheet Component.
 * Main component that combines balance info, payment settings, and alerts.
 */
export const StickerSheet: React.FC<StickerSheetProps> = ({
  currentBalance,
  autopayDate,
  lastPaymentAmount,
  lastPaymentDate,
  cardLastFour,
  isAutopayEnabled,
  isPaperlessEnabled,
  alert,
  className,
  theme: customTheme,
  currency,
  ...actions
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <BaseCard className={className} customTheme={customTheme}>
      {alert && <AlertMessage alert={alert} isMobile={isMobile} />}
      
      <BalanceInfo
        currentBalance={currentBalance}
        autopayDate={autopayDate}
        lastPaymentAmount={lastPaymentAmount}
        lastPaymentDate={lastPaymentDate}
        onBillDetailsClick={actions.onBillDetailsClick}
        isMobile={isMobile}
        currency={currency}
      />

      <DividerBox>
        <PaymentDivider />
      </DividerBox>

      <PaymentSettings
        cardLastFour={cardLastFour}
        isAutopayEnabled={isAutopayEnabled}
        isPaperlessEnabled={isPaperlessEnabled}
        {...actions}
      />
    </BaseCard>
  );
};

/**
 * useStickerSheetActions Hook.
 * Provides default implementations for StickerSheet action handlers.
 */
export const useStickerSheetActions = (handlers?: Partial<StickerSheetActions>): StickerSheetActions => ({
  onBillDetailsClick: () => handlers?.onBillDetailsClick?.(),
  onEditCardClick: () => handlers?.onEditCardClick?.(),
  onEditAutopayClick: () => handlers?.onEditAutopayClick?.(),
  onEditPaperlessClick: () => handlers?.onEditPaperlessClick?.(),
  onTermsClick: () => handlers?.onTermsClick?.(),
  onPayBalanceClick: () => handlers?.onPayBalanceClick?.(),
  onMoreOptionsClick: () => handlers?.onMoreOptionsClick?.()
});

export default StickerSheet;