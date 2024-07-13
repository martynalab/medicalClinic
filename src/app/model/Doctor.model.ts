export interface DoctorModel {
  pwz: String,
  name: String,
  workingHours: WorkingHours[];
}

export interface WorkingHours {
  day: string;
  start: string;
  end: string;
}
