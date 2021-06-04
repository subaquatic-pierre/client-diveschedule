import { BaseController } from "../index";
import { IScheduleControls } from "./types";
import {
  DAILY_ACTIVITY_META,
  ACTIVITY_DATA,
  CREATE_BOOKING,
  DELETE_BOOKING,
  CREATE_ACTIVITY_DETAIL,
  EDIT_ACTIVITY_DETAIL,
} from "./queries";

export class ScheduleController extends BaseController {
  createActivityDetail = async (activityDetail, setState) => {
    const { data, error } = await this._performApolloRequest({
      mutation: CREATE_ACTIVITY_DETAIL,
      variables: activityDetail,
    });

    if (data) {
      this.getActivityData(
        data.createActivityDetail.activityDetail.id,
        setState
      );
      this.setSuccess("Activity successfully created");
    }
    if (error) {
      this.setError(error.message);
      setState({ loading: true, data: activityDetail, error: error.message });
    }
  };

  editActivityDetail = async (activityDetail, setState) => {
    setState({ loading: true, data: [], error: null });
    const { data, error } = await this._performApolloRequest({
      mutation: EDIT_ACTIVITY_DETAIL,
      variables: activityDetail,
    });

    if (data) {
      this.getActivityData(data.editActivityDetail.activityDetail.id, setState);
      this.setSuccess("Activity successfully updated");
    }
    if (error) {
      this.setError(error.message);
      setState({ loading: true, data: activityDetail, error: error.message });
    }
  };

  createBooking = async (bookingData, setState) => {
    setState({ loading: true, data: [], error: null });
    const { data, error } = await this._performApolloRequest({
      mutation: CREATE_BOOKING,
      variables: { bookingData },
    });

    if (data) {
      console.log(data);
      // setState({ loading: false, data: data.activityData, error: null });
    }
    if (error) {
      this.setError(error.message);
      setState({ loading: true, data: [], error: error.message });
    }
  };

  deleteBooking = async (bookingId, setState) => {
    const { data, error } = await this._performApolloRequest({
      mutation: DELETE_BOOKING,
      variables: { bookingId: parseInt(bookingId) },
    });

    if (data) {
      console.log(data);
      // setState({ loading: false, data: data.activityData, error: null });
    }
    if (error) {
      this.setError(error.message);
      setState({ loading: true, data: [], error: error.message });
    }
  };

  getActivityData = async (activityId, setState) => {
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
      createBooking: controller.createBooking,
      deleteBooking: controller.deleteBooking,
      createActivityDetail: controller.createActivityDetail,
      editActivityDetail: controller.editActivityDetail,
    };
  }
}
