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
  isFetching: boolean,
  fetchError: string | null | undefined,
  isInsertingNewProject: boolean,
  insertError: string | null | undefined,
}

const initialState: ProjectsState = {
  projectsData: [],
  isFetching: false,
  fetchError: null,
  isInsertingNewProject: false,
  insertError: null,
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
    return await fetch(`/api/projects/changeName`, {
      method: "PUT",
      cache: "no-store",
      body: JSON.stringify({ id, name }),
    }).then(res => res.json());
  }
);

export const addNewProject = createAsyncThunk(
  "projects/addNewProject",
  async ({ name }: { name: string | undefined }) => {
    return await fetch(`/api/projects/addNew`, {
      method: "PUT",
      cache: "no-store",
      body: JSON.stringify({ name }),
    }).then(res => res.json());
  }
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async ({ id }: { id: string }) => {
    return await fetch(`/api/projects/delete`, {
      method: "DELETE",
      cache: "no-store",
      body: JSON.stringify({ id }),
    }).then(res => res.json());
  }
);

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProjectsData.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(fetchProjectsData.fulfilled, (state, action) => {
      state.isFetching = false;
      state.projectsData = action.payload;
    });
    builder.addCase(fetchProjectsData.rejected, (state, action) => {
      state.isFetching = false;
      state.fetchError = action.error.message;
    });

    builder.addCase(changeProjectName.fulfilled, (state, action) => {
      state.projectsData = state.projectsData.map(project => {
        let tempProject = project;
        if (tempProject._id === action.payload.id) {
          tempProject.name = action.payload.name;
        }
        return tempProject;
      });
    });

    builder.addCase(addNewProject.pending, (state) => {
      state.isInsertingNewProject = true;
    });
    builder.addCase(addNewProject.fulfilled, (state, action) => {
      state.isInsertingNewProject = false;

      const id = action.payload.response.insertedId;
      const name = action.payload.name;

      state.projectsData = [...state.projectsData, {
        _id: id,
        name,
      }];
    });
    builder.addCase(addNewProject.rejected, (state) => {
      state.isInsertingNewProject = false;
      state.insertError = "Failed inserting project";
    });

    builder.addCase(deleteProject.fulfilled, (state, action) => {
      state.projectsData = state.projectsData.filter(project => project._id !== action.payload.id);
    });
  }
});

export const selectProjectsData = (state: RootState) => state.projects.projectsData;
export const selectIsFetching = (state: RootState) => state.projects.isFetching;
export const selectFetchError = (state: RootState) => state.projects.fetchError;
export const selectIsInsertingNewProject = (state: RootState) => state.projects.isInsertingNewProject;
export const selectInsertError = (state: RootState) => state.projects.insertError;

export default projectsSlice.reducer;