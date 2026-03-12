import { Button } from '@/components/ui/button'
import { DropdownMenuCheckboxItem, DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { IconChevronDown, IconLayoutColumns } from '@tabler/icons-react'
import { Table as TableType } from '@tanstack/react-table'
import { Applicant } from '@/utils/schemas'

interface ColumnsDropdownProps {
    table: TableType<Applicant>;
}

const ColumnsDropdown = ({ table }: ColumnsDropdownProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                    <IconLayoutColumns className="size-4" />
                    <span className="hidden lg:inline">Customize Columns</span>
                    <span className="lg:hidden">Columns</span>
                    <IconChevronDown className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                {table
                    .getAllColumns()
                    .filter(
                        (column) =>
                            typeof column.accessorFn !== "undefined" &&
                            column.getCanHide()
                    )
                    .map((column) => {
                        return (
                            <DropdownMenuCheckboxItem
                                key={column.id}
                                className="capitalize"
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) =>
                                    column.toggleVisibility(!!value)
                                }
                            >
                                {column.id === "field" ? "Field" :
                                    column.id === "status" ? "Status" :
                                        column.id}
                            </DropdownMenuCheckboxItem>
                        )
                    })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ColumnsDropdown
