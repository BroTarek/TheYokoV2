import { Checkbox } from '@/components/ui/checkbox'
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Check, ChevronDown, Filter } from 'lucide-react';
import {
  Column,
  Table
} from "@tanstack/react-table"
import { Applicant } from '@/utils/schemas'

interface HeaderWithDropdownProps {
  column: Column<Applicant, unknown>;
  headerText: string;
}


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

export const HeaderWithDropdown: any=({ column, headerText }: HeaderWithDropdownProps)=> {
  const [open, setOpen] = useState(false);
  const filterValue = (column.getFilterValue() as string) || '';

  // Get sorted unique values from the column (via faceting)
  const uniqueValues = Array.from(column.getFacetedUniqueValues().keys()).sort();
  const hasFilter = !!filterValue;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`-ml-3 h-8 data-[state=open]:bg-accent ${
            hasFilter ? 'text-primary font-medium' : ''
          }`}
        >
          <span>{headerText}</span>
          {hasFilter ? (
            <Check className="ml-2 h-4 w-4" />
          ) : (
            <ChevronDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="start" className="w-[200px]">
        <DropdownMenuItem
          className="flex items-center justify-between"
          onClick={() => {
            column.setFilterValue(undefined);
            setOpen(false);
          }}
        >
          <span>All</span>
          {!hasFilter && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
        
        <div className="h-px bg-border my-1" />
        
        {uniqueValues.map((value) => (
          <DropdownMenuItem
            key={value}
            className="flex items-center justify-between"
            onClick={() => {
              column.setFilterValue(value);
              setOpen(false);
            }}
          >
            <span className="truncate">{value}</span>
            {filterValue === value && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
        
        {uniqueValues.length === 0 && (
          <div className="px-2 py-1.5 text-sm text-muted-foreground">
            No values available
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
