"use client"
import { useApplicants } from '@/features/applicants/hooks';
import DataTableServer from './DataTableServer';
import { ReduxProvider } from './redux/provider';
import { useOperations } from './redux/slices/OperationsSlice/useOperations';
import { useMemo } from 'react';

function DataTableContent() {
    const { dataTableOperations } = useOperations();
    
    // Convert Redux state to ApplicantParams
    const filters = useMemo(() => {
        const params: any = {
            page: dataTableOperations.pagination.pageIndex + 1,
            limit: dataTableOperations.pagination.pageSize,
        };

        // Add filters
        dataTableOperations.columnFilters.forEach(filter => {
            if (filter.id === 'jobField') params.jobFieldId = filter.value;
            if (filter.id === 'yearsOfExperience') params.yearsOfExperience = filter.value;
            // Add status if needed, though activeTab might handle part of it
        });

        // Add sorting
        if (dataTableOperations.sorting.length > 0) {
            const sort = dataTableOperations.sorting[0];
            params.sort = `${sort.id}:${sort.desc ? 'desc' : 'asc'}`;
        }

        // Handle Active Tab (Archived vs Outline)
        if (dataTableOperations.activeTab === 'archived') {
            params.isArchived = true;
        } else {
            params.isArchived = false;
        }

        return params;
    }, [dataTableOperations]);

    const { data, error, isFetching, isLoading } = useApplicants(filters);
    
    const getProps = () => {
        if (isLoading) return { status: 'loading' as const, isLoading, isFetching };
        if (error) return { status: 'error' as const, error: error as Error };
        if (data) {
            return { 
                status: 'success' as const, 
                data: { 
                    applicant: data.applicants, 
                    pagination: data.pagination 
                } 
            };
        }
        return { status: 'loading' as const, isLoading: true, isFetching: false };
    };

    return <DataTableServer {...getProps()} />;
}

export default function DataTableClient() {
    return (
        <ReduxProvider>
            <DataTableContent />
        </ReduxProvider>
    );
}