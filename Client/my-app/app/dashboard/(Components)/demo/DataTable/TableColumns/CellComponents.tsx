import { IconGripVertical } from "@tabler/icons-react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { flexRender } from "@tanstack/react-table"
import { TableCell, TableRow } from "@/components/ui/table"

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Applicant } from '@/utils/schemas'
import { IconDotsVertical } from '@tabler/icons-react'
import { Row } from '@tanstack/react-table'
import Link from 'next/link'
import { useDataTable } from '../redux/slices/ActionsSlice/useActions'
import { FIELD_CONFIG, STATUS_CONFIG } from './Configs'
import { useEffect } from 'react'


export const SelectAllHeaderCell = ({ row }: { row: Row<Applicant> }) => {
    return (
        <>
            <div className="flex items-center justify-center">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            </div>
        </>
    )
}

export const NameCell = ({ row }: { row: Row<Applicant> }) => {
    const firstName = row.original.firstName
    const lastName = row.original.lastName
    return (
        <>
            <div className="truncate">{firstName} {lastName}</div>
        </>
    )
}

export const JobFieldCell = ({ row }: { row: Row<any> }) => {
    const applicant = row.original;
    const field = applicant.jobField?.name;
    const config = FIELD_CONFIG[field as keyof typeof FIELD_CONFIG];

    if (!config) {
        return (
            <div className="w-32">
                <Badge variant="outline" className="px-2">
                    {field || "N/A"}
                </Badge>
            </div>
        )
    }

    const Icon = config.icon

    return (
        <div className="w-32">
            <Badge
                variant="outline"
                className={`px-2 ${config.color}`}
            >
                <Icon className={`size-3 mr-1 ${config.iconColor}`} />
                {field}
            </Badge>
        </div>
    )
}



export const JobTitleCell = ({ row }: { row: Row<any> }) => {
    const applicant = row.original;
    return (
        <div className="w-32">
            <Badge variant="outline" className="px-2">
                {applicant.jobTitle?.title || "N/A"}
            </Badge>
        </div>
    );
};

export const StatusCell = ({ row }: { row: Row<Applicant> }) => {
    const { StatusChange, dataTable } = useDataTable();
    const status = (row.original.status || "unseen").toLowerCase()
    const config = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG["unseen"]
    const Icon = config.icon

    return (
        <Select
            value={status}
            onValueChange={(value: string) => StatusChange(row.original.id, value as Applicant["status"])}
            disabled={dataTable.isUpdatingStatus}
        >
            <SelectTrigger className={`h-8 border-none shadow-none focus:ring-0 px-2 w-fit ${config.color}`}>
                <Icon className={`size-3 mr-1 ${config.iconColor}`} />
                <SelectValue>{status}</SelectValue>
            </SelectTrigger>
            <SelectContent>
                {Object.keys(STATUS_CONFIG).map((key) => {
                    const cfg = STATUS_CONFIG[key as keyof typeof STATUS_CONFIG]
                    const Svg = cfg.icon
                    return (
                        <SelectItem key={key} value={key}>
                            <div className="flex items-center gap-2">
                                <Svg className={`size-3 ${cfg.iconColor}`} />
                                <span className="capitalize">{key}</span>
                            </div>
                        </SelectItem>
                    )
                })}
            </SelectContent>
        </Select>)
}
export const ExperienceCell = ({ row }: { row: Row<Applicant> }) => {
    return (

        <div className="text-right">
            {row.original.yearsOfExperience}
        </div>
    )
}

export const RegionsCell = ({ row }: { row: Row<any> }) => {
    return (
        <div className="flex flex-wrap gap-1 min-w-50">
            {row.original.regions?.length > 0 ? (
                row.original.regions.map((r: any) => (
                    <Badge variant="secondary" key={r.id}>
                        {r.name || r.code}
                    </Badge>
                ))
            ) : (
                <span className="text-gray-400 text-sm">N/A</span>
            )}
        </div>
    )
}

export const ActionsCell = ({ row }: { row: Row<Applicant> }) => {
    const { DeleteUser, ArchiveToggle, dataTable } = useDataTable()
    const applicant = row.original
    return (
        <div className="flex items-center gap-2">

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                        size="icon"
                        disabled={dataTable.isArchiveTogglePending || dataTable.isDeleting}
                    >
                        <IconDotsVertical className="size-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem>
                        <Link href={`/Portofolio?id=${row.original.id}`}>Applicant Page</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => ArchiveToggle({ currentlyArchived: !!row.original.isArchived, id: applicant.id })}
                        disabled={dataTable.isArchiveTogglePending}
                    >
                        {row.original.isArchived ? 'Unarchive' : 'Archive'}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        variant="destructive"
                        onClick={() => DeleteUser(row.original.id)}
                        disabled={dataTable.isDeleting}
                    >
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}



export function DragHandle({ id }: { id: number }) {
    const { attributes, listeners } = useSortable({
        id,
    })

    return (
        <Button
            {...attributes}
            {...listeners}
            variant="ghost"
            size="icon"
            className="text-muted-foreground size-7 hover:bg-transparent"
        >
            <IconGripVertical className="text-muted-foreground size-3" />
            <span className="sr-only">Drag to reorder</span>
        </Button>
    )
}

export function DraggableRow({ row }: { row: Row<Applicant> }) {
    const { transform, transition, setNodeRef, isDragging } = useSortable({
        id: row.id,
    })

    return (
        <TableRow
            data-state={row.getIsSelected() && "selected"}
            data-dragging={isDragging}
            ref={setNodeRef}
            className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
            style={{
                transform: CSS.Transform.toString(transform),
                transition: transition,
            }}
        >
            {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
            ))}
        </TableRow>
    )
}