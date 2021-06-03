import { BaseController } from "../index";
import { IScheduleControls } from "./types";
import { DAILY_ACTIVITY_META, ACTIVITY_DATA } from "./queries";

export class ScheduleController extends BaseController {
  getActivityData = async (activityId, setState) => {
    setState({ loading: true, data: [], error: null });
    const { data, error } = await this._performApolloRequest({
      query: ACTIVITY_DATA,
      variables: { activityId: parseInt(activityId) },
      fetchPolicy: "network-only",
    });

    if (data) {
      setState({ loading: false, data: data.activityData, error: null });
    }
    if (error) {
      this.setError(error.message);
      setState({ loading: true, data: [], error: error.message });
    }
  };

  getDailyActivityMeta = async (date, setState) => {
    const { data, error } = await this._performApolloRequest({
      query: DAILY_ACTIVITY_META,
      variables: { date },
    });

    if (data) {
      setState({ loading: false, data: data.dailyActivityMeta, error: null });
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
      getActivityData: controller.getActivityData,
    };
  }
}
