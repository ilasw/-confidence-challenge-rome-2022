import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "../../model/activity";

type ActivityState = User[];

const initialState: ActivityState = []

export const usersStore = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      return [...action.payload]
    }
  }
});

export const {setUsers} = usersStore.actions;