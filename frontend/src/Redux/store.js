import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { loadState, saveState } from "../utils/localStorage";

const persistedStore = loadState();

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: persistedStore,
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
