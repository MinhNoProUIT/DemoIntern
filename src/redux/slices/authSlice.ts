import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

// Kiểu dữ liệu quyền
interface FunctionRights {
  IsAllowView: boolean;
  IsAllowCreate?: boolean;
  IsAllowEdit?: boolean;
  IsAllowDelete?: boolean;
}

// State dạng object: tên chức năng -> quyền
interface MenuLeftState {
  [key: string]: FunctionRights;
}

// ✅ MOCK DATA — tạm thời gán cứng quyền cho các màn bạn cần
const initialState: MenuLeftState = {
  Home: { IsAllowView: true },
  Statistics: { IsAllowView: true },
  Employee: { IsAllowView: true },
  Contract: { IsAllowView: true },
  Salary: { IsAllowView: true },
  Schedular: { IsAllowView: true },
  Post: { IsAllowView: true },
  "Time off": { IsAllowView: true },
  Permission: { IsAllowView: true },
  Department: { IsAllowView: true },
  Role: { IsAllowView: true },
  "Work regulations": { IsAllowView: true },
  Insurance: { IsAllowView: true },
  Reward: { IsAllowView: true },
  Course: { IsAllowView: true },
  Discipline: { IsAllowView: true },
  Configuration: { IsAllowView: true },
  LearningContent: { IsAllowView: true},
  Topics: { IsAllowView: true},
  Courses: { IsAllowView: true},
  Vocabulary: { IsAllowView: true},

  // Thêm mock cho submenu nếu cần
  "/statistics/post": { IsAllowView: true },
  "/statistics/course": { IsAllowView: true },
  "/admin/statistics/salary": { IsAllowView: true },
  "/admin/statistics/employee-contract": { IsAllowView: true },
  "/admin/statistics/timeoff-errorreport": { IsAllowView: true },
  "/admin/statistics/rewards-disciplines": { IsAllowView: true },
  "/admin/statistics/notifications-events": { IsAllowView: true },

  "/admin/benefit": { IsAllowView: true },
  "/admin/benefit/add-employee-benefits": { IsAllowView: true },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAuth: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateAuth } = authSlice.actions;

export const authSelector = (state: RootState) => state.auth;

export default authSlice.reducer;
