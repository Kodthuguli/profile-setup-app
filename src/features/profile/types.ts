// src/features/profile/types.ts

/**
 * Represents a single education record in the profile.
 */
export interface EducationEntry {
  degree: string;
  institute: string;
  location: string;
  startYear: string;
  endYear: string;
}

/**
 * Represents work experience details.
 */
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

/**
 * Represents basic personal and contact information.
 */
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

/**
 * Represents uploaded resume file metadata.
 */
export interface ResumeData {
  fileName: string;
  file: File | null;
}

/**
 * Reference object used to trigger form submission from parent.
 */
export interface StepFormRef {
  submit: () => void;
}
