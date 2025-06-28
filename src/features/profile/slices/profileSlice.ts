// src/features/profile/slices/profileSlice.ts

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { BasicInfo, EducationEntry, WorkExperience } from '../types';

/**
 * Represents uploaded resume file metadata.
 */
interface ResumeData {
  fileName: string;
  file: File | null;
}

/**
 * Root profile state structure maintained in Redux.
 */
interface ProfileState {
  basicInfo: BasicInfo;
  workExperience: WorkExperience;
  education: EducationEntry[];
  resume: ResumeData;
}

/**
 * Initial default state for profile.
 */
const initialState: ProfileState = {
  basicInfo: {
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
    state: '',
    city: '',
    linkedIn: '',
  },
  workExperience: {
    isFresher: false,
    totalExpYear: '',
    totalExpMonth: '',
    company: '',
    title: '',
    joiningYear: 0,
    joiningMonth: '',
    notice: '',
    profile: '',
  },
  education: [],
  resume: {
    fileName: '',
    file: null,
  },
};

/**
 * Profile slice definition using Redux Toolkit.
 */
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    /**
     * Generic update handler for profile sections (e.g., basicInfo, workExperience).
     */
    updateProfile: (
      state,
      action: PayloadAction<{ section: keyof ProfileState; data: any }>
    ) => {
      const { section, data } = action.payload;
      state[section] = data;
    },
  },
});

// Export actions and reducer
export const { updateProfile } = profileSlice.actions;
export default profileSlice.reducer;
