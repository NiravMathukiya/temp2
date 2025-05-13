import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";

export type Request = {
  id: string;
  portfolioMember: string;
  submittedBy: string;
  programName: string;
  email: string;
  programDate: string;
  status: "Pending" | "Approved" | "Rejected";
  createdAt?: string;
};

interface RequestsState {
  requests: Request[];
  filteredRequests: Request[];
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
  };
}

const initialState: RequestsState = {
  requests: [],
  filteredRequests: [],
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 10,
    totalItems: 0,
  },
};

export const requestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setRequests: (state, action: PayloadAction<Request[]>) => {
      state.requests = action.payload;
    },
    setFilteredRequests: (state, action: PayloadAction<Request[]>) => {
      state.filteredRequests = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
    setPagination: (
      state,
      action: PayloadAction<{
        currentPage: number;
        totalPages: number;
        itemsPerPage: number;
        totalItems: number;
      }>
    ) => {
      state.pagination = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  setRequests,
  setFilteredRequests,
  setCurrentPage,
  setPagination,
} = requestsSlice.actions;

// Selectors
export const selectRequests = (state: RootState) => state.requests.requests;
export const selectFilteredRequests = (state: RootState) =>
  state.requests.filteredRequests;
export const selectLoading = (state: RootState) => state.requests.loading;
export const selectError = (state: RootState) => state.requests.error;
export const selectPagination = (state: RootState) => state.requests.pagination;

export default requestsSlice.reducer;
