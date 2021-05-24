export interface Assignment {
  id: string;
  title: string;
  description: string;
  type: string;
  maxGrade: number;
  gradePercentage: number;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  isActive: boolean;
  isVisible: boolean;
  // file: File[]

}
