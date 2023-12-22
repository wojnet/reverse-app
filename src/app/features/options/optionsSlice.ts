"use client";
import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

export type OptionsState = {
  editMode: boolean,
  devMode: boolean,
  mobileMode: boolean,
  isMobileNavbarVisible: boolean,
}

const initialState: OptionsState = {
  editMode: true,
  devMode: false,
  mobileMode: false,
  isMobileNavbarVisible: false,
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
    changeMobileMode: (state, action) => {
      state.mobileMode = action.payload;
    },
    changeIsMobileNavbarVisible: (state, action) => {
      state.isMobileNavbarVisible = action.payload;
    },
  }
});

export const {
  changeEditMode,
  changeDevMode,
  toggleDevMode,
  changeMobileMode,
  changeIsMobileNavbarVisible,
} = optionsSlice.actions;

export const selectEditMode = (state: RootState) => state.options.editMode;
export const selectDevMode = (state: RootState) => state.options.devMode;
export const selectMobileMode = (state: RootState) => state.options.mobileMode;
export const selectIsMobileNavbarVisible = (state: RootState) => state.options.isMobileNavbarVisible;

export default optionsSlice.reducer;