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
  isAccentPaletteVisible: boolean,
}

const initialState: OptionsState = {
  editMode: true,
  devMode: false,
  mobileMode: false,
  isMobileNavbarVisible: false,
  isAccentPaletteVisible: false,
}

export const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    changeEditMode: (state, action) => {
      state.editMode = action.payload;
    },
    toggleEditMode: (state) => {
      state.editMode = !state.editMode;
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
    toggleIsAccentPaletteVisible: (state) => {
      state.isAccentPaletteVisible = !state.isAccentPaletteVisible;
    }
  }
});

export const {
  changeEditMode,
  toggleEditMode,
  changeDevMode,
  toggleDevMode,
  changeMobileMode,
  changeIsMobileNavbarVisible,
  toggleIsAccentPaletteVisible,
} = optionsSlice.actions;

export const selectEditMode = (state: RootState) => state.options.editMode;
export const selectDevMode = (state: RootState) => state.options.devMode;
export const selectMobileMode = (state: RootState) => state.options.mobileMode;
export const selectIsMobileNavbarVisible = (state: RootState) => state.options.isMobileNavbarVisible;
export const selectIsAccentPaletteVisible = (state: RootState) => state.options.isAccentPaletteVisible;

export default optionsSlice.reducer;