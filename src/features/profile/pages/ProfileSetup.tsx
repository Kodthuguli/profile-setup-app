// src/features/profile/pages/ProfileSetup.tsx

import { useRef, useState } from 'react';
import { Box, Button, Stack, Checkbox, FormControlLabel } from '@mui/material';
import { useSelector } from 'react-redux';

import ProfileStepper from '../../../components/stepper/ProfileStepper';
import SuccessDialog from '../../../components/layout/SuccessDialog';

import BasicInfo from './BasicInfo';
import WorkExperience from './WorkExperience';
import Education from './Education';
import ReviewSubmit from './ReviewSubmit';

import type { StepFormRef } from '../types';
import type { RootState } from '../../../app/store';

// Stepper labels
const steps = ['Basic Info', 'Work Experience', 'Education', 'Review & Submit'];

const ProfileSetup = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const formRef = useRef<StepFormRef | null>(null);
  const profile = useSelector((state: RootState) => state.profile);

  const lastIndex = steps.length - 1;

  // Handle step progression
  const handleNext = async () => {
    if (!formRef.current) return;

    await formRef.current.submit();

    if (activeStep < lastIndex) return;
    if (!checkboxChecked) return;
    if (!profile.resume?.fileName) return;

    setOpenSuccess(true);
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const onStepValidated = () => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  // Render form step component
  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <BasicInfo ref={formRef} onValidated={onStepValidated} />;
      case 1:
        return <WorkExperience ref={formRef} onValidated={onStepValidated} />;
      case 2:
        return <Education ref={formRef} onValidated={onStepValidated} />;
      case 3:
        return <ReviewSubmit ref={formRef} onValidated={onStepValidated} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ bgcolor: 'white', borderRadius: '8px' }}>
      {/* Success dialog after submission */}
      {openSuccess && (
        <SuccessDialog
          open={openSuccess}
          onClose={() => setOpenSuccess(false)}
          email={profile.basicInfo?.email || ''}
        />
      )}

      {/* Stepper */}
      <Box sx={{ px: { xs: 1, sm: 4, md: 4 } }}>
        <ProfileStepper activeStep={activeStep} />
      </Box>

      {/* Form Step Content */}
      <Box mt={2} sx={{ px: { xs: 2, sm: 25 }, py: { xs: 2, sm: 3 } }}>
        {renderStepContent()}
      </Box>

      {/* Navigation Buttons */}
      <Box
  mt={4}
  pt={2}
  pb={2}
  sx={{
    borderTop: '1px solid #e0e0e0',
    px: { xs: 2, sm: 4 },
  }}
>
  <Stack
    direction={{ xs: 'column', sm: 'row' }}
    justifyContent={{ xs: 'flex-start', sm: 'space-between' }}
    alignItems={{ xs: 'flex-start', sm: 'center' }}
    spacing={2}
  >
    <Button variant="text" onClick={handleBack} disabled={activeStep === 0}>
      Back
    </Button>

    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      alignItems={{ xs: 'flex-start', sm: 'center' }}
      sx={{
        width: { xs: '100%', sm: 'auto' },
        mt: { xs: 2, sm: 0 },
      }}
    >
      {activeStep === steps.length - 1 && (
        <FormControlLabel
          control={
            <Checkbox
              checked={checkboxChecked}
              onChange={(e) => setCheckboxChecked(e.target.checked)}
            />
          }
          label="Yes, I’ve checked the above data"
          sx={{ whiteSpace: 'normal' }}
        />
      )}

      <Button
        variant="contained"
        onClick={handleNext}
        disabled={activeStep === lastIndex && !checkboxChecked}
        sx={{
          bgcolor: '#292666',
          color: 'white',
          alignSelf: { xs: 'flex-start', sm: 'center' },
        }}
      >
        {activeStep === lastIndex ? 'Submit' : 'Next'}
      </Button>
    </Stack>
  </Stack>
</Box>


</Box>
  );
};

export default ProfileSetup;
