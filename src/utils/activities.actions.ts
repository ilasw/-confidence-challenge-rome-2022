import Axios, { AxiosResponse } from 'axios';
import { Activity, User } from '../model/activity';

/**
 * Get All activities by workspace
 * @param id    workspace ID
 */
export const getActivities = async (id: number) => {
    const activities = await Axios.get<Activity[]>(`http://localhost:3001/activities?workspaceId=${id}`)
    const users = await Axios.get<User[]>('http://localhost:3001/users')
    return Promise.all([activities, users])
}

/**
 * Add a new Activity to workspace
 * @param title         activity title
 * @param workspaceId   workspace destination
 */
export const addActivity = async (title: string, workspaceId: number) => {
  return await Axios.post(`http://localhost:3001/activities/`, { title, workspaceId: +workspaceId, status: null })
};


/**
 * Delete Activity
 * @param id  activity ID
 */
export const deleteActivity = async (id: number) => {
    await Axios.delete(`http://localhost:3001/activities/${id}`)
};

/**
 * Clone Activity
 * @param activity    activity object
 */
export const cloneActivity = async (activity: Activity) => {
  const { id, ...activityToClone } = activity;
    return  await Axios.post(`http://localhost:3001/activities/`, {
      ...activityToClone, duration: null, priority: null, status: null
    })
};

/**
 * Update activity field
 * @param id          activity id
 * @param fieldName   field to update
 * @param fieldValue  new field value
 */
export const setField = async (id: number, fieldName: keyof Activity, fieldValue: any) => {
  await Axios.patch(`http://localhost:3001/activities/${id}`, { [fieldName]: fieldValue })
  // es. azione:
  // dispatch(ActivitiesActions.setFieldSuccess({ id, fieldName, fieldValue }))
};


// ==================================================================================
// UTILITY to clean DB and load fake activities in current workspace
// You don't need it. It's already in place
// ==================================================================================
export const resetActivities =  (workspaceId: number): Promise<Activity[]> => {
  return new Promise( async (resolve, reject) => {
    try {
      // 1. GET and DELETE all previous activities
      const currentActivities = await Axios.get<Activity[]>(`http://localhost:3001/activities/`);
      currentActivities.data
        .filter(a => a.workspaceId === workspaceId)
        .forEach((a) => {
          deleteActivity(a.id)
        })
      // 2. GET and SAVE default activities
      // this code is 💩 especially because of JSON limits
      setTimeout(async () => {
        const newActivities = await Axios.get<Activity[]>(`http://localhost:3001/resetActivities`)
        const calls: Promise<AxiosResponse<Activity>>[] = []
        newActivities.data.forEach( ( { id, ...activity} ) => {
          calls.push(Axios.post<Activity>(`http://localhost:3001/activities/`, { ...activity, workspaceId }))
        })
        Promise.all(calls).then(res => resolve(
          res.map(a => a.data)
        ))
      }, 100)
    } catch (err) {
      reject(err)
    }
  })

}
