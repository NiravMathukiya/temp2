import {
  setLoading,
  setError,
  setFilteredRequests,
  setPagination,
} from "./slices/requestsSlice";
import type { FilterState } from "../components/RequestsTable";
import type { AppDispatch } from "./index";

// Async thunk for fetching filtered requests
export const fetchFilteredRequests =
  (filters: FilterState) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));

      // Build query string from filters
      const queryParams = new URLSearchParams();

      if (filters.portfolioMember && filters.portfolioMember !== "all") {
        queryParams.append("portfolioMember", filters.portfolioMember);
      }

      if (filters.submittedBy.length > 0) {
        filters.submittedBy.forEach((jk) => {
          queryParams.append("submittedBy", jk);
        });
      }

      if (filters.programName) {
        queryParams.append("programName", filters.programName);
      }

      if (filters.email) {
        queryParams.append("email", filters.email);
      }

      if (filters.programDateFrom) {
        queryParams.append("programDateFrom", filters.programDateFrom);
      }

      if (filters.programDateTo) {
        queryParams.append("programDateTo", filters.programDateTo);
      }

      if (filters.status && filters.status !== "all") {
        queryParams.append("status", filters.status);
      }

      if (filters.dateAdded) {
        queryParams.append("dateAdded", filters.dateAdded);
      }

      // Add pagination params
      queryParams.append("page", filters.page.toString());
      queryParams.append("limit", filters.limit.toString());

      // Make API request
      console.log("queryParams:", queryParams.toString());
      const response = await fetch(`/api/requests?${queryParams.toString()}`);

      if (!response.ok) {
        throw new Error("Failed to fetch requests");
      }

      const data = await response.json();

      // Update state with fetched data
      dispatch(setFilteredRequests(data.requests));
      dispatch(
        setPagination({
          currentPage: data.pagination.currentPage,
          totalPages: data.pagination.totalPages,
          itemsPerPage: data.pagination.itemsPerPage,
          totalItems: data.pagination.totalItems,
        })
      );

      dispatch(setLoading(false));
    } catch (error) {
      dispatch(
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        )
      );
      dispatch(setLoading(false));
    }
  };
