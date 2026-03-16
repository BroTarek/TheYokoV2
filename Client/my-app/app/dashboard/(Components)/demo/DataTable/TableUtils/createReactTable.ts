import { useReactTable } from '@tanstack/react-table'
import { createColumnsFactory } from '../TableColumns/ColumnsFactory'
import { Applicant, pagination } from '@/utils/schemas'
import { useReactTableUtils } from './useReactTableUtils'

type createReactTableProps = {
    Applicants: Applicant[],
    pagination: pagination
}

export const useCreateReactTable = ({ Applicants, pagination }: createReactTableProps) => {
    const { getters, on, states, values } = useReactTableUtils(pagination)   
    
    return useReactTable<Applicant>({
        data: Applicants,
        columns: createColumnsFactory(),
        state: states(),
        ...getters(),
        ...on(),
        ...values(),
    })
}
