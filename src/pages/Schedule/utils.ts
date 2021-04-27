import { IBooking } from "./schedule";

export const filterBookings = (
  bookings: IBooking[],
  filterString: string
): IBooking[] => {
  return bookings.filter(
    (booking: IBooking) => booking.tripType === filterString
  );
};
