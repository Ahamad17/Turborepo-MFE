'use client'
import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Switch,
  Button,
  Typography,
  Box,
  styled,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  FormControl,
  SelectChangeEvent,
} from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';
import AddIcon from '@mui/icons-material/Add';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface BaseDetails {
  autopayEnabled: boolean;
  autopayDate?: string;
  termsAccepted: boolean;
}

interface BankDetails extends BaseDetails {
  type: 'bank';
  accountNumber: string;
  routingNumber: string;
}

interface CardDetails extends BaseDetails {
  type: 'card';
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  zipcode: string;
}

type PaymentDetails = BankDetails | CardDetails;

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  '&:before': {
    display: 'none',
  }
}));

const StyledAccordionSummary = styled(AccordionSummary)({
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper': {
    marginRight: '12px',
    marginLeft: '0',
    '& .MuiSvgIcon-root': {
      padding: '2px',
      border: '1px solid rgba(0, 0, 0, 0.23)',
      borderRadius: '4px',
    }
  },
});

const StyledButton = styled(Button)(() => ({
  borderRadius: '20px',
  padding: '8px 16px',
  textTransform: 'none',
}));

const PaymentMethodForm: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [bankDetails, setBankDetails] = useState<BankDetails>({
    type: 'bank',
    accountNumber: '',
    routingNumber: '',
    autopayEnabled: false,
    autopayDate: '15th of every month',
    termsAccepted: false,
  });
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    type: 'card',
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    zipcode: '',
    autopayEnabled: false,
    autopayDate: '15th of every month',
    termsAccepted: false,
  });

  const handleAccordionChange = (panel: string) => (
    _event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleBankDetailsChange = (field: keyof Omit<BankDetails, 'type'>) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBankDetails({
      ...bankDetails,
      [field]: field === 'autopayEnabled' || field === 'termsAccepted' 
        ? event.target.checked 
        : event.target.value,
    });
  };

  const handleCardDetailsChange = (field: keyof Omit<CardDetails, 'type'>) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCardDetails({
      ...cardDetails,
      [field]: field === 'autopayEnabled' || field === 'termsAccepted' 
        ? event.target.checked 
        : event.target.value,
    });
  };

  const handleAutopayDateChange = (type: 'bank' | 'card') => (event: SelectChangeEvent) => {
    if (type === 'bank') {
      setBankDetails({ ...bankDetails, autopayDate: event.target.value });
    } else {
      setCardDetails({ ...cardDetails, autopayDate: event.target.value });
    }
  };

  const AutopaySection = ({ details, onDetailsChange, onDateChange }: { 
    details: PaymentDetails;
    onDetailsChange: (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => void;
    onDateChange: (event: SelectChangeEvent) => void;
  }) => (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        mb: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SyncIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
          <Typography>Enroll in autopay</Typography>
        </Box>
        <Switch
          checked={details.autopayEnabled}
          onChange={onDetailsChange('autopayEnabled')}
        />
      </Box>
      
      {details.autopayEnabled && (
        <>
          <Typography sx={{ mb: 1, color: 'text.secondary' }}>
            Automatically process monthly payments with this account
          </Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <Select
              value={details.autopayDate}
              onChange={onDateChange}
              displayEmpty
              sx={{ borderRadius: 1 }}
            >
              <MenuItem value="15th of every month">15th of every month</MenuItem>
              <MenuItem value="1st of every month">1st of every month</MenuItem>
              <MenuItem value="30th of every month">30th of every month</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox 
                checked={details.termsAccepted}
                onChange={onDetailsChange('termsAccepted')}
              />
            }
            label={
              <Typography variant="body2">
                I agree to the <Box component="span" sx={{ color: 'primary.main' }}>terms and conditions</Box>
              </Typography>
            }
          />
        </>
      )}
    </Box>
  );

  const BankForm = () => (
    <form>
      <TextField
        label="Account number"
        variant="outlined"
        required
        value={bankDetails.accountNumber}
        onChange={handleBankDetailsChange('accountNumber')}
        sx={{ mb: 2, width: '100%' }}
      />
      <TextField
        label="Routing number"
        variant="outlined"
        required
        value={bankDetails.routingNumber}
        onChange={handleBankDetailsChange('routingNumber')}
        sx={{ mb: 2, width: '100%' }}
      />
      
      <AutopaySection 
        details={bankDetails}
        onDetailsChange={handleBankDetailsChange}
        onDateChange={handleAutopayDateChange('bank')}
      />

      <StyledButton
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mb: 1 }}
      >
        Add payment method
      </StyledButton>
      <StyledButton
        variant="text"
        onClick={() => setExpanded(false)}
        fullWidth
        sx={{ color: 'text.primary' }}
      >
        Cancel
      </StyledButton>
    </form>
  );

  const CardForm = () => (
    <form>
      <TextField
        label="Cardholder name"
        variant="outlined"
        required
        value={cardDetails.cardholderName}
        onChange={handleCardDetailsChange('cardholderName')}
        sx={{ mb: 2, width: '100%' }}
      />
      <TextField
        label="Credit card number"
        variant="outlined"
        required
        value={cardDetails.cardNumber}
        onChange={handleCardDetailsChange('cardNumber')}
        InputProps={{
          endAdornment: (
            <VisibilityOffIcon sx={{ color: 'text.secondary', cursor: 'pointer' }} />
          ),
        }}
        sx={{ mb: 2, width: '100%' }}
      />
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Exp date"
          variant="outlined"
          required
          value={cardDetails.expiryDate}
          onChange={handleCardDetailsChange('expiryDate')}
          sx={{ flex: 1 }}
          select
        >
          <MenuItem value="08/25">08/25</MenuItem>
          <MenuItem value="09/25">09/25</MenuItem>
        </TextField>
        <TextField
          label="CVV"
          variant="outlined"
          required
          value={cardDetails.cvv}
          onChange={handleCardDetailsChange('cvv')}
          sx={{ flex: 1 }}
        />
      </Box>
      <TextField
        label="Zipcode"
        variant="outlined"
        required
        value={cardDetails.zipcode}
        onChange={handleCardDetailsChange('zipcode')}
        sx={{ mb: 2, width: '100%' }}
      />

      <AutopaySection 
        details={cardDetails}
        onDetailsChange={handleCardDetailsChange}
        onDateChange={handleAutopayDateChange('card')}
      />

      <StyledButton
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mb: 1 }}
      >
        Add payment method
      </StyledButton>
      <StyledButton
        variant="text"
        onClick={() => setExpanded(false)}
        fullWidth
        sx={{ color: 'text.primary' }}
      >
        Cancel
      </StyledButton>
    </form>
  );

  return (
    <Box sx={{ 
      maxWidth: 600, 
      width: '100%', 
      margin: '0 auto', 
      padding: 2 
    }}>
      <Typography sx={{ mb: 2, color: 'text.secondary' }}>
        You can edit your current payment method, or add a new one below.
      </Typography>
      
      <Typography 
        variant="subtitle1" 
        sx={{ 
          mb: 2, 
          fontWeight: 500,
          color: 'text.primary'
        }}
      >
        Add a new payment method
      </Typography>

      <StyledAccordion
        expanded={expanded === 'bank'}
        onChange={handleAccordionChange('bank')}
      >
        <StyledAccordionSummary
          expandIcon={<AddIcon />}
        >
          <Typography>Bank account</Typography>
        </StyledAccordionSummary>
        <AccordionDetails>
          <BankForm />
        </AccordionDetails>
      </StyledAccordion>

      <StyledAccordion
        expanded={expanded === 'card'}
        onChange={handleAccordionChange('card')}
      >
        <StyledAccordionSummary
          expandIcon={<AddIcon />}
        >
          <Typography>Credit/Debit card</Typography>
        </StyledAccordionSummary>
        <AccordionDetails>
          <CardForm />
        </AccordionDetails>
      </StyledAccordion>
    </Box>
  );
};

export default PaymentMethodForm;