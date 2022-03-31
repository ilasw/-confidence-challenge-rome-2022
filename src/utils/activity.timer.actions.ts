import Axios from 'axios';
import { STATUS_MODE } from '../model/activity';

/**
 * Start activity timer
 * (save RUNNING status on database)
 * @param id          activity ID
 */
export const setActivityStart = async (id: number) => {
  return await Axios.patch(`http://localhost:3001/activities/${id}`, { status: STATUS_MODE.RUNNING })
}

/**
 * Pause activity timer
 * (save PAUSED status on database)
 * @param id          activity ID
 * @param duration    activity duration (in seconds)
 */
export const setActivityPause = async (id: number, duration: number) => {
   return await Axios.patch(`http://localhost:3001/activities/${id}`, { status: STATUS_MODE.PAUSED, duration})
}

/**
 * Stop activity timer
 * (save COMPLETED status on database)
 * @param id          activity ID
 * @param duration    total activity duration (in seconds)
 */
export const setActivityCompleted = async (id: number, duration: number) => {
   return await Axios.patch(`http://localhost:3001/activities/${id}`, { status: STATUS_MODE.COMPLETED, duration })
}
