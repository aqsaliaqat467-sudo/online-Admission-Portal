import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import roleReducer from './roleSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    role: roleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types from the serializable check
        ignoredActions: ['user/setUser', 'role/setRole'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.user', 'payload.role'],
        // Ignore these paths in the state
        ignoredPaths: ['user.user', 'role.role'],
      },
    }),
});

export default store;
