import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 'en',
  status: 'idle',
};

export const selectLanguageSlice = createSlice({
  name: 'language',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setCurrentLanguage: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = action.payload;
    }
  }
});

export const { setCurrentLanguage } = selectLanguageSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.language.value)`
export const selectCurrentLanguage = (state) => state.language.value;

export default selectLanguageSlice.reducer;
