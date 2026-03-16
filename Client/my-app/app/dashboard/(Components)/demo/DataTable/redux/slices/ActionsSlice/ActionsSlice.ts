// store/slices/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store';
import { Applicant, JobField, JobTitle } from '@/utils/schemas';

import { ColumnFiltersState, PaginationState, SortingState, VisibilityState,RowSelectionState } from '@tanstack/react-table';

type pagination = {
  currentPage: number,
  limit: number,
  numberOfPages: number,
  totalCount: number,
}
type initialStateType = {
  jobField: JobField,
  jobTitle: JobTitle,
  isArchiveTogglePending: boolean,
  isDeleting: boolean,
  isUpdatingStatus: boolean,
  }

const initialState: initialStateType = {
  jobField: {
    id: "",
    name: ""
  },
  jobTitle: {
    id: "",
    title: "",
    name:""
  },
  isArchiveTogglePending: false,
  isDeleting: false,
  isUpdatingStatus: false,
};

export const dataTableSlice = createSlice({
  name: 'dataTable',
  initialState,
  reducers: {
    setSorting: () => { },
    setColumnVisibility: () => { },
    setRowSelection: () => { },
    setColumnFilters: () => { },
    setPaginationState: () => { },
    getjobTitleById: (state,
      action: PayloadAction<JobTitle>
    ) => {
      state.jobTitle = action.payload;
    },
    getjobFieldById: (state,
      action: PayloadAction<JobField>
    ) => {
      state.jobField = action.payload;
    },
    onArchiveToggle: (state, action: PayloadAction<{ id: string, currentlyArchived: boolean }>) => { },
    onDeleteClick: (state, action: PayloadAction<{ id: string }>) => { },
    onStatusChange: (state, action: PayloadAction<{ id: string, value: Applicant['status'] }>) => { },

    
  },

});

// Action creators are generated for each case reducer function
export const { getjobFieldById, getjobTitleById, onArchiveToggle, onDeleteClick, onStatusChange } = dataTableSlice.actions;

// Selectors with proper typing
export const selectDataTable = (state: RootState) => state.dataTable

export default dataTableSlice.reducer;