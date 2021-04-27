import { IFormData } from "./EditTripDetailForm";
import { IDiveTripDetail, IUser } from "../../pages/Schedule/schedule";
import { formatDate } from "../../utils/date";
import { formatSiteName } from "../ScheduleTableToolbar/utils";

export const buildFormData = (diveTripDetail: IDiveTripDetail): IFormData => {
  const date = formatDate(diveTripDetail.day.date, "server");
  const initialFormData: IFormData = {
    tripType: diveTripDetail.tripType,
    date: date,
    diveSite1: "",
    diveSite2: "",
    diveGuides: [],
  };

  if (diveTripDetail.id === -1) {
    return initialFormData;
  } else {
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
      date: date,
      tripType: diveTripDetail.tripType,
      diveSite1: site1,
      diveSite2: site2,
      diveGuides: diveTripDetail.diveGuides as IUser[],
    };
  }
};
