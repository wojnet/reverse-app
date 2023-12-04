"use client";
import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

export type OptionsState = {
  editMode: boolean,
}

const initialState: OptionsState = {
  editMode: true,
}

export const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    changeEditMode: (state, action) => {
        state.editMode = action.payload;
    }
  }
});

export const {
  changeEditMode,
} = optionsSlice.actions;

export const selectEditMode = (state: RootState) => state.options.editMode;

export default optionsSlice.reducer;