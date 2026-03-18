import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../reduxHooks';
import {
  selectDataTable,
  getjobFieldById,
  getjobTitleById, dataTableSlice, onArchiveToggle, onDeleteClick, onStatusChange
} from './ActionsSlice';
import { Applicant } from '@/utils/schemas';
import { useArchiveApplicant, useUnarchiveApplicant } from '@/features/applicants/hooks';

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
  
  const { mutate: archiveMutate, isPending: isArchiving } = useArchiveApplicant();
  const { mutate: unarchiveMutate, isPending: isUnarchiving } = useUnarchiveApplicant();

  const ArchiveToggle = useCallback(
    async ({ currentlyArchived, id }: { currentlyArchived: boolean, id: string }) => {
      if (currentlyArchived) {
        unarchiveMutate(id);
      } else {
        archiveMutate(id);
      }
    },
    [archiveMutate, unarchiveMutate]
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

  return {
    dataTable: {
        ...dataTable,
        isArchiveTogglePending: isArchiving || isUnarchiving
    },
    ArchiveToggle,
    DeleteUser, 
    StatusChange,
  };
};