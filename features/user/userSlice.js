import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user_photo: '',
  user_name: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfilePhoto: (state, action) => {
      state.user_photo = action.payload;
    },
    setUserProfileName: (state, action) => {
      state.user_name = action.payload;
    },
  },
});

export const { setUserProfilePhoto, setUserProfileName } = userSlice.actions;

export default userSlice.reducer;
