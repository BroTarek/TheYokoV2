import { flexRender, Table as TableType } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { closestCenter, DndContext, UniqueIdentifier } from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { DraggableRow } from "../../TableColumns/CellComponents"
import PaginationFooter from "./PaginationFooter"
import { useId } from "react"
import { Applicant, pagination } from "@/utils/schemas"

interface TableContentProps {
    table: TableType<Applicant>;
    dataIds: UniqueIdentifier[];
    meta?: pagination;
    onDragEnd?: (event: any) => void;
}

export const TableContent = ({ table, dataIds, meta, onDragEnd }: TableContentProps) => {
    const sortableId = useId()
    
    return (
        <>
            <div className="overflow-hidden rounded-lg border bg-white">
                <DndContext
                    collisionDetection={closestCenter}
                    modifiers={[restrictToVerticalAxis]}
                    onDragEnd={onDragEnd}
                    id={sortableId}
                >
                    <Table>
                        <TableHeader className="bg-muted sticky top-0 z-10">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id} colSpan={header.colSpan}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody className="**:data-[slot=table-cell]:first:w-8">
                            {table.getRowModel().rows?.length ? (
                                <SortableContext
                                    items={dataIds}
                                    strategy={verticalListSortingStrategy}
                                >
                                    {table?.getRowModel()?.rows?.map((row) => (
                                        <DraggableRow key={row.id} row={row} />
                                    ))}
                                </SortableContext>
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={table.getAllColumns().length}
                                        className="h-24 text-center text-muted-foreground"
                                    >
                                        No results found for selected filters.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </DndContext>
            </div>

            {/* Pagination Footer */}
            <PaginationFooter table={table} meta={meta} />
        </>
    )
}

export default TableContent;
