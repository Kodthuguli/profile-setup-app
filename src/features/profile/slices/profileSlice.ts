import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { BasicInfo, EducationEntry, WorkExperience } from '../types';


interface ProfileState {
  basicInfo: BasicInfo;
  workExperience: WorkExperience;
  education: EducationEntry[];        // ✅ NEW
}

// ✅ Step 4: Add default state
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
};

// ✅ Step 5: Slice with dynamic update
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

export const { updateProfile } = profileSlice.actions;
export default profileSlice.reducer;
