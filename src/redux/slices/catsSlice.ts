import { createSlice } from "@reduxjs/toolkit";

export interface CatInterface{
    id: string,
    url: string,
    favourite: boolean
}

export interface CatsInterface {
    cats: CatInterface[],
    pageNumber: number
}

const initialState: CatsInterface = {
    cats: [],
    pageNumber: 0
};

const catsSlice = createSlice({
  name: "catsSlice",
  initialState,
  reducers: {
    setCats: (state, action:{payload: CatInterface[]}) => {
        state.cats = action.payload;
    },
    addToFavourite: (state, action: {payload: string}) => {
      state.cats = state.cats.map((cat) => {
        if (cat.id === action.payload)
        {
          return {...cat, favourite: !cat.favourite};
        }
        return cat;
      })
    },
    incrementPageNumber: (state) => {
      state.pageNumber++;
    }
  },
});

export const { setCats, addToFavourite, incrementPageNumber } =
  catsSlice.actions;
export default catsSlice.reducer;