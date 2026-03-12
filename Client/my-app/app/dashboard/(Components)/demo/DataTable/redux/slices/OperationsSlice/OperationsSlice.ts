import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { ColumnFiltersState, PaginationState, SortingState, VisibilityState, RowSelectionState } from '@tanstack/react-table';

type pagination = {
    currentPage: number,
    limit: number,
    numberOfPages: number,
    totalCount: number,
}

type initialStateTypeOfOperations = {
    pagination: PaginationState,
    sorting: SortingState,
    columnVisibility: VisibilityState,
    rowSelection: RowSelectionState,
    columnFilters: ColumnFiltersState,
    activeTab: 'archived' | 'outline'
}

const initialState: initialStateTypeOfOperations = {
    pagination: {
        pageIndex: 0,
        pageSize: 10,
    },
    sorting: [],
    columnVisibility: {},
    rowSelection: {},
    columnFilters: [],
    activeTab: 'outline'
};

export const DataTableOperationsSlice = createSlice({
    name: 'dataTableOperations',
    initialState,
    reducers: {
        setActiveTab: (state, action: PayloadAction<'archived' | 'outline'>) => {
            state.activeTab = action.payload;
            state.pagination.pageIndex = 0; // Reset pagination on tab change
        },
        setRowSelection: (state, action: PayloadAction<RowSelectionState>) => {
            state.rowSelection = action.payload;
        },
        setSorting: (state, action: PayloadAction<SortingState>) => {
            state.sorting = action.payload;
            state.pagination.pageIndex = 0; // Reset page on sort change
        },
        setPagination: (state, action: PayloadAction<PaginationState>) => {
            state.pagination = action.payload;
        },
        setColumnFilters: (state, action: PayloadAction<ColumnFiltersState>) => {
            state.columnFilters = action.payload;
            state.pagination.pageIndex = 0; // Reset page on filter change
        },
        setColumnVisibility: (state, action: PayloadAction<VisibilityState>) => {
            state.columnVisibility = action.payload;
        },
        // Helpers for specific filters
        setFieldFilter: (state, action: PayloadAction<string>) => {
            const filters = state.columnFilters.filter(f => f.id !== 'jobField');
            if (action.payload !== 'all') {
                filters.push({ id: 'jobField', value: action.payload });
            }
            state.columnFilters = filters;
            state.pagination.pageIndex = 0;
        },
        setExperienceFilter: (state, action: PayloadAction<string>) => {
            const filters = state.columnFilters.filter(f => f.id !== 'yearsOfExperience');
            if (action.payload !== 'All') {
                filters.push({ id: 'yearsOfExperience', value: action.payload });
            }
            state.columnFilters = filters;
            state.pagination.pageIndex = 0;
        }
    },
});

export const selectDataTableOperations = (state: RootState) => state.dataTableOperations;

export const { 
    setColumnFilters, 
    setColumnVisibility, 
    setPagination, 
    setActiveTab, 
    setSorting, 
    setRowSelection,
    setFieldFilter,
    setExperienceFilter
} = DataTableOperationsSlice.actions;

export default DataTableOperationsSlice.reducer;