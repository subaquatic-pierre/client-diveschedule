import { BaseController } from "../index";
import { IScheduleControls } from "./types";
import { DELETE_BOOKING } from "./queries";

export class ScheduleController extends BaseController {
  getDailyActivityMeta = async (date, setState) => {
    const { data, error } = await this._performApolloRequest({
      query: DELETE_BOOKING,
      variables: { date },
    });

    if (data) {
      console.log(data);
    }
    if (error) {
      this.setError(error.message);
    }
  };

  public static getControls(client, history?): IScheduleControls {
    const controller = new ScheduleController(client, history);
    return {
      getDailyActivityMeta: controller.getDailyActivityMeta,
    };
  }
}
