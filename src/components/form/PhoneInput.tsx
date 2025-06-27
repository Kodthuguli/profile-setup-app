import { Controller } from 'react-hook-form';
import { Box, Typography } from '@mui/material';
import MuiPhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import { styled } from '@mui/material/styles';

interface PhoneInputProps {
  name: string;
  control: any;
  label: string;
  rules?: any;
  placeholder?: string;
  disabled?: boolean;
}

const StyledPhoneWrapper = styled(Box)(() => ({
  '& .selected-flag': {
    width: '38px',
    height: '120%',
    '& .flag': {
      backgroundImage: 'none !important',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingRight: '8px',
      pointerEvents: 'none',
    },
    '& .flag::after': {
      content: '"˅"',
      fontSize: '12px',
      color: '#222',
      marginLeft: '8px',
    },
  },
  '& .open': {
    '& .flag::after': {
      content: '"˄"',
      fontSize: '12px',
      color: '#222',
      marginLeft: '8px',
    },
  },
  '& .country-list': {
    '& .search': {
      display: 'none',
    },
  },
  '& .selected-flag .arrow': {
    display: 'none !important',
  },
}));

const PhoneInput = ({
  name,
  control,
  label,
  rules,
  placeholder = '',
  disabled = false,
}: PhoneInputProps) => {
  const isRequired = rules?.required !== undefined;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        const hasValue = Boolean(value);
        const hasError = Boolean(error);

        return (
          <StyledPhoneWrapper className="phone-input-container">
            {/* Label with optional red star */}
            <Typography
              variant="subtitle2"
              fontWeight={500}
              sx={{
                mb: 0.5,
                color: hasError ? 'error.main' : '#000000',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {label}
              {isRequired && (
                <Typography
                  component="span"
                  color="error.main"
                  ml={0.5}
                  fontSize="16px"
                >
                  *
                </Typography>
              )}
            </Typography>

            {/* Input Box */}
            <Box
              sx={{
                bgcolor: disabled ? '#f4f4f4' : 'white',
                border: `1px solid ${hasError ? 'red' : '#F4F4F4'}`,
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                px: 1.5,
                display: 'flex',
                alignItems: 'center',
                height: 40,
              }}
            >
              <MuiPhoneInput
                country={'in'}
                value={value}
                onChange={onChange}
                disabled={disabled}
                inputStyle={{
                  border: 'none',
                  boxShadow: 'none',
                  width: '100%',
                  background: 'transparent',
                  fontSize: '14px',
                  height: '100%',
                  padding: 0,
                  fontFamily: 'Mulish, sans-serif',
                }}
                buttonStyle={{
                  background: 'transparent',
                  border: 'none',
                  paddingLeft: 0,
                  marginRight: 8,
                }}
                dropdownStyle={{
                  zIndex: 9999,
                  fontFamily: 'Mulish, sans-serif',
                }}
                inputProps={{
                  name,
                  required: true,
                  placeholder,
                }}
                specialLabel=""
                disableDropdown={false}
                enableSearch
              />
            </Box>

            {/* Bottom Line */}
            <Box
              sx={{
                height: '2px',
                bgcolor: hasError
                  ? 'red'
                  : hasValue
                  ? '#222222'
                  : '#BDBDBD',
              }}
            />

            {/* Error Text */}
            {hasError && (
              <Typography variant="caption" color="error" mt={0.5}>
                {error && error.message}
              </Typography>
            )}
          </StyledPhoneWrapper>
        );
      }}
    />
  );
};

export default PhoneInput;
