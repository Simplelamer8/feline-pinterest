import { createSlice } from "@reduxjs/toolkit";

export interface NavbarInterface {
    activeTab: number
}

const initialState: NavbarInterface = {
    activeTab: 1
};

const navbarSlice = createSlice({
  name: "navbarSlice",
  initialState,
  reducers: {
    setActiveTab: (state, action:{payload: number}) => {
        state.activeTab = action.payload
    }
  },
});

export const { setActiveTab } =
  navbarSlice.actions;
export default navbarSlice.reducer;