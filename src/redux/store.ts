import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../redux/Slices/userSlice";
import candidatesSlice from "../redux/Slices/candidatesSlice";
import { useDispatch, useSelector } from "react-redux";

const store = configureStore({
    reducer:{
        user:userSlice.reducer,
        candidates:candidatesSlice.reducer
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store