import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchString: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    searchProject: (state, action) => {
      state.searchString = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { searchProject } = filterSlice.actions;
