import { Controller } from 'react-hook-form';
import { Box, Typography, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';

interface DatePickerFieldProps {
  name: string;
  control: any;
  label: string;
  rules?: any;
  placeholder?: string;
  disabled?: boolean;
}

const DatePickerField = ({
  name,
  control,
  label,
  rules,
  placeholder = '',
  disabled = false,
}: DatePickerFieldProps) => {
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
          <Box>
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

            {/* Input Wrapper */}
            <Box
              sx={{
                bgcolor: disabled ? '#f4f4f4' : 'white',
                border: `1px solid ${hasError ? 'red' : '#F4F4F4'}`,
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                px: 1.5,
                pt: 1,
              }}
            >
              <DatePicker
                value={value || null}
                onChange={(newValue: Dayjs | null) => {
                  onChange(newValue);
                }}
                disabled={disabled}
                slotProps={{
                  textField: {
                    variant: 'standard',
                    placeholder,
                    fullWidth: true,
                    InputProps: { disableUnderline: true },
                    sx: {
                      '& input::placeholder': {
                        color: '#9e9e9e',
                        opacity: 1,
                      },
                    },
                  },
                }}
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

            {/* Error Message */}
            {hasError && (
              <Typography variant="caption" color="error" mt={0.5}>
                {error && error.message}
              </Typography>
            )}
          </Box>
        );
      }}
    />
  );
};

export default DatePickerField;
