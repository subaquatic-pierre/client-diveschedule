import { ActivityDetail } from "../../@types/schedule";
import { LoadingState } from "../../hooks/useFetchStatus";
import { SetState } from "../index";

export type BookingMeta = {
  activityType: string;
  id: string;
};

export interface IScheduleControls {
  createActivityDetail: (
    activityDetail,
    setState: SetState<LoadingState<any>>
  ) => void;

  editActivityDetail: (
    activityDetail,
    setState: SetState<LoadingState<any>>
  ) => void;

  createBooking: (bookingData, setState: SetState<LoadingState<any>>) => void;

  deleteBooking: (
    bookingId: string,
    setState: SetState<LoadingState<any>>
  ) => void;

  getDailyActivityMeta: (
    date: string,
    setState: SetState<LoadingState<BookingMeta[]>>
  ) => void;

  getActivityData: (
    activityId: string,
    setState: SetState<LoadingState<ActivityDetail>>
  ) => void;
}
