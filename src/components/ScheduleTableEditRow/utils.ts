import { IBooking } from "../../pages/Schedule/schedule";
import { formatDate } from "../../utils/date";
import { IFormData } from "./hooks";

export const getUserOptions = (data: any): any[] => {
  return data.searchUsers.edges.map((edge: any) => edge.node.profile.fullName);
};

export const getUser = (userName: string, data: any): IUser | undefined => {
  try {
    const edge = data.searchUsers.edges.filter(
      (edge: any) => edge.node.profile.fullName === userName
    )[0];
    return edge.node;
  } catch {
    return undefined;
  }
};

export interface IBaseBooking {
  [key: string]: any | undefined;
  activity: string;
  equipment: string;
  id?: number;
  tripType?: string;
  date?: string;
  time?: string;
  instructorId?: number;
}

export interface ICreateBooking extends IBaseBooking {}

export interface IEditBooking extends IBaseBooking {}

export const buildCreateBookingData = (
  formData: IFormData,
  tripType: string,
  date: Date
): ICreateBooking => {
  const { userId, activity, equipment, time, instructorId } = formData;
  return {
    activity,
    tripType,
    date: formatDate(date, "server"),
    userId,
    equipment,
    instructorId: instructorId as number,
    time: time as string,
  };
};

export const buildEditBookingData = (
  formData: IFormData,
  bookingData: IBooking
): IEditBooking => {
  const { equipment, activity } = formData;
  const mutationData = {
    id: bookingData.id,
    equipment,
    activity,
  };

  return mutationData;
};
