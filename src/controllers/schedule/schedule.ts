import { BaseController } from "../index";
import { IScheduleControls } from "./types";
import { DAILY_ACTIVITY_META, ACTIVITY_BOOKINGS } from "./queries";

export class ScheduleController extends BaseController {
  getActivityBookings = async (activityId, setState) => {
    setState({ loading: true, data: [], error: null });
    const { data, error } = await this._performApolloRequest({
      query: ACTIVITY_BOOKINGS,
      variables: { activityId: 2 },
    });

    if (data) {
      setState({ loading: false, data: data.activityBookings, error: null });
    }
    if (error) {
      this.setError(error.message);
      setState({ loading: true, data: [], error: error.message });
    }
  };
  getDailyActivityMeta = async (date, setState) => {
    setState({ loading: true, data: [], error: null });
    const { data, error } = await this._performApolloRequest({
      query: DAILY_ACTIVITY_META,
      variables: { date },
    });

    if (data) {
      setState({ loading: false, data: data, error: null });
    }
    if (error) {
      this.setError(error.message);
      setState({ loading: true, data: [], error: error.message });
    }
  };

  public static getControls(client, history?): IScheduleControls {
    const controller = new ScheduleController(client, history);
    return {
      getDailyActivityMeta: controller.getDailyActivityMeta,
      getActivityBookings: controller.getActivityBookings,
    };
  }
}
