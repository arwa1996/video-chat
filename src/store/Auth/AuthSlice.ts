import { createSlice } from '@reduxjs/toolkit';
interface authState {
  userInfo:
    | {
        uid: string;
        email: string;
        name: string;
      }
    | undefined;
}

const initialState: authState = {
  userInfo: undefined,
};

const AuthSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
    resetUser: (state) => {
      state.userInfo = undefined;
    },
  },
});

export const { setUser, resetUser } = AuthSlice.actions;

export default AuthSlice.reducer;
