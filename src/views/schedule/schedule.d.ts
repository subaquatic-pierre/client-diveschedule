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
  teamMembersOff?: IUser[];
  noteSet?: INote[];
  tripdetailSet?: ITripDetail[];
}

export interface INote {
  id: number;
  day: IDay;
  title: string;
  text: string;
}

export interface IProfile {
  id: number;
  fullName: string;
  certLevel: string;
  equipment: string;
}

export interface IUser {
  id: number;
  email: string;
  profile: Profile;
}

export interface IBooking extends IObjectKeys {
  id: number;
  tripDetail: IDiveTripDetail;
  time: string;
  initiatedDate: Date;
  bookedBy: IUser;
  activity: string;
  bookingStatus: string;
  equipment: string;
  diver: IUser;
  instructor?: IUser;
  cancellationReason?: string;
}

export interface IDiveTripDetail {
  id: number;
  day: IDay;
  tripType?: string;
  bookingSet: IBooking[];
  diveSite1?: string;
  diveSite2?: string;
  time?: string;
  diveGuides?: IUser[];
}
