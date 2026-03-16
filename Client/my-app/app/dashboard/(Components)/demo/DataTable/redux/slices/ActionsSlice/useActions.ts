// hooks/useTodos.ts
import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../reduxHooks';
import {
  selectDataTable,
  getjobFieldById,
  getjobTitleById, dataTableSlice, onArchiveToggle, onDeleteClick, onStatusChange
} from './ActionsSlice';
import { Applicant } from '@/utils/schemas';

interface UseTodosOptions {
  autoFetch?: boolean;
  initialPage?: number;
  initialLimit?: number;
}

export const useDataTable = (options: UseTodosOptions = {}) => {
  const {
    autoFetch = true,
    initialPage = 1,
    initialLimit = 10,
  } = options;

  const dispatch = useAppDispatch();

  const dataTable = useAppSelector(selectDataTable);

  // useEffect(() => {
  //   if (autoFetch) {
  //     dispatch(fetchTodos({ page: initialPage, limit: initialLimit }));
  //   }
  // }, [dispatch, autoFetch, initialPage, initialLimit]);

  const ArchiveToggle = useCallback(
    async ({ currentlyArchived, id }: { currentlyArchived: boolean, id: string }) => {
      const result = dispatch(onArchiveToggle({ currentlyArchived, id }));
    },
    [dispatch]
  );

  const StatusChange = useCallback(
    async (id: string, value: Applicant["status"]) => {
      const result = dispatch(onStatusChange({ id, value }));
    },
    [dispatch]
  );

  const DeleteUser = useCallback(
    async (id: string) => {
      const result = dispatch(onDeleteClick({ id }));
    },
    [dispatch]
  );

  // const resetFilters = useCallback(() => {
  //   dispatch(clearFilters());
  // }, [dispatch]);

  // const selectTodo = useCallback(
  //   (todo: Todo | null) => {
  //     dispatch(setSelectedTodo(todo));
  //   },
  //   [dispatch]
  // );

  // const changePage = useCallback(
  //   (page: number) => {
  //     dispatch(setPage(page));
  //     dispatch(fetchTodos({ page, limit: pagination.limit }));
  //   },
  //   [dispatch, pagination.limit]
  // );

  // const refreshTodos = useCallback(() => {
  //   dispatch(fetchTodos({ page: pagination.page, limit: pagination.limit }));
  // }, [dispatch, pagination.page, pagination.limit]);

  return {
    dataTable,
    ArchiveToggle,
    DeleteUser, StatusChange,
  };
};