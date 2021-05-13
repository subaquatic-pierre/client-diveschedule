export const boatBookingHeadFields: string[] = [
  "Diver Name",
  "Activity",
  "Cert Level",
  "Equipment"
];

export const trainingHeadFields: string[] = [
  "Diver Name",
  "Activity",
  "Instructor",
  "Equipment",
  "Time"
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
