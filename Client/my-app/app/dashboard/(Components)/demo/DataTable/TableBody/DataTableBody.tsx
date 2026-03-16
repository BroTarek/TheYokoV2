import { useCreateReactTable } from '../TableUtils/createReactTable'
import { Applicant, pagination } from '@/utils/schemas';
import {
    Tabs,
    TabsContent
} from '@/components/ui/tabs'
import { useOperations } from '../redux/slices/OperationsSlice/useOperations';
import { useDataTable } from '../redux/slices/ActionsSlice/useActions';
import { useMemo } from 'react';
import { UniqueIdentifier } from '@dnd-kit/core';
import ControlBar from './TableBodyComponents/ControlBar';
import { TableContent } from './TableBodyComponents/TableContent';
import MainTableContent from './TableBodyComponents/MainTableContent';




const DataTableBody = ({ applicant, pagination }: { applicant: Applicant[]; pagination: pagination }) => {
    const { dataTableOperations, handleActiveTab } = useOperations()
    const { dataTable } = useDataTable()
    
    const dataIds = useMemo<UniqueIdentifier[]>(
        () => applicant?.length === 0 ? [] : applicant?.map(({ id }) => id) || [],
        [applicant]
    )
    
    const table = useCreateReactTable({ Applicants: applicant, pagination })

    return (
        <Tabs
            value={dataTableOperations.activeTab}
            onValueChange={(v) => handleActiveTab(v as 'outline' | 'archived')}
            className="w-full flex flex-col justify-start gap-6 py-6"
        >        
            <ControlBar table={table} />
            <MainTableContent 
                table={table} 
                dataIds={dataIds} 
                pagination={pagination} 
            />
        </Tabs>
    )
}


export default DataTableBody