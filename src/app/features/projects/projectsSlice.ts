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
);

export const changeProjectName = createAsyncThunk(
  "projects/changeProjectName",
  async ({ id, name }: { id: string, name: string }) => {
    const mongoResponse = await fetch(`/api/projects/changeName`, {
      method: "PUT",
      cache: "no-store",
      body: JSON.stringify({ id, name }),
    }).then(res => res.json());
    return mongoResponse;
  }
);

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    changeProjectName: (state, action: { payload: { id: string, name: string } }) => {
      state.projectsData = state.projectsData.map((project) => {
        return project._id !== action.payload.id ? 
          project : { ...project, name: action.payload.name }
      });
    }
  },
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

    builder.addCase(changeProjectName.pending, (state) => {
      
    });
    builder.addCase(changeProjectName.fulfilled, (state, action) => {
      console.log(action.payload);
      state.projectsData = state.projectsData.map(project => {
        let tempProject = project;
        if (tempProject._id === action.payload.id) {
          tempProject.name = action.payload.name;
        }
        return tempProject;
      });
    });
    builder.addCase(changeProjectName.rejected, (state, action) => {
      
    });
  }
});

export const selectProjectsData = (state: RootState) => state.projects.projectsData;
export const selectIsLoading = (state: RootState) => state.projects.isLoading;
export const selectError = (state: RootState) => state.projects.error;

export default projectsSlice.reducer;