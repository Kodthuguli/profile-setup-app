import { Box, Stepper, Step, StepLabel } from '@mui/material';

interface ProfileStepperProps {
  activeStep: number;
}

const steps = [
  'Basic Info',
  'Work Experience',
  'Education',
  'Review & Submit',
];

const ProfileStepper = ({ activeStep }: ProfileStepperProps) => {
  return (
    <Box sx={{ width: '100%', py: 2 ,borderBottom: '1px solid #e0e0e0'}}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default ProfileStepper;