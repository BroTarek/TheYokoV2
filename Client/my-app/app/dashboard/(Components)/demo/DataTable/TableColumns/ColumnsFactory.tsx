import { Column, ColumnDef } from "@tanstack/react-table"
import { Applicant } from "@/utils/schemas"
import { HeaderWithDropdown, SelectAllHeader } from "./HeaderComponents"

import { DragHandle, ActionsCell, ExperienceCell, JobFieldCell, JobTitleCell, NameCell, RegionsCell, SelectAllHeaderCell, StatusCell } from "./CellComponents"

export function createColumnsFactory(
): ColumnDef<Applicant>[] {
    return [
        {
            id: "drag",
            header: () => null,
            cell: ({ row }) => <DragHandle id={+row.original.id} />,
            enableSorting: false,
        },
        {
            id: "select",
            header: ({ table }) => (
                <SelectAllHeader table={table} />
            ),
            cell: ({ row }) => (
                <SelectAllHeaderCell row={row} />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorFn: row => `${row.firstName} ${row.lastName}`,
            id: "fullName", // Add explicit id for better control
            header: "Name",
            cell: ({ row }) => <NameCell row={row} />,
            enableSorting: true, // Enable sorting
            sortingFn: "alphanumeric", // Use alphanumeric sorting
            enableColumnFilter: true, // Disable filtering for name
        },
        {
            accessorFn: row => row.jobField?.name || "",
            id: "jobField",
            header: ({ column }: { column: Column<Applicant, unknown> }) => (
                <HeaderWithDropdown
                    column={column}
                    headerText="Job Field"
                />
            ),
            cell: ({ row }) => <JobFieldCell row={row} />,
            enableSorting: true,
            enableColumnFilter: true,
            filterFn: "equals",
        },

        {
            accessorFn: row => row.jobTitle?.title || row.jobTitle?.name || "",
            id: "jobTitle",
            header: ({ column }: { column: Column<Applicant, unknown> }) => (
                <HeaderWithDropdown
                    column={column}
                    headerText="Job Title"
                />
            ),
            cell: ({ row }) => <JobTitleCell row={row} />,
            enableSorting: true,
            enableColumnFilter: true,
            filterFn: "equals",
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => <StatusCell row={row} />,
            enableSorting: true, // Enable sorting
            enableColumnFilter: true, // Enable faceting/filtering
            filterFn: "equals", // Use exact match filtering
        },
        {
            accessorKey: "yearsOfExperience",
            header: () => <div className="w-full text-right">Experience</div>,
            cell: ({ row }) => <ExperienceCell row={row} />,
            enableSorting: true, // Enable sorting
            enableColumnFilter: true, // Enable faceting/filtering
            sortingFn: "alphanumeric", // Numeric sorting
        },
        {
            accessorKey: "RegionsOfExperience",
            header: "Regions",
            cell: ({ row }) => <RegionsCell row={row} />,
            enableSorting: true, // Enable sorting
            enableColumnFilter: true, // Enable faceting/filtering
            filterFn: "arrIncludesSome", // Filter if array includes any of the selected values
            sortingFn: "alphanumeric", // Alphanumeric sorting for regions
        },
        {
            accessorKey: "ApplyingDate",
            id: "Date",
            header: "ApplyingDate",
            enableSorting: true, // Enable sorting
            cell: ({ row }) => row.original.createdAt,

        }
        ,

        {
            id: "actions",
            cell: ({ row }) => <ActionsCell row={row} />,
            enableSorting: false,
            enableColumnFilter: false,
        },
    ]
}