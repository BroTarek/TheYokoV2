"use client"
import { useApplicants } from '@/features/applicants/hooks';
import DataTableServer from './DataTableServer';
import { ReduxProvider } from './redux/provider';
import { useOperations } from './redux/slices/OperationsSlice/useOperations';
import { useMemo } from 'react';

function DataTableContent() {
    const { dataTableOperations } = useOperations();
    
    // Fetch all records for client-side operations
    const filters = useMemo(() => {
        const params: any = {
            page: 1,
            limit: 10000, // Large limit to fetch all data
        };

        // We only fetch based on archive status, everything else happens on client
        if (dataTableOperations.activeTab === 'archived') {
            params.isArchived = true;
        } else {
            params.isArchived = false;
        }

        return params;
    }, [dataTableOperations.activeTab]);

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