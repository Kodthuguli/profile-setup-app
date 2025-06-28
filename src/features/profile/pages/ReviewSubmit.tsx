// import {
//   Box,
//   Typography,
//   Grid,
//   Divider,
//   Button,
//   Checkbox,
//   FormControlLabel,
//   Paper,
//   IconButton
// } from '@mui/material';
// import { useState, useImperativeHandle, forwardRef } from 'react';
// import { useSelector } from 'react-redux';
// import type { RootState } from '../../../app/store';
// import UploadFileIcon from '@mui/icons-material/UploadFile';
// import { useDispatch } from 'react-redux';
// import { updateProfile } from '../slices/profileSlice';
// import CloseIcon from '@mui/icons-material/Close';
// import LinearProgress from '@mui/material/LinearProgress';


// interface Props {
//   onValidated: () => void;
// }

// const ReviewSubmit = forwardRef(({ onValidated }: Props, ref) => {
//   const [checked, setChecked] = useState(false);
// const [resumeError, setResumeError] = useState('');
// const [resumeLoading, setResumeLoading] = useState(false);



//   const profile = useSelector((state: RootState) => state.profile);
//   const { basicInfo, workExperience, education, resume } = profile;

//   useImperativeHandle(ref, () => ({
//   submit: () => {
//     if (checked) {
//       onValidated();
//     }
//   },
//   isChecked: () => checked,            // expose checked state
//   setChecked: (val: boolean) => setChecked(val), // allow parent to control it
// }));

//   const dispatch = useDispatch();
// const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const file = e.target.files?.[0];
//   if (!file) return;

//   const allowedTypes = [
//     'application/pdf',
//     'application/msword',
//     'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//   ];

//   if (!allowedTypes.includes(file.type)) {
//     setResumeError('Unsupported file format. Use PDF, DOC, or DOCX.');
//     return;
//   }

//   if (file.size > 2 * 1024 * 1024) {
//     setResumeError('File size should be less than 2MB.');
//     return;
//   }

//   setResumeError('');
//   setResumeLoading(true);

//   setTimeout(() => {
//     dispatch(
//       updateProfile({
//         section: 'resume',
//         data: { file, fileName: file.name },
//       })
//     );
//     setResumeLoading(false);
//   }, 2000); // simulate file processing delay
// };



//   const renderField = (value: string | number | undefined, label: string) => (
//     <Box>
//       <Typography fontWeight={600}>
//         {value && value !== '' ? value : '-'}
//       </Typography>
//       <Typography variant="caption" color="text.secondary">
//         {label}
//       </Typography>
//     </Box>
//   );

//   return (
//     <Box>
//       <Typography variant="h6" fontWeight={600} gutterBottom>
//         Review & submit
//       </Typography>
//       <Typography variant="body2" color="text.secondary" mb={3}>
//         Almost done! Double-check your info.
//       </Typography>

//       <Paper elevation={0} variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
//         {/* Basic Info */}
//         <Typography variant="subtitle1" fontWeight={600} mb={2}>
//           Basic Information
//         </Typography>
//         <Grid container spacing={2}>
//           <Grid size={{ xs: 12, sm: 6 }}>
//             {renderField(basicInfo?.fullName, 'Full Name')}
//           </Grid>
//           <Grid size={{ xs: 12, sm: 6 }}>
//             {renderField(basicInfo?.email, 'Email')}
//           </Grid>
//           <Grid size={{ xs: 12, sm: 6 }}>
//             {renderField(basicInfo?.state, 'Location')}
//           </Grid>
//           <Grid size={{ xs: 12, sm: 6 }}>
//             {renderField(basicInfo?.phone, 'Phone')}
//           </Grid>
//           <Grid size={{ xs: 12 }}>
//             {renderField(basicInfo?.linkedIn, 'LinkedIn')}
//           </Grid>
//         </Grid>

//         <Divider sx={{ my: 3 }} />

//         {/* Work Experience */}
//         <Typography variant="subtitle1" fontWeight={600} mb={2}>
//           Work Experience
//         </Typography>
//         <Grid container spacing={2}>
//           <Grid size={{ xs: 12, sm: 6 }}>
//             {renderField(workExperience?.company, 'Company')}
//           </Grid>
//           <Grid size={{ xs: 12, sm: 6 }}>
//             {renderField(workExperience?.title, 'Title')}
//           </Grid>
//           <Grid size={{ xs: 12, sm: 6 }}>
//             {renderField(
//               workExperience?.joiningMonth && workExperience?.joiningYear
//                 ? `${workExperience.joiningMonth} ${workExperience.joiningYear}`
//                 : '-',
//               'Joining Date'
//             )}
//           </Grid>
//           <Grid size={{ xs: 12, sm: 6 }}>
//             {renderField(
//               workExperience?.totalExpMonth
//                 ? `${workExperience.totalExpMonth} months`
//                 : '-',
//               'Total Experience'
//             )}
//           </Grid>
//           <Grid size={{ xs: 12 }}>
//             {renderField(workExperience?.profile, 'Job Profile')}
//           </Grid>
//         </Grid>

//         <Divider sx={{ my: 3 }} />

//         {/* Education */}
//         <Typography variant="subtitle1" fontWeight={600} mb={2}>
//           Education
//         </Typography>
//         {education?.map((edu, idx) => (
//           <Grid container spacing={2} key={idx} mb={1}>
//             <Grid size={{ xs: 12, sm: 6 }}>
//               {renderField(edu.degree, 'Degree')}
//             </Grid>
//             <Grid size={{ xs: 12, sm: 6 }}>
//               {renderField(edu.institute, 'Institute')}
//             </Grid>
//             <Grid size={{ xs: 12, sm: 6 }}>
//               {renderField(
//                 edu.startYear && edu.endYear
//                   ? `${edu.startYear} - ${edu.endYear}`
//                   : '-',
//                 'Duration'
//               )}
//             </Grid>
//             <Grid size={{ xs: 12, sm: 6 }}>
//               {renderField(edu.location, 'Location')}
//             </Grid>
//           </Grid>
//         ))}
//       </Paper>

//       {/* Resume Upload */}
// {/* Resume Upload */}
// <Box mt={4} sx={{ maxWidth: 520 }}>
//   <Typography variant="subtitle2" fontWeight={600}>
//     Resume upload <span style={{ color: 'red' }}>*</span>
//   </Typography>

//   <Paper
//     variant="outlined"
//     sx={{
//       mt: 1,
//       p: 2,
//       borderStyle: 'dashed',
//       borderRadius: 2,
//       backgroundColor: '#FAFAFA',
//     }}
//   >
//     <Button
//       variant="outlined"
//       component="label"
//       startIcon={<UploadFileIcon />}
//       disabled={resumeLoading}
//     >
//       Upload Resume
//       <input
//         hidden
//         type="file"
//         accept=".pdf,.doc,.docx"
//        onChange={(e) => {
//   handleFileChange(e);
//   e.target.value = ''; // ← Reset AFTER processing
// }}
//       />
//     </Button>

//     <Typography variant="body2" mt={1} color="text.secondary">
//       Supported formats: doc, docx, pdf. Max file size: 2MB
//     </Typography>
//   </Paper>

//   {/* Progress Bar */}
//   {resumeLoading && (
//     <Box mt={2}>
//       <LinearProgress />
//     </Box>
//   )}

//   {/* Uploaded File Preview with Close Icon */}
//   {!resumeLoading && resume?.fileName && (
//     <Paper
//       variant="outlined"
//       sx={{
//         mt: 2,
//         px: 2,
//         py: 1.5,
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         borderRadius: 1,
//         backgroundColor: '#FAFAFA',
//       }}
//     >
//       <Typography fontWeight={500} noWrap maxWidth="85%">
//         {resume.fileName}
//       </Typography>
//       <IconButton
//         size="small"
//         onClick={() =>
//           dispatch(
//             updateProfile({
//               section: 'resume',
//               data: { file: null, fileName: '' },
//             })
//           )
//         }
//       >
//         <CloseIcon fontSize="small" />
//       </IconButton>
//     </Paper>
//   )}

//   {/* Error */}
//   {resumeError && (
//     <Typography color="error" mt={1} fontSize={13}>
//       {resumeError}
//     </Typography>
//   )}
// </Box>

//     </Box>
//   );
// });

// export default ReviewSubmit;


// export type ReviewSubmitRef = {
//   submit: () => void;
//   isChecked: () => boolean;
//   setChecked: (val: boolean) => void;
// };



import {
  Box,
  Typography,
  Grid,
  Divider,
  Button,
  Paper,
  IconButton,
  LinearProgress,
} from '@mui/material';
import { useState, useImperativeHandle, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../slices/profileSlice';
import type { RootState } from '../../../app/store';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloseIcon from '@mui/icons-material/Close';
import type { StepFormRef } from '../types';

export type ReviewSubmitRef = {
  submit: () => void;
};

interface Props {
  onValidated: () => void;
}

const ReviewSubmit = forwardRef<StepFormRef, Props>(({ onValidated }, ref) => {
  const [resumeError, setResumeError] = useState('');
  const [resumeLoading, setResumeLoading] = useState(false);

  const profile = useSelector((state: RootState) => state.profile);
  const { basicInfo, workExperience, education, resume } = profile;
  const dispatch = useDispatch();

  useImperativeHandle(ref, () => ({
    submit: () => {
         if (!resume?.file) {
      setResumeError('Please upload your resume before submitting.');
      return; // Block submission
    }
      onValidated();
    },
  }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (!allowedTypes.includes(file.type)) {
      setResumeError('Unsupported file format. Use PDF, DOC, or DOCX.');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setResumeError('File size should be less than 2MB.');
      return;
    }

    setResumeError('');
    setResumeLoading(true);

    // Simulate file upload delay
    setTimeout(() => {
      dispatch(
        updateProfile({
          section: 'resume',
          data: { file, fileName: file.name },
        })
      );
      setResumeLoading(false);
    }, 2000);
  };

  const renderField = (value: string | number | undefined, label: string) => (
    <Box>
      <Typography fontWeight={600}>
        {value && value !== '' ? value : '-'}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
    </Box>
  );

  return (
    <Box>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Review & submit
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Almost done! Double-check your info.
      </Typography>

      <Paper elevation={0} variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
        {/* Basic Info */}
        <Typography variant="subtitle1" fontWeight={600} mb={2}>
          Basic Information
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            {renderField(basicInfo?.fullName, 'Full Name')}
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            {renderField(basicInfo?.email, 'Email')}
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            {renderField(basicInfo?.state, 'Location')}
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            {renderField(basicInfo?.phone, 'Phone')}
          </Grid>
          <Grid size={{ xs: 12 }}>
            {renderField(basicInfo?.linkedIn, 'LinkedIn')}
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Work Experience */}
        <Typography variant="subtitle1" fontWeight={600} mb={2}>
          Work Experience
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            {renderField(workExperience?.company, 'Company')}
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            {renderField(workExperience?.title, 'Title')}
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            {renderField(
              workExperience?.joiningMonth && workExperience?.joiningYear
                ? `${workExperience.joiningMonth} ${workExperience.joiningYear}`
                : '-',
              'Joining Date'
            )}
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            {renderField(
              workExperience?.totalExpMonth
                ? `${workExperience.totalExpMonth} months`
                : '-',
              'Total Experience'
            )}
          </Grid>
          <Grid size={{ xs: 12}}>
            {renderField(workExperience?.profile, 'Job Profile')}
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Education */}
        <Typography variant="subtitle1" fontWeight={600} mb={2}>
          Education
        </Typography>
        {education?.map((edu, idx) => (
          <Grid container spacing={2} key={idx} mb={1}>
            <Grid size={{ xs: 12, sm: 6 }}>
              {renderField(edu.degree, 'Degree')}
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              {renderField(edu.institute, 'Institute')}
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              {renderField(
                edu.startYear && edu.endYear
                  ? `${edu.startYear} - ${edu.endYear}`
                  : '-',
                'Duration'
              )}
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              {renderField(edu.location, 'Location')}
            </Grid>
          </Grid>
        ))}
      </Paper>

      {/* Resume Upload Section */}
      <Box mt={4} sx={{ maxWidth: 520 }}>
        <Typography variant="subtitle2" fontWeight={600}>
          Resume upload <span style={{ color: 'red' }}>*</span>
        </Typography>

        <Paper
          variant="outlined"
          sx={{
            mt: 1,
            p: 2,
            borderStyle: 'dashed',
            borderRadius: 2,
            backgroundColor: '#FAFAFA',
          }}
        >
          <Button
            variant="outlined"
            component="label"
            startIcon={<UploadFileIcon />}
            disabled={resumeLoading}
          >
            Upload Resume
            <input
              hidden
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => {
                // Reset to allow reupload of same file
                handleFileChange(e);
                e.target.value = ''; 
              }}
            />
          </Button>

          <Typography variant="body2" mt={1} color="text.secondary">
            Supported formats: doc, docx, pdf. Max file size: 2MB
          </Typography>
        </Paper>

        {resumeLoading && (
          <Box mt={2}>
            <LinearProgress />
          </Box>
        )}

        {!resumeLoading && resume?.fileName && (
          <Paper
            variant="outlined"
            sx={{
              mt: 2,
              px: 2,
              py: 1.5,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 1,
              backgroundColor: '#FAFAFA',
            }}
          >
            <Typography fontWeight={500} noWrap maxWidth="85%">
              {resume.fileName}
            </Typography>
            <IconButton
              size="small"
              onClick={() =>
                dispatch(
                  updateProfile({
                    section: 'resume',
                    data: { file: null, fileName: '' },
                  })
                )
              }
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Paper>
        )}

        {resumeError && (
          <Typography color="error" mt={1} fontSize={13}>
            {resumeError}
          </Typography>
        )}
      </Box>
    </Box>
  );
});

export default ReviewSubmit;
