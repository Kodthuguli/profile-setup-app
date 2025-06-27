import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { Controller } from 'react-hook-form';

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  name: string;
  control: any;
  label: string;
  options: Option[];
  rules?: any;
  disabled?: boolean;
  placeholder?: string;
}

const CustomSelect = ({
  name,
  control,
  label,
  options,
  rules,
  disabled = false,
  placeholder = 'Select an option',
}: CustomSelectProps) => {
  const isRequired = rules?.required !== undefined;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        const hasValue = Boolean(field.value);
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
                border: `1px solid ${
                  hasError ? 'red' : '#F4F4F4'
                }`,
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                px: 1.5,
                pt: 1,
                pb: 0,
              }}
            >
              <FormControl fullWidth variant="standard">
                <Select
                  {...field}
                  disableUnderline
                  displayEmpty
                  disabled={disabled}
                  renderValue={(selected) => {
                    if (!selected) {
                      return (
                        <Typography color="#9e9e9e">{placeholder}</Typography>
                      );
                    }
                    const selectedOption = options.find(
                      (opt) => opt.value === selected
                    );
                    return selectedOption?.label || '';
                  }}
                  sx={{
                    fontFamily: 'Mulish, sans-serif',
                    fontSize: '14px',
                    bgcolor: 'transparent',
                    '& .MuiSelect-select': {
                      paddingY: 0.5,
                    },
                  }}
                >
                  {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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

            {/* Error message */}
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

export default CustomSelect;
