import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid'; // ⚠️ use Unstable_Grid2 to support `size` prop
import { useForm, useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { forwardRef, useImperativeHandle } from 'react';

import type { RootState } from '../../../app/store';
import { updateProfile } from '../slices/profileSlice';

import CustomInput from '../../../components/form/CustomInput';
import PhoneInput from '../../../components/form/PhoneInput';
import CustomSelect from '../../../components/form/CustomSelect';
import DatePickerField from '../../../components/form/DatePicker';
import type { StepFormRef } from '../types';

const states = [
  { label: 'Karnataka', value: 'KA' },
  { label: 'Maharashtra', value: 'MH' },
  { label: 'Delhi', value: 'DL' },
];

const cities = [
  { label: 'Bangalore', value: 'Bangalore' },
  { label: 'Mumbai', value: 'Mumbai' },
  { label: 'Delhi', value: 'Delhi' },
];

interface Props {
  onValidated: () => void;
}

const BasicInfo = forwardRef<StepFormRef, Props>(({ onValidated }, ref) => {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile.basicInfo);

  const {
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      fullName: profile?.fullName || '',
      email: profile?.email || '',
      phone: profile?.phone || '',
      dob: profile?.dob || null,
      state: profile?.state || '',
      city: profile?.city || '',
      linkedIn: profile?.linkedIn || '',
    },
    mode: 'onBlur',
  });

  const selectedState = useWatch({ control, name: 'state' });

  useImperativeHandle(ref, () => ({
    submit: () => {
      handleSubmit((data) => {
        dispatch(updateProfile({ section: 'basicInfo', data }));
        onValidated();
      })();
    },
  }));

  return (
    <Box>
      {/* Section Title */}
      <Box mb={4}>
        <Typography variant="h6" fontWeight={600}>
          Basic information
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Let's start with the essentials.
        </Typography>
      </Box>

      {/* Form Fields */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomInput
            name="fullName"
            placeholder="Full name"
            control={control}
            label="Full name"
            rules={{ required: 'Full name is required' }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomInput
            name="email"
            control={control}
            label="Email address"
            placeholder="Email address"
            type="email"
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Enter a valid email',
              },
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <PhoneInput
            name="phone"
            control={control}
            label="Phone number"
            rules={{ required: 'Phone is required' }}
            placeholder="Phone number"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <DatePickerField
            name="dob"
            placeholder="Date of birth"
            control={control}
            label="Date of birth"
            rules={{ required: 'DOB is required' }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomSelect
            name="state"
            control={control}
            placeholder="State"
            label="State"
            options={states}
            rules={{ required: 'State is required' }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomSelect
            name="city"
            control={control}
            placeholder="City"
            label="City"
            options={cities}
            rules={selectedState ? { required: 'City is required' } : {}}
            disabled={!selectedState}
          />
        </Grid>

        <Grid size={12}>
          <CustomInput
            name="linkedIn"
            control={control}
            label="Add LinkedIn url"
            placeholder="https://www.linkedin.com/in/johndoe"
            rules={{
              pattern: {
                value: /^https?:\/\/(www\.)?linkedin\.com\/in\/[A-z0-9_-]+\/?$/,
                message: 'Enter a valid LinkedIn URL',
              },
            }}
          />
          <Typography variant="caption" color="text.secondary" mt={1}>
            Used to verify your professional presence. Please ensure the URL is accurate and publicly viewable.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
});

export default BasicInfo;
