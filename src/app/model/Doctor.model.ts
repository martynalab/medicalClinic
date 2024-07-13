export interface DoctorModel {
  pwz: string,
  name: string,
  workingHours: WorkingHours[];
}

export interface WorkingHours {
  day: string;
  start: string;
  end: string;
}
