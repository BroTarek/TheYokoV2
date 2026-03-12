import { Row } from '@tanstack/react-table'
import React from 'react'

type FilteringOptionProps<CustomFilterFunctionProps, CustomFilterFunctionReturnType> = {
    filterFn: "includesString" | "includesStringSensitive" | "arrIncludes" | "inNumberRange" | "ageRange"
    enableColumnFilter: boolean
    enableGlobalFilter: boolean
    customFilterFunction: (param: CustomFilterFunctionProps) => CustomFilterFunctionReturnType
}

type SortingOptionProps<CustomSortingFunctionProps,CustomSortingFunctionReturnType>={
    enableSorting: boolean
    sortUndefined: 'last', //force undefined values to the end
    sortDescFirst: false,//first sort order will be ascending (nullable values can mess up auto detection of sort order)

    sortingFn: "includesString" | "includesStringSensitive" | "arrIncludes" | "inNumberRange" | "ageRange"
    customSortingFunction: (param: CustomSortingFunctionProps) => CustomSortingFunctionReturnType
}



export type ColumnProp<TableData, AccessorFnReturnType, HeaderGeneric, CellGeneric, CustomFilterFunctionProps, CustomFilterFunctionReturnType,CustomSortingFunctionProps,CustomSortingFunctionReturnType> = 
    // Base props that are always required
    {
        accessorKey: (row: Row<TableData>) => AccessorFnReturnType;
        header: React.FC<HeaderGeneric>;
        cell: React.FC<CellGeneric>;
        id: string;
    } & (
        // Conditional part: if allowFiltering is true, add FilteringOptionProps
        | {
            allowFiltering: true;
        } & FilteringOptionProps<CustomFilterFunctionProps, CustomFilterFunctionReturnType>
        // If allowFiltering is false, no filtering props
        | {
            allowFiltering?: false;
        }
    )& (
        // Conditional part: if allowSortinging is true, add SortingingOptionProps
        | {
            allowSorting: true;
        } & SortingOptionProps<CustomSortingFunctionProps, CustomSortingFunctionReturnType>
        // If allowSorting is false, no Sorting props
        | {
            allowSorting?: false;
        }
    )

// Type guard to check if filtering is enabled
function isFilteringEnabled<T, A, H, C, F, R,S,E>(
    props: ColumnProp<T, A, H, C, F, R,S,E>
): props is ColumnProp<T, A, H, C, F, R,S,E> & { allowFiltering: true } & FilteringOptionProps<F, R> {
    return props.allowFiltering === true;
}

const Column = <TableData, AccessorFnReturnType, HeaderGeneric, CellGeneric, CustomFilterFunctionProps, CustomFilterFunctionReturnType,CustomSortingFunctionProps,CustomSortingFunctionReturnType>(
    props: ColumnProp<TableData, AccessorFnReturnType, HeaderGeneric, CellGeneric, CustomFilterFunctionProps, CustomFilterFunctionReturnType,CustomSortingFunctionProps,CustomSortingFunctionReturnType>
) => {
    // Base props that always exist
    const baseProps = {
        accessorKey: props.accessorKey,
        header: props.header,
        cell: props.cell,
        id: props.id,
    };

    // If filtering is enabled, include filtering props
    if (isFilteringEnabled(props)) {
        return {
            ...baseProps,
            allowFiltering: props.allowFiltering,
            enableColumnFilter: props.enableColumnFilter,
            enableGlobalFilter: props.enableGlobalFilter,
            filterFn: props.filterFn,
            customFilterFunction: props.customFilterFunction,
        };
    }

    // If filtering is not enabled, return only base props
    return {
        ...baseProps,
        allowFiltering: props.allowFiltering,
    };
}

export default Column