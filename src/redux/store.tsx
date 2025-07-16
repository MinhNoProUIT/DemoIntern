// store.ts
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { toastSlice } from "./slices/toastSlice";
import { sidebarSlice } from "./slices/sidebarSlice";
import { userApi } from "@/services/UserService"; // RTK Query API
import { courseApi } from "@/services/CourseService";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [toastSlice.name]: toastSlice.reducer,
    [sidebarSlice.name]: sidebarSlice.reducer,
    [userApi.reducerPath]: userApi.reducer, // ✅ Đã có reducer
    [courseApi.reducerPath]: courseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, courseApi.middleware), // ✅ THÊM middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
