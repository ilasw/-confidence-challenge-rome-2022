import {AppThunk} from "../../index";
import {
  addActivity,
  cloneActivity,
  deleteActivity,
  getActivities,
  resetActivities, setField
} from "../../utils/activities.actions";
import {removeActivity, saveActivities, saveNewActivity, updateActivity} from "./activities.store";
import {setUsers} from "../users";
import {Activity} from "../../model/activity";

export const doGetActivities = (workspaceId: string): AppThunk => async (dispatch) => {
  try {
    const [
      {data: activities},
      {data: users}
    ] = await getActivities(Number(workspaceId));

    dispatch(saveActivities(activities));
    dispatch(setUsers(users));
  } catch (err) {
    // dispatch(searchFailed());
  }
};

export const doResetActivities = (workspaceId: string): AppThunk => async (dispatch) => {
  try {
    const activities = await resetActivities(Number(workspaceId));
    dispatch(saveActivities(activities));
  } catch (err) {
    // dispatch(searchFailed());
  }
};

export const doAddActivity = (title: string, workspaceId: string): AppThunk => async (dispatch) => {
  try {
    const {data: activity} = await addActivity(title, Number(workspaceId));
    dispatch(saveNewActivity(activity));
  } catch (err) {
    // dispatch(searchFailed());
  }
}

export const doRemoveActivity = (id: Activity['id']): AppThunk => async (dispatch) => {
  try {
    await deleteActivity(id);
    dispatch(removeActivity(id));
  } catch (err) {
    // dispatch(searchFailed());
  }
}

export const doCloneActivity = (activity: Activity): AppThunk => async (dispatch) => {
  try {
    const {data} = await cloneActivity(activity);
    dispatch(saveNewActivity(data));
  } catch (err) {
    // dispatch(searchFailed());
  }
}

export const doEditActivityField = <T extends keyof Activity>(id: Activity['id'], key: T, value: Activity[T]): AppThunk => async (dispatch) => {
  try {
    const {data: activity} = await setField(id, key, value);
    dispatch(updateActivity(activity));
  } catch (err) {
    // dispatch(searchFailed());
  }
}