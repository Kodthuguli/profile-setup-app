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
    <Box sx={{ width: '100%', py: 2, borderBottom: '1px solid #e0e0e0' }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          '& .MuiStepIcon-root': {
            color: '#BAB9C4', // default bubble
          },
          '& .MuiStepIcon-root.Mui-completed': {
            color: '#33CF7C !important', // completed bubble
          },
          '& .MuiStepIcon-root.Mui-active': {
            color: '#9493B3 !important', // active bubble
          },
          '& .MuiStepConnector-line': {
            borderColor: '#BAB9C4', // default line
          },
          '& .MuiStepConnector-line.Mui-active, & .MuiStepConnector-line.Mui-completed': {
            borderColor: '#33CF7C', // active/completed line
          },
        }}
      >
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
