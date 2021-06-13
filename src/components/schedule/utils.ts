import { Booking, ActivityDetail } from "../../@types/schedule";
import { User } from "../../@types/user";
import { formatDate } from "../../utils/formatDate";
import { IFormData } from "./hooks";

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
  activityDetail?: ActivityDetail
): string => {
  const { id, diveSite1, diveSite2, time } = activityDetail as ActivityDetail;

  const diveSites = diveSite1 !== null || diveSite2 !== null;
  const isTripDefined = id !== -1;

  // console.log(activityDetail);

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
  "Role",
  "Cert Level",
  "Equipment",
];

export const trainingHeadFields: string[] = [
  "Diver Name",
  "Role",
  "Instructor",
  "Equipment",
  "Time",
];

export const getHeadFields = (activityType: string): string[] => {
  switch (activityType) {
    case "AM_BOAT":
      return boatBookingHeadFields;
    case "PM_BOAT":
      return boatBookingHeadFields;
    default:
      return trainingHeadFields;
  }
};
