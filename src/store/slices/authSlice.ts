import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  adminId: string | null;
  role: string | null;
}

interface DecodedToken {
  admin_id: string;
  role: string;
  exp?: number;
  iat?: number;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  adminId: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      const token = action.payload;
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        state.token = token;
        state.isAuthenticated = true;
        state.adminId = decoded.admin_id;
        state.role = decoded.role;
      } catch (error) {
        console.error("Invalid token:", error);
        state.isAuthenticated = false;
        state.token = null;
        state.adminId = null;
        state.role = null;
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.adminId = null;
      state.role = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
