import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Typography,
  Button,
  Card,
  Link,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CreditCardIcon from '@mui/icons-material/CreditCard';

// Constants for breakpoints
const BREAKPOINTS = {
  TABLET: 523,  // Max tablet width from design
  MOBILE: 375,  // Typical mobile width
};

// Styled Components with responsive design
const BaseCard = styled(Card)(({ theme }) => ({
  width: '373px', // Desktop default
  backgroundColor: '#FFFFFF',
  borderRadius: theme.spacing(1),
  overflow: 'visible',

  [theme.breakpoints.down(BREAKPOINTS.TABLET)]: {
    width: '100%',
    maxWidth: '523px',
  },

  [theme.breakpoints.down(BREAKPOINTS.MOBILE)]: {
    width: '100%',
    margin: '0 auto',
  },
}));

const Alert = styled(Box)<{ type: 'success' | 'error' }>(({ theme, type }) => ({
  backgroundColor: type === 'success' ? '#E7F4F0' : '#FEE7E7',
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const BalanceSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.down(BREAKPOINTS.MOBILE)]: {
    padding: theme.spacing(2),
  },
}));

const PaySettings = styled(Box)(({ theme }) => ({
  borderTop: '1px solid #D8D8D8',
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  
  [theme.breakpoints.down(BREAKPOINTS.MOBILE)]: {
    padding: theme.spacing(2),
  },
}));

const ActionButton = styled(Button)(({ theme, variant }) => ({
  width: '100%',
  padding: theme.spacing(1.5),
  borderRadius: theme.spacing(0.5),
  textTransform: 'none',
  ...(variant === 'contained' && {
    backgroundColor: '#0A2742',
    '&:hover': {
      backgroundColor: '#0A2742',
    },
  }),
}));

// Main Component with responsive layout
const PaymentCard: React.FC<{
  balance: {
    amount: number;
    autopayDate: string;
    lastPayment: {
      amount: number;
      date: string;
    };
  };
  settings: {
    creditCard: {
      type: string;
      lastFour: string;
    };
    autopayEnabled: boolean;
    paperlessEnabled: boolean;
  };
  alert?: {
    type: 'success' | 'error';
    message: string;
  };
}> = ({ balance, settings, alert }) => {
  const theme = useTheme();
  const isTablet = useMediaQuery(`(max-width:${BREAKPOINTS.TABLET}px)`);
  const isMobile = useMediaQuery(`(max-width:${BREAKPOINTS.MOBILE}px)`);

  return (
    <BaseCard>
      {alert && (
        <Alert type={alert.type}>
          <CheckCircleIcon color={alert.type === 'success' ? 'success' : 'error'} />
          <Typography variant={isMobile ? 'body2' : 'body1'}>{alert.message}</Typography>
        </Alert>
      )}

      <BalanceSection>
        <Typography 
          variant={isMobile ? 'body2' : 'subtitle1'} 
          color="textSecondary"
        >
          Current balance
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          my: isMobile ? 1 : 2 
        }}>
          <Typography 
            variant={isMobile ? 'h5' : 'h4'} 
            component="div" 
            sx={{ fontWeight: 'bold' }}
          >
            ${balance.amount.toFixed(2)}
          </Typography>
          <Link href="#" color="primary">
            Bill details
          </Link>
        </Box>

        <Typography variant={isMobile ? 'body2' : 'body1'} sx={{ mb: 1 }}>
          Autopay scheduled for {balance.autopayDate}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="textSecondary"
          sx={{ 
            wordBreak: isMobile ? 'break-word' : 'normal',
            mb: 2 
          }}
        >
          Last payment of ${balance.lastPayment.amount.toFixed(2)} was received on{' '}
          {balance.lastPayment.date}
        </Typography>
      </BalanceSection>

      <PaySettings>
        {/* Payment Settings - Credit Card */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: isMobile ? 'wrap' : 'nowrap'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CreditCardIcon />
            <Typography variant={isMobile ? 'body2' : 'body1'}>
              •••• •••• •••• {settings.creditCard.lastFour}
            </Typography>
          </Box>
          <Link href="#" color="primary">Edit</Link>
        </Box>

        {/* Autopay Setting */}
        {settings.autopayEnabled && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckCircleIcon color="success" />
              <Typography variant={isMobile ? 'body2' : 'body1'}>Autopay</Typography>
            </Box>
            <Link href="#" color="primary">Edit</Link>
          </Box>
        )}

        {/* Paperless Setting */}
        {settings.paperlessEnabled && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckCircleIcon color="success" />
              <Typography variant={isMobile ? 'body2' : 'body1'}>Paperless</Typography>
            </Box>
            <Link href="#" color="primary">Edit</Link>
          </Box>
        )}

        <Typography variant="body2" color="textSecondary">
          By selecting Pay Balance Now, I agree to the Payment Authorization{' '}
          <Link href="#" color="primary">Terms & Conditions</Link>.
        </Typography>

        <ActionButton variant="contained">
          Pay balance now
        </ActionButton>

        <ActionButton variant="outlined">
          More payment options
        </ActionButton>
      </PaySettings>
    </BaseCard>
  );
};

export default PaymentCard;