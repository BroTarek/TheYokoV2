import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../reduxHooks';
import {
    setColumnFilters,
    setColumnVisibility,
    setPagination,
    setSorting,
    setRowSelection,
    setActiveTab as setActiveTabAction,
    selectDataTableOperations,
    setFieldFilter,
    setExperienceFilter
} from './OperationsSlice';
import { ColumnFiltersState, PaginationState, RowSelectionState, SortingState, VisibilityState } from '@tanstack/react-table';

export const useOperations = () => {
    const dispatch = useAppDispatch();
    const dataTableOperations = useAppSelector(selectDataTableOperations);

    const handleActiveTab = useCallback(
        (tab: 'outline' | 'archived') => {
            dispatch(setActiveTabAction(tab));
        },
        [dispatch]
    );

    const RowSelectionChange = useCallback(
        (updater: RowSelectionState | ((old: RowSelectionState) => RowSelectionState)) => {
            const newState = typeof updater === 'function' ? updater(dataTableOperations.rowSelection) : updater;
            dispatch(setRowSelection(newState));
        },
        [dispatch, dataTableOperations.rowSelection]
    );

    const SortingChange = useCallback(
        (updater: SortingState | ((old: SortingState) => SortingState)) => {
            const newState = typeof updater === 'function' ? updater(dataTableOperations.sorting) : updater;
            dispatch(setSorting(newState));
        },
        [dispatch, dataTableOperations.sorting]
    );

    const PaginationChange = useCallback(
        (updater: PaginationState | ((old: PaginationState) => PaginationState)) => {
            const newState = typeof updater === 'function' ? updater(dataTableOperations.pagination) : updater;
            dispatch(setPagination(newState));
        },
        [dispatch, dataTableOperations.pagination]
    );

    const ColumnFiltersChange = useCallback(
        (updater: ColumnFiltersState | ((old: ColumnFiltersState) => ColumnFiltersState)) => {
            const newState = typeof updater === 'function' ? updater(dataTableOperations.columnFilters) : updater;
            dispatch(setColumnFilters(newState));
        },
        [dispatch, dataTableOperations.columnFilters]
    );

    const ColumnVisibilityChange = useCallback(
        (updater: VisibilityState | ((old: VisibilityState) => VisibilityState)) => {
            const newState = typeof updater === 'function' ? updater(dataTableOperations.columnVisibility) : updater;
            dispatch(setColumnVisibility(newState));
        },
        [dispatch, dataTableOperations.columnVisibility]
    );

    const handleFieldFilterChange = useCallback((value: string) => {
        dispatch(setFieldFilter(value));
    }, [dispatch]);

    const handleExperienceFilterChange = useCallback((value: string) => {
        dispatch(setExperienceFilter(value));
    }, [dispatch]);

    return {
        handleActiveTab,
        dataTableOperations,
        RowSelectionChange,
        SortingChange,
        PaginationChange,
        ColumnFiltersChange,
        ColumnVisibilityChange,
        handleFieldFilterChange,
        handleExperienceFilterChange
    };
};