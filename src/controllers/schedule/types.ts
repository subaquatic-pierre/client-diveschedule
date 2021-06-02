import { LoadingState } from "../../hooks/useFetchStatus";
import { SetState } from "../index";

export type BookingMeta = {
  activityType: string;
  id: string;
};

export interface IScheduleControls {
  getDailyActivityMeta: (
    date: string,
    setState: SetState<LoadingState<BookingMeta[]>>
  ) => void;
}
