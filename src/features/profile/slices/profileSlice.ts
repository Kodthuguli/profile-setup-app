import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// ✅ Step 1: Define BasicInfo
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

// ✅ Step 2: Define WorkExperience
interface WorkExperience {
  isFresher: boolean;
  totalExpYear?: string;
  totalExpMonth?: string;
  company?: string;
  title?: string;
  joiningYear?: Number;
  joiningMonth?: string;
  notice?: string;
  profile?: string;
}

// ✅ Step 3: Extend ProfileState
interface ProfileState {
  basicInfo: BasicInfo;
  workExperience: WorkExperience;
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
