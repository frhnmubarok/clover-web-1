import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user_photo: '',
  user_name: '',
  user_isVerified: true,
  user_isLoggedIn: false,
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
    setUserIsVerified: (state, action) => {
      state.user_isVerified = action.payload;
    },
    setUserIsLoggedIn: (state, action) => {
      state.user_isLoggedIn = action.payload;
    },
  },
});

export const { setUserProfilePhoto, setUserProfileName, setUserIsVerified, setUserIsLoggedIn } = userSlice.actions;

export default userSlice.reducer;
