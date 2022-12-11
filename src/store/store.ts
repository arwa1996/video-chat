import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './Auth/AuthSlice';

const store = configureStore({
  reducer: {
    authentication: AuthSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
