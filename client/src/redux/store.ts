import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice";
import cartReducer from "../features/slice/cartSlice";

//setup store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});
//set uptypes

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
