import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { BasicInfo, EducationEntry, WorkExperience } from '../types';

// ✅ Extend Resume type
interface ResumeData {
  fileName: string;
  file: File | null;
}

// ✅ State structure
interface ProfileState {
  basicInfo: BasicInfo;
  workExperience: WorkExperience;
  education: EducationEntry[];
  resume: ResumeData;
}

// ✅ Initial state
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

// ✅ Slice definition
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile: (
      state,
      action: PayloadAction<{ section: keyof ProfileState; data: any }>
    ) => {
      const { section, data } = action.payload;
      state[section] = data;
    },
  },
});

// ✅ Exports
export const { updateProfile } = profileSlice.actions;
export default profileSlice.reducer;
