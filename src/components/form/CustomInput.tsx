import { Box, TextField, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';

interface CustomInputProps {
  name: string;
  control: any;
  placeholder?: string;
  label: string;
  type?: string;
  rules?: any;
  disabled?: boolean;
   multiline?: boolean;
  minRows?: number;
}

const CustomInput = ({
  name,
  control,
  label,
  placeholder = '',
  type = 'text',
  rules,
  disabled = false,
  multiline = false,
  minRows = 1,
}: CustomInputProps) => {
  const isRequired = rules?.required !== undefined;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        const hasValue = Boolean(field.value?.toString().trim());
        const hasError = Boolean(error);

        return (
          <Box>
            {/* Label with red star if required */}
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

            {/* Input container */}
            <Box
              sx={{
                bgcolor: disabled ? '#f4f4f4' : 'white',
                border: `1px solid ${hasError ? 'red' : '#F4F4F4'}`,
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                px: 1.5,
                pt: 0.5,
                pb: 0,
              }}
            >
              <TextField
                {...field}
                fullWidth
                type={type}
                placeholder={placeholder}
                variant="standard"
                multiline={multiline}
  minRows={minRows}
                disabled={disabled}
                InputProps={{
                  disableUnderline: true,
                }}
                sx={{
                  fontFamily: 'Mulish, sans-serif',
                  '& input::placeholder': {
                    color: '#9e9e9e',
                    opacity: 1,
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

export default CustomInput;
