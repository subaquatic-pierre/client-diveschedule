import { BaseController } from "../index";
import { IScheduleControls } from "./types";
import { DAILY_ACTIVITY_META } from "./queries";

export class ScheduleController extends BaseController {
  getActivityBookings = async (activityID, setState) => {
    setState({ loading: true, data: [], error: null });
    const { data, error } = await this._performApolloRequest({
      query: DAILY_ACTIVITY_META,
      variables: { activityID: parseInt(activityID) },
    });

    if (data) {
      setState({ loading: false, data: data, error: null });
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
