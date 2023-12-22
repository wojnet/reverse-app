"use client";
import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import { SongType } from "@/types/song";
import { getSong } from "@/utils/song/getSong";
import { getEmptyBlock } from "./emptyBlocks";
import { saveSong } from "@/utils/song/saveSong";
  
export type SongState = {
  songData: SongType,
  isLoading: boolean,
  error: string | null | undefined,
  isSaved: boolean,
  isSaveLoading: boolean,
}

const initialState: SongState = {
  songData: {
    _id: "",
    name: "",
    userId: "",
    contents: []
  },
  isLoading: false,
  error: null,
  isSaved: true,
  isSaveLoading: false,
}

export const fetchSongData = createAsyncThunk(
  "song/fetchSongData",
  async ({ id }: { id: string }) => {
    const songData: SongType = await getSong(id);
    return songData;
  }
);

export const saveChanges = createAsyncThunk(
  "song/saveChanges",
  async (arg, { getState }) => {
    const state: any = getState();
    const response = await saveSong(
      state.song.songData._id,
      state.song.songData.contents
    );
    return response;
  }
)

export const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    changeBlock: (state, action: PayloadAction<{ index: number, changedBlockData: any }>) => {
      if (state.songData === null) return state;

      const blockIndex = action.payload.index;
      const changedBlockData = action.payload.changedBlockData;

      return {
        ...state,
        isSaved: false,
        songData: {
          ...state.songData,
          contents: state.songData.contents.map((block, index) => {
            if (index !== blockIndex) {
              return block;
            }
            return {
              type: state.songData.contents[blockIndex].type,
              data: {
                ...state.songData?.contents[blockIndex].data,
                ...changedBlockData,
              }
            };
          }),
        }
      }
    },
    removeBlock: (state, action) => {
      if (state.songData === null) return;

      return {
        ...state,
        isSaved: false,
        songData: {
          ...state.songData,
          contents: [...state.songData.contents.slice(0, action.payload), ...state.songData.contents.slice(action.payload + 1)]
        }
      }
    },
    addBlock: (state, action) => {
      if (state.songData === null) return;

      const emptyBlock = getEmptyBlock(action.payload.type);
      if (!emptyBlock) return;
      
      return {
        ...state,
        isSaved: false,
        songData: {
          ...state.songData,
          contents: [...state.songData?.contents, emptyBlock]
        }
      }
    },
    changeChord: (state, action) => {
      const { index, paragraphIndex, blockIndex, changedChord } = action.payload;
      state.songData.contents[blockIndex].data.paragraphs[paragraphIndex].chords[index] = { 
        ...state.songData.contents[blockIndex].data.paragraphs[paragraphIndex].chords[index],
        ...changedChord,
      };
      state.isSaved = false;
    },
    moveChord: (state, action) => {
      const { index, paragraphIndex, blockIndex, number } = action.payload;
      const newPosition = state.songData.contents[blockIndex].data.paragraphs[paragraphIndex].chords[index].position + number;

      if (newPosition < 0) return state;

      state.songData.contents[blockIndex].data.paragraphs[paragraphIndex].chords[index] = { 
        ...state.songData.contents[blockIndex].data.paragraphs[paragraphIndex].chords[index],
        position: newPosition,
      };
      state.isSaved = false;
    },
    removeChord: (state, action) => {
      const { index, paragraphIndex, blockIndex } = action.payload;
      state.songData.contents[blockIndex].data.paragraphs[paragraphIndex].chords = [
        ...state.songData.contents[blockIndex].data.paragraphs[paragraphIndex].chords.slice(0, index),
        ...state.songData.contents[blockIndex].data.paragraphs[paragraphIndex].chords.slice(index + 1),
      ]
      state.isSaved = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSongData.pending, (state) => {
      return {
        ...state,
        isLoading: true,
        isSaved: true,
      };
    });
    builder.addCase(fetchSongData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.songData = action.payload;
    });
    builder.addCase(fetchSongData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(saveChanges.fulfilled, (state, action) => {
      state.isSaved = true;
      state.isSaveLoading = false;
    });
    builder.addCase(saveChanges.rejected, (state, action) => {
      state.isSaveLoading = false;
    });
    builder.addCase(saveChanges.pending, (state, action) => {
      state.isSaveLoading = true;
    });
  }
});

export const {
  changeBlock,
  removeBlock,
  addBlock,
  changeChord,
  moveChord,
  removeChord,
} = songSlice.actions;

export const selectSongData = (state: RootState) => state.song.songData;
export const selectIsLoading = (state: RootState) => state.song.isLoading;
export const selectError = (state: RootState) => state.song.error;
export const selectIsSaved = (state: RootState) => state.song.isSaved;
export const selectIsSaveLoading = (state: RootState) => state.song.isSaveLoading;

export default songSlice.reducer;