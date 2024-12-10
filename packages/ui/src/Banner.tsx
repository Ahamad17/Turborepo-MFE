import { styled } from '@mui/material/styles';
import { Box, Typography, Select, MenuItem, SelectChangeEvent, FormControl, InputLabel } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CheckIcon from '@mui/icons-material/Check';
import { useEffect, useState } from 'react';

type Account = {
  id: string;
  type: string;
  number: string;
}

type PersonalizedBannerProps = {
  name: string;
  accounts: Account[];
  selectedAccount?: string;
  onAccountChange?: (accountId: string) => void;
}

const BannerContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  background: 'linear-gradient(90deg, #001C41 0%, #0046AA 100%)',
  padding: theme.spacing(3),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(3, 2),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(2),
  },
}));

const Greeting = styled(Typography)(({ theme }) => ({
  color: '#FFFFFF',
  fontSize: '24px',
  fontWeight: 500,
  [theme.breakpoints.down('sm')]: {
    fontSize: '20px',
  },
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: '240px',
  width: 'auto',
  [theme.breakpoints.between('sm', 'md')]: {
    width: '280px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const StyledInputLabel = styled(InputLabel)({
  color: 'rgba(255, 255, 255, 0.7)',
  '&.Mui-focused': {
    color: '#FFFFFF',
  },
  '&.MuiInputLabel-shrink': {
    color: '#FFFFFF',
  },
});

const StyledSelect = styled(Select<string>)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  color: '#FFFFFF',
  '& .MuiSelect-select': {
    padding: theme.spacing(1.5, 4, 1.5, 2),
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(255, 255, 255, 0.3)',
    legend: {
      '& span': {
        color: '#FFFFFF',
      },
    },
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#FFFFFF',
  },
  '& .MuiSelect-icon': {
    color: '#FFFFFF',
  },
}));

const AccountMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '&.Mui-selected': {
    backgroundColor: 'rgba(0, 70, 170, 0.08)',
  },
}));

const AccountInfo = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const AccountType = styled(Typography)({
  fontSize: '14px',
  fontWeight: 500,
});

const AccountNumber = styled(Typography)({
  fontSize: '12px',
  color: 'rgba(0, 0, 0, 0.6)',
});

export const PersonalizedBanner: React.FC<PersonalizedBannerProps> = ({
  name,
  accounts,
  selectedAccount,
  onAccountChange,
}) => {
  const [currentAccount, setCurrentAccount] = useState(selectedAccount);

  useEffect(() => {
    setCurrentAccount(selectedAccount);
  }, [selectedAccount]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const newValue = event.target.value as string;
    setCurrentAccount(newValue);
    onAccountChange?.(newValue);
  };

  const currentAccountDetails = accounts.find(acc => acc.id === currentAccount);

  return (
    <BannerContainer>
      <Greeting variant="h1">Hello, {name}</Greeting>
      <StyledFormControl>
        <StyledInputLabel id="account-select-label">Selected account</StyledInputLabel>
        <StyledSelect
          labelId="account-select-label"
          id="account-select"
          value={currentAccount || ''}
          onChange={handleChange}
          IconComponent={KeyboardArrowDownIcon}
          label="Selected account"
          renderValue={() => currentAccountDetails?.number || ''}
        >
          {accounts.map((account) => (
            <AccountMenuItem 
              key={account.id} 
              value={account.id}
              selected={account.id === currentAccount}
            >
              <AccountInfo>
                <AccountType>{account.type}</AccountType>
                <AccountNumber>{account.number}</AccountNumber>
              </AccountInfo>
              {account.id === currentAccount && (
                <CheckIcon sx={{ ml: 2, color: '#0046AA' }} />
              )}
            </AccountMenuItem>
          ))}
        </StyledSelect>
      </StyledFormControl>
    </BannerContainer>
  );
};
