import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  role: null,
  permissions: [],
  loading: false,
  error: null,
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    setRole: (state, action) => {
      if (action.payload) {
        state.role = action.payload.role || null;
        state.permissions = action.payload.permissions || [];
      } else {
        state.role = null;
        state.permissions = [];
      }
      state.loading = false;
      state.error = null;
    },
    setRoleLoading: (state, action) => {
      state.loading = action.payload;
    },
    setRoleError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearRole: (state) => {
      state.role = null;
      state.permissions = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setRole, setRoleLoading, setRoleError, clearRole } = roleSlice.actions;

export default roleSlice.reducer;
