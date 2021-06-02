import React from "react";
import { IBooking } from "../../@types/schedule";

export interface IFormData {
  [key: string]: string | number | undefined | any;
  fullName?: string;
  diverRole?: string;
  certLevel?: string;
  equipment?: string;
  instructorName?: string;
}

const initialFormData: IFormData = {
  fullName: "",
  certLevel: "",
  instructorName: "",
  diverRole: "",
  equipment: "",
  time: "",
};

const buildFormData = (bookingData: IBooking): IFormData => {
  const {
    diverRole,
    equipment,
    diver: {
      id,
      profile: { fullName, certLevel },
    },
    instructor: {
      profile: { fullName: instructorName },
    },
  } = bookingData as any;
  return {
    userId: id,
    instructorName,
    fullName,
    diverRole,
    equipment,
    certLevel,
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
