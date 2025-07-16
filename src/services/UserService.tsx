import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./api";
import { QuarterStats } from "@/models/User";

const apiPath = "https://englishapp-uit.onrender.com/api/users";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: createBaseQuery(apiPath),
  endpoints: (builder) => ({
    getQuarterStats: builder.query<QuarterStats, void>({
      query: () => "quarter-stats",
    }),
  }),
});

export const { useGetQuarterStatsQuery } = userApi;
