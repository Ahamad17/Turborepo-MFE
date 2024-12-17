'use client'

import { styled } from '@mui/material/styles';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  alpha
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CheckIcon from '@mui/icons-material/Check';
import { useState, useEffect } from 'react';
import content from './content.json';

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
  color: theme.palette.common.white,
  fontSize: '24px',
  fontWeight: 500,
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '20px',
  },
}));

const AccountDisplay = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: '16px',
  display: 'flex',
  alignItems: 'center',
  '&::before': {
    content: '"Account: "',
    marginRight: theme.spacing(1),
    opacity: 0.7,
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

const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  color: alpha(theme.palette.common.white, 0.7),
  
  '&.Mui-focused': {
    color: theme.palette.common.white,
  },
  '&.MuiInputLabel-shrink': {
    color: theme.palette.common.white,
  },
}));

const StyledSelect = styled(Select<string>)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  color: theme.palette.common.white,
  
  '& .MuiSelect-select': {
    padding: theme.spacing(1.5, 4, 1.5, 2),
  },
  
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: alpha(theme.palette.common.white, 0.3),
    legend: {
      '& span': {
        color: theme.palette.common.white,
      },
    },
  },
  
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: alpha(theme.palette.common.white, 0.5),
  },
  
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.common.white,
  },
  
  '& .MuiSelect-icon': {
    color: theme.palette.common.white,
  },
}));

const AccountMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  
  '&.Mui-selected': {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
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

export const PersonalizedBanner = ({
  name,
  accounts,
  selectedAccount,
  onAccountChange,
}: PersonalizedBannerProps) => {
  const [currentAccount, setCurrentAccount] = useState(selectedAccount);

  useEffect(() => {
    setCurrentAccount(selectedAccount);
  }, [selectedAccount]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const newValue = event.target.value;
    setCurrentAccount(newValue);
    onAccountChange?.(newValue);
  };

  const currentAccountDetails = accounts.find(acc => acc.id === currentAccount) || accounts[0];

  return (
    <BannerContainer>
      <Greeting variant="h1">{content.personalizedBanner.greeting}, {name}</Greeting>
      {accounts.length === 1 ? (
        <AccountDisplay>{currentAccountDetails?.number}</AccountDisplay>
      ) : (
        <StyledFormControl>
          <StyledInputLabel id="account-select-label">{content.personalizedBanner.selectedAccountLabel}</StyledInputLabel>
          <StyledSelect
            labelId="account-select-label"
            id="account-select"
            value={currentAccount || ''}
            onChange={handleChange}
            IconComponent={KeyboardArrowDownIcon}
            label={content.personalizedBanner.selectedAccountLabel}
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
                  <CheckIcon sx={{ ml: 2, color: 'primary.main' }} />
                )}
              </AccountMenuItem>
            ))}
          </StyledSelect>
        </StyledFormControl>
      )}
    </BannerContainer>
  );
};
