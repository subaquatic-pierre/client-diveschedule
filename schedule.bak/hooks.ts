import React from "react";
import { IBooking } from "../../views/Schedule/schedule";

export interface IFormData {
  [key: string]: string | number | undefined;
  fullName: string;
  activity: string;
  certificationLevel: string;
  equipment: string;
  instructorName?: string;
}

const initialFormData: IFormData = {
  fullName: "",
  certificationLevel: "",
  instructorName: "",
  activity: "",
  equipment: "",
  time: "",
};

const buildFormData = (bookingData: IBooking): IFormData => {
  const {
    activity,
    equipment,
    diver: {
      id,
      profile: { fullName, certificationLevel },
    },
    instructor: {
      profile: { fullName: instructorName },
    },
  } = bookingData;
  return {
    userId: id,
    instructorName,
    fullName,
    activity,
    equipment,
    certificationLevel,
  };
};

type IHooksReturn = [
  IFormData,
  React.Dispatch<React.SetStateAction<IFormData>>
];

export const useFormData = (
  bookingData: IBooking | undefined
): IHooksReturn => {
  const initialData: IFormData = bookingData
    ? buildFormData(bookingData)
    : initialFormData;
  const [formData, setFormData] = React.useState<IFormData>(initialData);

  return [formData, setFormData];
};
