"use client";
import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import { ProjectType } from "@/types/project";
import { getProjects } from "@/utils/projects/getProjects";
  
export type ProjectsState = {
  projectsData: ProjectType[],
  isLoading: boolean,
  error: string | null | undefined,
}

const initialState: ProjectsState = {
  projectsData: [],
  isLoading: false,
  error: null,
}

export const fetchProjectsData = createAsyncThunk(
  "projects/fetchProjectsData",
  async () => {
    const projectsData: ProjectType[] = await getProjects();
    return projectsData;
  }
)

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProjectsData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProjectsData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.projectsData = action.payload;
    });
    builder.addCase(fetchProjectsData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  }
});

export const selectProjectsData = (state: RootState) => state.projects.projectsData;
export const selectIsLoading = (state: RootState) => state.projects.isLoading;
export const selectError = (state: RootState) => state.projects.error;

export default projectsSlice.reducer;