import {RootState} from "../../index";

export const selectActivities = (state: RootState) => state?.activity?.items;