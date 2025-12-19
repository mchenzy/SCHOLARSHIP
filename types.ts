
export interface EligibilityData {
  institution: string;
  fieldOfStudy: string;
  academicLevel: string;
  country: string;
}

export interface AchievementData {
  role: string;
  action: string;
  outcome: string;
}

export interface ApplicationData {
  eligibility: EligibilityData;
  alignment: string;
  achievement: AchievementData;
  intent: string;
  context: string;
}

export enum AppStep {
  LANDING = 0,
  ELIGIBILITY = 1,
  ALIGNMENT = 2,
  ACHIEVEMENT = 3,
  INTENT = 4,
  CONTEXT = 5,
  SUMMARY = 6,
}

export const CHECKLIST_ITEMS = [
  "I have provided specific numbers or measurable outcomes in my achievements.",
  "My field of study alignment directly addresses a specific problem or mission.",
  "I have avoided generic phrases like 'I am passionate' or 'I am a hard worker'.",
  "My future goals are concrete, specific, and time-bound."
];
