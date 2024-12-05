import React from "react";
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
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const BaseCard = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: "400px",
  backgroundColor: "#FFFFFF",
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[1],
  margin: "0 auto",
}));

const Alert = styled(Box)<{ type: "success" | "error" }>(({ theme, type }) => ({
  backgroundColor: type === "success" ? "#E7F4F0" : "#D23627",
  color: type === "success" ? "primary" : "#FFFFFF",
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

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

const PaySettings = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

const DiviverBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  paddingTop: 0,
  paddingBottom: 0,
}));

const PaymentDivider = styled(Divider)(({ theme }) => ({
  height: 2,
  backgroundColor: theme.palette.divider,
}));

const ActionButton = styled(Button)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(1),
  borderRadius: theme.spacing(5),
  textTransform: "none",
  boxShadow: "none",
}));

interface PaymentCardProps {
  currentBalance: number;
  autopayDate: string;
  lastPaymentAmount: number;
  lastPaymentDate: string;
  cardLastFour: string;
  cardType: string;
  isAutopayEnabled: boolean;
  isPaperlessEnabled: boolean;
  alert?: {
    type: "success" | "error";
    message: string;
  };
  // Callbacks
  onBillDetailsClick: () => void;
  onEditCardClick: () => void;
  onEditAutopayClick: () => void;
  onEditPaperlessClick: () => void;
  onTermsClick: () => void;
  onPayBalanceClick: () => void;
  onMoreOptionsClick: () => void;
}

const PaymentCard: React.FC<PaymentCardProps> = ({
  currentBalance,
  autopayDate,
  lastPaymentAmount,
  lastPaymentDate,
  cardLastFour,
  cardType,
  isAutopayEnabled,
  isPaperlessEnabled,
  alert,
  onBillDetailsClick,
  onEditCardClick,
  onEditAutopayClick,
  onEditPaperlessClick,
  onTermsClick,
  onPayBalanceClick,
  onMoreOptionsClick,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <BaseCard>
      {alert && (
        <Alert type={alert.type}>
          {alert.type === 'success' && <CheckCircleIcon color="success" />}
          {alert.type === 'error' && <ErrorOutlineIcon />}
          <Typography variant={isMobile ? "body2" : "body1"}>
            {alert.message}
          </Typography>
        </Alert>
      )}

      <BalanceSection>
        <Typography variant="body2" color="textSecondary">
          Current balance
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            my: 0.5,
          }}
        >
          <Typography variant={isMobile ? "h5" : "h3"}>
            ${currentBalance.toFixed(2)}
          </Typography>
          <StyledLink href="#" onClick={(e) => {
            e.preventDefault();
            onBillDetailsClick();
          }}>
            Bill details
          </StyledLink>
        </Box>

        <Typography variant="body2" sx={{ mb: 2.5, fontSize: 16 }}>
          Autopay scheduled for {autopayDate}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Last payment of ${lastPaymentAmount.toFixed(2)} was received
          on {lastPaymentDate}
        </Typography>
      </BalanceSection>

      <DiviverBox>
        <PaymentDivider />
      </DiviverBox>
      
      <PaySettings>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CreditCardIcon />
            <Typography variant="body1">
              •••• •••• •••• {cardLastFour}
            </Typography>
          </Box>
          <StyledLink href="#" onClick={(e) => {
            e.preventDefault();
            onEditCardClick();
          }}>
            Edit
          </StyledLink>
        </Box>

        {isAutopayEnabled && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CheckCircleIcon color="success" sx={{ fontSize: 18 }} />
              <Typography variant="body1">Autopay</Typography>
            </Box>
            <StyledLink href="#" onClick={(e) => {
              e.preventDefault();
              onEditAutopayClick();
            }}>
              Edit
            </StyledLink>
          </Box>
        )}

        {isPaperlessEnabled && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CheckCircleIcon color="success" sx={{ fontSize: 18 }} />
              <Typography variant="body1">Paperless</Typography>
            </Box>
            <StyledLink href="#" onClick={(e) => {
              e.preventDefault();
              onEditPaperlessClick();
            }}>
              Edit
            </StyledLink>
          </Box>
        )}

        <Typography variant="body2" color="textSecondary">
          By selecting Pay Balance Now, I agree to the Payment Authorization{" "}
          <Link href="#" onClick={(e) => {
            e.preventDefault();
            onTermsClick();
          }}>
            Terms & Conditions
          </Link>
          .
        </Typography>

        <ActionButton 
          variant="contained" 
          color="primary"
          onClick={onPayBalanceClick}
        >
          Pay balance now
        </ActionButton>

        <ActionButton 
          variant="outlined"
          onClick={onMoreOptionsClick}
        >
          More payment options
        </ActionButton>
      </PaySettings>
    </BaseCard>
  );
};

export default PaymentCard;