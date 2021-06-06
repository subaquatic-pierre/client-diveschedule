import { User } from "./user";

interface IObjectKeys {
  [key: string]: string | number | Date | User;
}

export interface IScheduleInfo extends IObjectKeys {
  day: string;
  date: Date;
}

export interface IDay {
  id?: number;
  date: Date;
  teamMembersOff?: User[];
  noteSet?: INote[];
  activitydetailSet?: ITripDetail[];
}

export interface INote {
  id: number;
  day: IDay;
  title: string;
  text: string;
}

export type Booking = {
  id: number;
  activityDetail: ActivityDetail;
  time: string;
  initiatedDate: Date;
  bookedBy: User;
  diverRole: string;
  bookingStatus: string;
  equipment: string;
  diver: User;
  instructor?: User;
  cancellationReason?: string;
};

export type ActivityDetail = {
  id: number;
  day: IDay;
  activityType?: string;
  bookingSet: Booking[];
  diveSite1?: string;
  diveSite2?: string;
  time?: string;
  diveGuides?: User[];
};
