// src/features/profile/pages/Education.tsx

import {
  Box,
  Grid,
  Typography,
  IconButton,
  Collapse,
  Button,
} from '@mui/material';
import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { ExpandMore, Delete, Add } from '@mui/icons-material';

import CustomSelect from '../../../components/form/CustomSelect';
import CustomInput from '../../../components/form/CustomInput';
import { updateProfile } from '../slices/profileSlice';
import type { RootState } from '../../../app/store';
import type { StepFormRef } from '../types';

interface Props {
  onValidated: () => void;
}

const degrees = [
  { label: 'B.Tech', value: 'B.Tech' },
  { label: 'M.Tech', value: 'M.Tech' },
  { label: 'B.Sc', value: 'B.Sc' },
  { label: 'M.Sc', value: 'M.Sc' },
  { label: 'MBA', value: 'MBA' },
];

const years = Array.from({ length: 40 }, (_, i) => {
  const year = 1985 + i;
  return { label: `${year}`, value: `${year}` };
});

const Education = forwardRef<StepFormRef, Props>(({ onValidated }, ref) => {
  const dispatch = useDispatch();
  const educationState = useSelector((state: RootState) => state.profile.education || []);

  const {
    control,
    getValues,
    trigger,
  } = useForm({
    defaultValues: {
      education: educationState.length
        ? educationState
        : [
            {
              degree: '',
              institute: '',
              location: '',
              startYear: '',
              endYear: '',
            },
          ],
    },
    mode: 'onBlur',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'education',
  });

  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  // Expose submit to parent via ref
  useImperativeHandle(ref, () => ({
    submit: async () => {
      const isValid = await trigger();
      const allValues = getValues('education');

      const hasAtLeastOne = allValues.some(
        (entry) =>
          entry.degree &&
          entry.institute &&
          entry.location &&
          entry.startYear &&
          entry.endYear
      );

      if (isValid && hasAtLeastOne) {
        dispatch(updateProfile({ section: 'education', data: allValues }));
        onValidated();
      }
    },
  }));

  const isCurrentEntryValid = async () => {
    if (expandedIndex === null) return false;
    const current = getValues(`education.${expandedIndex}`);
    return (
      current?.degree &&
      current?.institute &&
      current?.location &&
      current?.startYear &&
      current?.endYear
    );
  };

  const handleAddEducation = async () => {
    if (await isCurrentEntryValid()) {
      setExpandedIndex(fields.length);
      append({
        degree: '',
        institute: '',
        location: '',
        startYear: '',
        endYear: '',
      });
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h6" fontWeight={600}>
          Education
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Details like course, university, and more help recruiters understand your educational background.
        </Typography>
      </Box>

      {/* Education entries */}
      {fields.map((field, index) => (
        <Box key={field.id} mb={2} sx={{ border: '1px solid #f0f0f0', borderRadius: 2 }}>
          {/* Accordion header */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px={2}
            py={1}
            sx={{
              cursor: 'pointer',
              bgcolor: '#F4F4F4',
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
            onClick={() => setExpandedIndex(index === expandedIndex ? null : index)}
          >
            <Box>
              <Typography fontWeight={500}>
                {field.degree || 'Degree not selected'}
              </Typography>
              <Typography fontSize="14px" color="text.secondary">
                {field.startYear && field.endYear
                  ? `${field.startYear} - ${field.endYear}`
                  : 'Duration not selected'}
              </Typography>
            </Box>
            <Box>
              {fields.length > 1 && (
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(index);
                  }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              )}
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedIndex(expandedIndex === index ? null : index);
                }}
              >
                <ExpandMore
                  fontSize="small"
                  sx={{
                    transform: expandedIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: '0.3s',
                  }}
                />
              </IconButton>
            </Box>
          </Box>

          {/* Accordion content */}
          <Collapse in={expandedIndex === index} timeout="auto" unmountOnExit>
            <Box px={2} py={3}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <CustomSelect
                    name={`education.${index}.degree`}
                    control={control}
                    label="Degree"
                    placeholder="Select degree"
                    options={degrees}
                    rules={{ required: 'Degree is required' }}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <CustomInput
                    name={`education.${index}.institute`}
                    control={control}
                    label="Institute name"
                    placeholder="Type your organisation"
                    rules={{ required: 'Institute name is required' }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <CustomInput
                    name={`education.${index}.location`}
                    control={control}
                    label="Location"
                    placeholder="Type your designation"
                    rules={{ required: 'Location is required' }}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <CustomSelect
                    name={`education.${index}.startYear`}
                    control={control}
                    label="Duration"
                    placeholder="Start year"
                    options={years}
                    rules={{ required: 'Start year is required' }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <CustomSelect
                    name={`education.${index}.endYear`}
                    control={control}
                    label=""
                    placeholder="End year"
                    options={years}
                    rules={{ required: 'End year is required' }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </Box>
      ))}

      {/* Add button */}
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={handleAddEducation}
        >
          Add education
        </Button>
      </Box>
    </Box>
  );
});

export default Education;
