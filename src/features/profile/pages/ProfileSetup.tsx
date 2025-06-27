// import { useRef, useState } from 'react';
// import BasicInfo from './BasicInfo';
// // import WorkExperience from './WorkExperience';
// import { Box, Button, Stack } from '@mui/material';
// import ProfileStepper from '../../../components/stepper/ProfileStepper';

// const steps = ['Basic Info', 'Work Experience', 'Education', 'Review & Submit'];

// const ProfileSetup = () => {
//   const [activeStep, setActiveStep] = useState(0);

//   const formRef = useRef<{ submit: () => void }>(null);

//   const handleNext = () => {
//     if (formRef.current) {
//       formRef.current.submit(); // each step validates & triggers onValidated
//     }
//   };

//   const handleBack = () => {
//     setActiveStep((prev) => Math.max(prev - 1, 0));
//   };

//   const onStepValidated = () => {
//     setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
//   };

//   const renderStepContent = () => {
//     switch (activeStep) {
//       case 0:
//         return <BasicInfo ref={formRef} onValidated={onStepValidated} />;
//       // case 1:
//       //   return <WorkExperience ref={formRef} onValidated={onStepValidated} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <Box sx={{ bgcolor: 'white', borderRadius: '8px' }}>
//         <Box
//             sx={{
//             px: { xs: 1, sm: 4, md: 4 }
//             }}
//         >
//             <ProfileStepper activeStep={activeStep} />
//         </Box>
      
//       <Box mt={2} sx={{px: { xs: 2, sm: 17 }, py: { xs: 2, sm: 3 }}}>{renderStepContent()}</Box>

//       {/* Divider and Button row */}
//       <Box
//         mt={4}
//         pt={2}
//         pb={2}
//         sx={{
//           borderTop: '1px solid #e0e0e0'
//         }}
//       >
//         <Stack direction="row" justifyContent="space-between" sx={{px:4}}>
//           <Button variant="outlined" onClick={handleBack} disabled={activeStep === 0}>
//             Back
//           </Button>
//           <Button variant="contained" onClick={handleNext}>
//             {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
//           </Button>
//         </Stack>
//       </Box>
//     </Box>
//   );
// };

// export default ProfileSetup;
import { useRef, useState } from 'react';
import BasicInfo from './BasicInfo';
import WorkExperience from './WorkExperience'; // ✅ Uncommented
import { Box, Button, Stack } from '@mui/material';
import ProfileStepper from '../../../components/stepper/ProfileStepper';

const steps = ['Basic Info', 'Work Experience', 'Education', 'Review & Submit'];

const ProfileSetup = () => {
  const [activeStep, setActiveStep] = useState(0);
  const formRef = useRef<{ submit: () => void }>(null);

  const handleNext = () => {
    if (formRef.current) {
      formRef.current.submit(); // each step triggers validation via `useImperativeHandle`
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const onStepValidated = () => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <BasicInfo ref={formRef} onValidated={onStepValidated} />;
      case 1:
        return <WorkExperience ref={formRef} onValidated={onStepValidated} />;
      // case 2:
      //   return <Education ref={formRef} onValidated={onStepValidated} />;
      // case 3:
      //   return <ReviewSubmit ref={formRef} onValidated={onStepValidated} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ bgcolor: 'white', borderRadius: '8px' }}>
      <Box sx={{ px: { xs: 1, sm: 4, md: 4 } }}>
        <ProfileStepper activeStep={activeStep} />
      </Box>

      <Box mt={2} sx={{ px: { xs: 2, sm: 17 }, py: { xs: 2, sm: 3 } }}>
        {renderStepContent()}
      </Box>

      <Box
        mt={4}
        pt={2}
        pb={2}
        sx={{
          borderTop: '1px solid #e0e0e0',
        }}
      >
        <Stack direction="row" justifyContent="space-between" sx={{ px: 4 }}>
          <Button variant="outlined" onClick={handleBack} disabled={activeStep === 0}>
            Back
          </Button>
          <Button variant="contained" onClick={handleNext}>
            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProfileSetup;
