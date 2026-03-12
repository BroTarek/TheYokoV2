import { Checkbox } from '@/components/ui/checkbox'
import React from 'react'
import {
  Table
} from "@tanstack/react-table"
import { Applicant } from '@/utils/schemas'
export const SelectAllHeader = ({ table }: { table: Table<Applicant> }) => {
  return (
    <>
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    </>
  )
}

