import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload;
    },
    logoutSuccess: (state) => {
      state.user = null;
    },
    
  },
});

export const { saveUser, logoutSuccess } = userSlice.actions;

export const logout = () => async (dispatch) => {
  try {
    const response = await fetch("/api/user/logout", {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      console.log("response ok")
      dispatch(logoutSuccess()); // Dispatch the sync logout action
      toast.success("Successfully logged out");
    } else {
      toast.error("Logout failed, try again!");
    }
  } catch (err) {
    toast.error("An error occurred, try again later.");
  }
};

export default userSlice.reducer;
