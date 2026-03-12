import { getCoreRowModel, getFilteredRowModel,getPaginationRowModel,
getSortedRowModel,
getFacetedRowModel,
getFacetedUniqueValues,
Row, } from "@tanstack/react-table"
import { useOperations } from "../redux/slices/OperationsSlice/useOperations"
import { Applicant, pagination } from "@/utils/schema"

export const useReactTableUtils=(meta?: pagination)=>{
   const {ColumnFiltersChange,ColumnVisibilityChange,PaginationChange,RowSelectionChange,SortingChange,dataTableOperations}=useOperations()    
   const states = () => (
      {
          sorting:dataTableOperations.sorting,
          columnVisibility:dataTableOperations.columnVisibility,
          rowSelection:dataTableOperations.rowSelection,
          columnFilters:dataTableOperations.columnFilters,
          pagination:dataTableOperations.pagination ,
      }
  )
  const on = () => ({
     onRowSelectionChange: RowSelectionChange,
     onSortingChange: SortingChange,
     onColumnFiltersChange: ColumnFiltersChange,
     onColumnVisibilityChange: ColumnVisibilityChange,
     onPaginationChange: PaginationChange,
 })
  const getters = () => ({
     getRowId: (row:Applicant) => row?.id?.toString(),
     getCoreRowModel: getCoreRowModel<Applicant>(),
     getFilteredRowModel: getFilteredRowModel<Applicant>(),
     getPaginationRowModel: getPaginationRowModel<Applicant>(),
     getSortedRowModel:     getSortedRowModel<Applicant>(),
     getFacetedRowModel:    getFacetedRowModel<Applicant>(),
     getFacetedUniqueValues:getFacetedUniqueValues<Applicant>(),
 })
  const values = () => ({
     manualPagination: true,
     pageCount: meta?.numberOfPages ?? -1,
     manualSorting: true,
     manualFiltering: true,
     enableRowSelection: true,
 })
 return {
    states,
    on,
    getters,
    values,
 }
}