"use client";
import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

export type OptionsState = {
  editMode: boolean,
  devMode: boolean,
}

const initialState: OptionsState = {
  editMode: true,
  devMode: false,
}

export const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    changeEditMode: (state, action) => {
        state.editMode = action.payload;
    },
    changeDevMode: (state, action) => {
      state.devMode = action.payload;
    },
    toggleDevMode: (state) => {
      state.devMode = !state.devMode;
    },
  }
});

export const {
  changeEditMode,
  changeDevMode,
  toggleDevMode,
} = optionsSlice.actions;

export const selectEditMode = (state: RootState) => state.options.editMode;
export const selectDevMode = (state: RootState) => state.options.devMode;

export default optionsSlice.reducer;