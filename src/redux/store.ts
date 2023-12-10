"use client";
import {
    configureStore,
} from "@reduxjs/toolkit";
import optionsReducer from "../app/features/options/optionsSlice";
import projectsReducer from "../app/features/projects/projectsSlice";
import songReducer from "../app/features/song/songSlice";

export const store = configureStore({
    reducer: {
        options: optionsReducer,
        projects: projectsReducer,
        song: songReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;