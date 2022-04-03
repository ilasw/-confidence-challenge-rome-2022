import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Activity} from "../../model/activity";
import {RootState} from "../../index";

type ActivityState = {
  items: any[]
};

export type EditActivityParams<T extends keyof Activity> = { id: Activity['id'], key: T, value: Activity[T] };

const initialState: ActivityState = {
  items: []
}

export const activitiesStore = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    saveActivities(state, action: PayloadAction<Activity[]>) {
      console.log({state, action})
      return {...state, items: action.payload}
    },
    saveNewActivity(state, action: PayloadAction<Activity>) {
      return {...state, items: [...state.items, action.payload]}
    },
    removeActivity(state, action: PayloadAction<Activity['id']>) {
      return {...state, items: state.items.filter(({id}) => id !== action.payload)}
    },
    updateActivity(state, action: PayloadAction<Activity>) {
      return {
        ...state,
        items: state.items.map((item) => (item.id === action.payload.id) ? action.payload : item)
      }
    }
  }
});

export const {saveActivities, saveNewActivity, removeActivity, updateActivity} = activitiesStore.actions;