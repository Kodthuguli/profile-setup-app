// import { useRef, useState } from 'react';
// import BasicInfo from './BasicInfo';
// import WorkExperience from './WorkExperience';
// import Education from './Education';
// import ReviewSubmit, { type ReviewSubmitRef }  from './ReviewSubmit';
// import { Box, Button, Stack, Checkbox, FormControlLabel } from '@mui/material';
// import ProfileStepper from '../../../components/stepper/ProfileStepper';

// const steps = ['Basic Info', 'Work Experience', 'Education', 'Review & Submit'];

// const ProfileSetup = () => {
//   const [activeStep, setActiveStep] = useState(0);
//   const [checkboxChecked, setCheckboxChecked] = useState(false);

//   const formRef = useRef<ReviewSubmitRef | null>(null);

//   const handleNext = async () => {
//   if (formRef.current?.submit) {
//     await formRef.current.submit();

//     // For last step, allow navigation only if checkbox is checked
//     if (activeStep === steps.length - 1 && !checkboxChecked) {
//       const isChecked = formRef.current.isChecked?.();
//       if (!isChecked) return; // Block submit if not checked
//     }
//   }
// };


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
//       case 1:
//         return <WorkExperience ref={formRef} onValidated={onStepValidated} />;
//       case 2:
//         return <Education ref={formRef} onValidated={onStepValidated} />;
//       case 3:
//         return <ReviewSubmit ref={formRef} onValidated={onStepValidated} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <Box sx={{ bgcolor: 'white', borderRadius: '8px' }}>
//       {/* Stepper */}
//       <Box sx={{ px: { xs: 1, sm: 4, md: 4 } }}>
//         <ProfileStepper activeStep={activeStep} />
//       </Box>

//       {/* Step Content */}
//       <Box mt={2} sx={{ px: { xs: 2, sm: 17 }, py: { xs: 2, sm: 3 } }}>
//         {renderStepContent()}
//       </Box>

//       {/* Bottom Actions */}
//       <Box
//         mt={4}
//         pt={2}
//         pb={2}
//         sx={{
//           borderTop: '1px solid #e0e0e0',
//           px: 4,
//         }}
//       >
//         <Stack direction="row" justifyContent="space-between" alignItems="center">
//           {/* Back button */}
//           <Button variant="outlined" onClick={handleBack} disabled={activeStep === 0}>
//             Back
//           </Button>

//           {/* Right-aligned checkbox and Next/Submit */}
//           <Stack direction="row" spacing={2} alignItems="center">
//             {activeStep === steps.length - 1 && (
//               <FormControlLabel
//                 control={
//                   <Checkbox
//   checked={checkboxChecked}
//   onChange={(e) => setCheckboxChecked(e.target.checked)}
// />
//                 }
//                 label="Yes, I’ve checked the above data"
//               />
//             )}
//             <Button
//               variant="contained"
//               onClick={handleNext}
//               disabled={activeStep === steps.length - 1 && !formRef.current?.isChecked?.()}
//             >
//               {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
//             </Button>
//           </Stack>
//         </Stack>
//       </Box>
//     </Box>
//   );
// };

// export default ProfileSetup;


import { useRef, useState } from 'react';
import BasicInfo from './BasicInfo';
import WorkExperience from './WorkExperience';
import Education from './Education';
import ReviewSubmit, { type ReviewSubmitRef } from './ReviewSubmit';
import { Box, Button, Stack, Checkbox, FormControlLabel, Dialog, DialogTitle, DialogContent, Typography, DialogActions } from '@mui/material';
import ProfileStepper from '../../../components/stepper/ProfileStepper';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from 'react-router-dom';
import type { StepFormRef } from '../types';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';

const steps = ['Basic Info', 'Work Experience', 'Education', 'Review & Submit'];

const ProfileSetup = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const navigate = useNavigate();
  const profile = useSelector((state: RootState) => state.profile);


  const formRef = useRef<StepFormRef | null>(null);

//   const handleNext = async () => {
//   if (formRef.current?.submit) {
//     await formRef.current.submit();

//     // Block submission if not checked in last step
//     if (activeStep === steps.length - 1 && !checkboxChecked) {
//       return;
//     }

//     // ✅ If last step and checkbox is checked, show success popup
//     if (activeStep === steps.length - 1 ) {
//       setOpenSuccess(true);
//       return;
//     }

//     // Otherwise, proceed to next step
//     // onStepValidated();
//   }
// };

const lastIndex = steps.length - 1;

const handleNext = async () => {
  if (!formRef.current) return;

  // 1) Always validate the current step via child.submit()
  await formRef.current.submit();

  // 2) If we're *not* on the last step, do *nothing* here—
  //    the child’s onValidated() will have already incremented activeStep.
  if (activeStep < lastIndex) {
    return;
  }

  // 3) We are on the last step ⇒ enforce checkbox
  if (!checkboxChecked) {
    return;
  }

  // 4) Enforce resume upload
  if (!profile.resume?.fileName) {
    return;
  }

  // 5) All good ⇒ show the success modal
  setOpenSuccess(true);
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
      {openSuccess && (
  <Dialog open={openSuccess} onClose={() => setOpenSuccess(false)} maxWidth="xs" fullWidth>
    <DialogTitle sx={{ textAlign: 'center', pt: 4 }}>
      <CheckCircleOutlineIcon sx={{ fontSize: 48, color: '#4CAF50' }} />
    </DialogTitle>
    <DialogContent sx={{ textAlign: 'center', pb: 0 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Profile submitted successfully
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        Johnathan’s profile has been created and saved. <br />
        A confirmation email was sent to <strong>john.doe@example.com</strong>
      </Typography>
    </DialogContent>
    <DialogActions sx={{ justifyContent: 'center', pb: 4 }}>
      <Button variant="contained" onClick={() => navigate('/profile/view')}>
        View profile
      </Button>
    </DialogActions>
  </Dialog>
)}

      {/* Stepper */}
      <Box sx={{ px: { xs: 1, sm: 4, md: 4 } }}>
        <ProfileStepper activeStep={activeStep} />
      </Box>

      {/* Step Content */}
      <Box mt={2} sx={{ px: { xs: 2, sm: 17 }, py: { xs: 2, sm: 3 } }}>
        {renderStepContent()}
      </Box>

      {/* Bottom Actions */}
      <Box
        mt={4}
        pt={2}
        pb={2}
        sx={{
          borderTop: '1px solid #e0e0e0',
          px: 4,
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          {/* Back button */}
          <Button variant="outlined" onClick={handleBack} disabled={activeStep === 0}>
            Back
          </Button>

          {/* Right-aligned checkbox and Submit button */}
          <Stack direction="row" spacing={2} alignItems="center">
            {activeStep === steps.length - 1 && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkboxChecked}
                    onChange={(e) => setCheckboxChecked(e.target.checked)}
                  />
                }
                label="Yes, I’ve checked the above data"
              />
            )}
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={activeStep === steps.length - 1 && !checkboxChecked}
            >
              {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProfileSetup;
