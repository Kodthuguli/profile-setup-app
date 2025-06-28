// src/features/profile/types.ts

export interface EducationEntry {
  degree: string;
  institute: string;
  location: string;
  startYear: string;
  endYear: string;
}

// You can also add this if needed
export interface WorkExperience {
  isFresher: boolean;
  totalExpYear: string;
  totalExpMonth: string;
  company: string;
  title: string;
  joiningYear: Number;
  joiningMonth: string;
  notice: string;
  profile: string;
}

export interface BasicInfo {
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  dob: string | null;
  state?: string;
  city?: string;
  linkedIn?: string;
}

export interface ResumeData {
  fileName: string;
  file: File | null;
}

export interface StepFormRef {
  submit: () => void;
}
