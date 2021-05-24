import {
  IBooking,
  IDiveTripDetail,
  IUser,
} from "../../views/schedule/schedule";
import { formatDate } from "../../utils/date";
import { IFormData } from "./hooks";

export const buildFormData = (diveTripDetail: IDiveTripDetail): IFormData => {
  const date = formatDate(diveTripDetail.day.date, "server");
  const initialFormData: IFormData = {
    tripType: diveTripDetail.tripType,
    date,
    diveSite1: "",
    diveSite2: "",
    diveGuides: [],
  };

  if (diveTripDetail.id === -1) {
    return initialFormData;
  }
  const site1 =
    diveTripDetail.diveSite1 !== null
      ? diveTripDetail.diveSite1
      : initialFormData.diveSite1;
  const site2 =
    diveTripDetail.diveSite2 !== null
      ? diveTripDetail.diveSite2
      : initialFormData.diveSite2;
  return {
    id: diveTripDetail.id,
    time: diveTripDetail.time,
    date,
    tripType: diveTripDetail.tripType,
    diveSite1: site1,
    diveSite2: site2,
    diveGuides: diveTripDetail.diveGuides as IUser[],
  };
};

const capitalizeWord = (word: string): string => {
  const firstLetter = word.slice(0, 1).toUpperCase();
  const restWord = word.slice(1);
  const newWord = `${firstLetter}${restWord}`;
  return newWord;
};

export const formatSiteName = (siteName: string | undefined): string => {
  if (!siteName) return "None";
  const words = siteName.split("_");

  try {
    // Site starts with a Number
    if (words[0] === "A") {
      const newWords = words.splice(1);
      for (let i = 0; i < newWords.length; i++) {
        const lowerCase = newWords[i].toLowerCase();
        newWords[i] = capitalizeWord(lowerCase);
      }
      return newWords.join(" ");

      // Site is a normal name
    }
    for (let i = 0; i < words.length; i++) {
      const lowerCase = words[i].toLowerCase();
      words[i] = capitalizeWord(lowerCase);
    }
    return words.join(" ");
  } catch (error) {
    return "Site";
  }
};

export const getToolbarHeading = (
  tableType: string,
  tripDetail?: IDiveTripDetail
): string => {
  const { id, diveSite1, diveSite2, time } = tripDetail as IDiveTripDetail;

  const diveSites = diveSite1 !== null || diveSite2 !== null;
  const isTripDefined = id !== -1;

  // console.log(tripDetail);

  switch (tableType) {
    case "AM_BOAT":
      if (!isTripDefined) return "9am: Boat Trip";
      return `${time || `9am`}: ${
        diveSites
          ? `${formatSiteName(diveSite1)} & ${formatSiteName(diveSite2)}`
          : `Boat Trip`
      }`;
    case "PM_BOAT":
      if (!isTripDefined) return "1:30pm: Boat Trip";
      return `${time || `1:30pm`}: ${
        diveSites
          ? `${formatSiteName(diveSite1)} & ${formatSiteName(diveSite2)}`
          : `Boat Trip`
      }`;
    case "POOL":
      return `Pool Dives`;
    case "SHORE":
      return `Shore Dives`;
    case "CLASS":
      return `Classroom`;
    default:
      return "Details";
  }
};

export const boatBookingHeadFields: string[] = [
  "Diver Name",
  "Activity",
  "Cert Level",
  "Equipment",
];

export const trainingHeadFields: string[] = [
  "Diver Name",
  "Activity",
  "Instructor",
  "Equipment",
  "Time",
];

export const getHeadFields = (tripType: string): string[] => {
  switch (tripType) {
    case "AM_BOAT":
      return boatBookingHeadFields;
    case "PM_BOAT":
      return boatBookingHeadFields;
    default:
      return trainingHeadFields;
  }
};

export const getUserOptions = (data: any): any[] =>
  data.searchUsers.edges.map((edge: any) => edge.node.profile.fullName);

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
    activity: activity as string,
    tripType,
    date: formatDate(date, "server"),
    userId,
    equipment: equipment as string,
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

  return mutationData as any;
};
