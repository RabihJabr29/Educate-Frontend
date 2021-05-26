export interface Assignment {
  _id: string;
  name: string;
  description: string;
  type: string;
  maxGrade: number;
  gradePercentage: number;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  visibility: string;
  isActive: boolean;
  allowMultipleSubmissions: boolean;
  allowLateSubmissions: boolean;
  isVisible: boolean;
  // file: File[]

}
