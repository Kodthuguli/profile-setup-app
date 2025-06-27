import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


interface BasicInfo {
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  dob: string | null;
  state?: string;
  city?: string;
  linkedIn?: string;
}

interface ProfileState {
  basicInfo: BasicInfo;
  // Add other step data later (workExperience, education, etc.)
}

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
};

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
