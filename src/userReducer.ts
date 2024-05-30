import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userData: {
    displayName: string;
    id: string;
  } | null;
}

const initialState: UserState = {
  userData: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ displayName: string; id: string }>) => {
      state.userData = action.payload;
    },
    clearUser: (state) => {
      state.userData = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;