import { Booking } from "../../@types/schedule";

export const filterBookings = (
  bookings: Booking[],
  filterString: string
): Booking[] =>
  bookings.filter(
    (booking: Booking) => booking.activityDetail.activityType === filterString
  );
