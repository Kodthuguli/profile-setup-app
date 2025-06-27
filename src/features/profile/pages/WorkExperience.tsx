import { Box, Grid, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { forwardRef, useImperativeHandle, useState } from 'react';

import CustomSelect from '../../../components/form/CustomSelect';
import CustomInput from '../../../components/form/CustomInput';
import { updateProfile } from '../slices/profileSlice';
import type { RootState } from '../../../app/store';

interface Props {
  onValidated: () => void;
}

const yearsExp = Array.from({ length: 31 }, (_, i) => ({
  label: `${i} ${i === 1 ? 'year' : 'years'}`,
  value: `${i}`
}));

const monthsExp = Array.from({ length: 12 }, (_, i) => ({
  label: `${i} ${i === 1 ? 'month' : 'months'}`,
  value: `${i}`
}));

const months = [
  { label: 'Jan', value: '01' },
  { label: 'Feb', value: '02' },
  { label: 'Mar', value: '03' },
  { label: 'Apr', value: '04' },
  { label: 'May', value: '05' },
  { label: 'Jun', value: '06' },
  { label: 'Jul', value: '07' },
  { label: 'Aug', value: '08' },
  { label: 'Sep', value: '09' },
  { label: 'Oct', value: '10' },
  { label: 'Nov', value: '11' },
  { label: 'Dec', value: '12' },
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 30 }, (_, i) => {
  const year = currentYear - i;
  return { label: `${year}`, value: `${year}` };
});

const noticePeriods = [
  { label: '15 days', value: '15' },
  { label: '30 days', value: '30' },
  { label: '60 days', value: '60' },
  { label: '90 days', value: '90' },
  { label: 'More than 90 days', value: '120' }
];

const WorkExperience = forwardRef(({ onValidated }: Props, ref) => {
  const dispatch = useDispatch();
  const work = useSelector((state: RootState) => state.profile.workExperience);

  const [isFresher, setIsFresher] = useState(work?.isFresher || false);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      isFresher: work?.isFresher || false,
      totalExpYear: work?.totalExpYear || '',
      totalExpMonth: work?.totalExpMonth || '',
      company: work?.company || '',
      title: work?.title || '',
      joiningYear: work?.joiningYear || '',
      joiningMonth: work?.joiningMonth || '',
      notice: work?.notice || '',
      profile: work?.profile || ''
    },
    mode: 'onBlur'
  });

  useImperativeHandle(ref, () => ({
    submit: () => {
      handleSubmit((data) => {
        dispatch(updateProfile({ section: 'workExperience', data }));
        onValidated();
      })();
    }
  }));

  return (
    <Box>
      <Box mb={4}>
        <Typography variant="h6" fontWeight={600}>
          Work experience
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Details like job title, company name, etc., help employers understand your work.
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Typography variant="subtitle2" fontWeight={500} mb={1}>
            Are you a fresher? <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Controller
            name="isFresher"
            control={control}
            render={({ field }) => (
              <ToggleButtonGroup
                exclusive
                {...field}
                onChange={(_, val) => {
                  setIsFresher(val === true);
                  field.onChange(val);
                }}
              >
                <ToggleButton value={true} selected={isFresher}>
                  Yes
                </ToggleButton>
                <ToggleButton value={false} selected={!isFresher}>
                  No
                </ToggleButton>
              </ToggleButtonGroup>
            )}
          />
        </Grid>

        {!isFresher && (
          <>
            <Grid size={{ xs: 12}}>
  <Box
    sx={{
      backgroundColor: '#F4F4F4',
      borderTopLeftRadius: '8px',
      borderTopRightRadius: '8px',
      px: 2,
      pt: 1.5,
      pb: 1.5,
    }}
  >
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <CustomSelect
          name="totalExpYear"
          control={control}
          label="Total experience"
          placeholder="Select year"
          options={yearsExp}
          rules={{ required: 'Experience year is required' }}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <CustomSelect
          name="totalExpMonth"
          control={control}
          label=""
          placeholder="Select month"
          options={monthsExp}
          rules={{ required: 'Experience month is required' }}
        />
      </Grid>
    </Grid>
  </Box>
</Grid>


            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomInput
                name="company"
                control={control}
                label="Current company name"
                placeholder="Type your organisation"
                rules={{ required: 'Company name is required' }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomInput
                name="title"
                control={control}
                label="Current job title"
                placeholder="Type your designation"
                rules={{ required: 'Job title is required' }}
              />
            </Grid>

            <Grid size={{ xs: 12}}>
  <Box
    sx={{
      backgroundColor: '#F4F4F4',
      borderTopLeftRadius: '8px',
      borderTopRightRadius: '8px',
      px: 2,
      pt: 1.5,
      pb: 1.5,
    }}
  >
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <CustomSelect
          name="joiningYear"
          control={control}
          label="Joining date"
          placeholder="Select year"
          options={years}
          rules={{ required: 'Joining year is required' }}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <CustomSelect
          name="joiningMonth"
          control={control}
          label=""
          placeholder="Select month"
          options={months}
          rules={{ required: 'Joining month is required' }}
        />
      </Grid>
    </Grid>
  </Box>
</Grid>


            <Grid size={{ xs: 12 }}>
              <CustomSelect
                name="notice"
                control={control}
                label="Notice period"
                placeholder="Select notice period"
                options={noticePeriods}
                rules={{ required: 'Notice period is required' }}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
  <CustomInput
    name="profile"
    control={control}
    label="Job profile"
    placeholder="Type here"
    rules={{
      maxLength: {
        value: 200,
        message: 'Max 200 characters allowed',
      },
    }}
    multiline
    minRows={3} // 👈️ makes it taller
  />
  <Typography variant="caption" color="text.secondary" mt={0.5}>
    Used to describe your current responsibilities. (Max 200 characters)
  </Typography>
</Grid>
          </>
        )}
      </Grid>
    </Box>
  );
});

export default WorkExperience;
