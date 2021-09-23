const { createSlice } = require("@reduxjs/toolkit");

const launchesSlice = createSlice({
  name: "launches",
  initialState: { loading: false, data: [] },
  reducers: {
    setLaunchesState: (state, action) => ({ ...state, ...action.payload }),
    setLaunches: (state, action) => ({ ...state, data: action.payload }),
  },
});

export const {
  loadLaunches = "launches/loadLaunches",
  setLaunchesState,
  setLaunches,
} = launchesSlice.actions;
export default launchesSlice.reducer;
