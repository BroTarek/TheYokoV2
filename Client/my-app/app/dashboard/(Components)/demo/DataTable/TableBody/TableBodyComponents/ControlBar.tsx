import React, { useMemo } from 'react'
import { FilterSelect } from './FilterSelect';
import ColumnsDropdown from './ColumnsDropdown';
import TabsController from './TabsController';
import { useOperations } from '../../redux/slices/OperationsSlice/useOperations';
import { useFields } from '@/features/fields/hooks';
import { FIELD_CONFIG } from '../../TableColumns/Configs';

import { Table as TableType } from '@tanstack/react-table'
import { Applicant } from '@/utils/schemas'

interface ControlBarProps {
    table: TableType<Applicant>;
}

const ControlBar = ({ table }: ControlBarProps) => {
    const { dataTableOperations, handleFieldFilterChange, handleExperienceFilterChange } = useOperations();
    const { data: fieldsData } = useFields();

    const fieldFilterValue = useMemo(() => {
        const filter = dataTableOperations.columnFilters.find(f => f.id === 'jobField');
        return filter ? (filter.value as string) : 'all';
    }, [dataTableOperations.columnFilters]);

    const experienceFilterValue = useMemo(() => {
        const filter = dataTableOperations.columnFilters.find(f => f.id === 'yearsOfExperience');
        return filter ? (filter.value as string) : 'All';
    }, [dataTableOperations.columnFilters]);

    const fieldOptions = useMemo(() => {
        if (!fieldsData?.data) return [];
        return fieldsData.data.map((field: any) => {
            const config = FIELD_CONFIG[field.name as keyof typeof FIELD_CONFIG];
            const Icon = config?.icon;
            return {
                value: field.name,
                label: field.name,
                icon: Icon ? <Icon className={`size-4 ${config.iconColor}`} /> : null,
            };
        });
    }, [fieldsData]);

    const experienceOptions = useMemo(() => [
        { value: "All", label: "All Levels" },
        { value: "0-5", label: "0-5 years" },
        { value: "5-10", label: "5-10 years" },
        { value: "10+", label: "10+ years" },
    ], []);

    return (
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 px-4 lg:px-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 w-full lg:w-auto">
                {/* Field Filter */}
                <FilterSelect
                    label="Filter by Field:"
                    options={fieldOptions}
                    value={fieldFilterValue}
                    onChange={handleFieldFilterChange}
                    placeholder="All Fields"
                    renderOption={(option, isSelected) => (
                        <div className="flex items-center gap-2">
                            {option.icon}
                            <span>{option.label}</span>
                            {isSelected && <span className="ml-auto">✓</span>}
                        </div>
                    )}
                />

                {/* Experience Filter */}
                <FilterSelect
                    label="Experience:"
                    options={experienceOptions}
                    value={experienceFilterValue}
                    onChange={handleExperienceFilterChange}
                    placeholder="All Levels"
                />
            </div>

            {/* RightSideControls */}
            <div className="flex items-center gap-2 w-full lg:w-auto justify-between lg:justify-end">
                <TabsController />
                <ColumnsDropdown table={table} />
            </div>
        </div>
    )
}

export default ControlBar
