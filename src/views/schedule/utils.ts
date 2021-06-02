import { IBooking } from "../../@types/schedule";

export const filterBookings = (
  bookings: IBooking[],
  filterString: string
): IBooking[] =>
  bookings.filter((booking: IBooking) => booking.activityType === filterString);
