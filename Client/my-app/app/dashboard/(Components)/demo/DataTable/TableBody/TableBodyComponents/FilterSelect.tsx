import GenericSelect from "@/app/(Components)/GenericSelect";

export const FilterSelect = <T,>({ 
    label, 
    options, 
    value, 
    onChange, 
    placeholder,
    renderOption 
}: { 
    label: string;
    options: Array<{ value: T; label: string; icon?: React.ReactNode }>;
    value: T;
    onChange: (value: T) => void;
    placeholder: string;
    renderOption?: (option: any, isSelected: boolean) => React.ReactNode;
}) => (
    <GenericSelect
        label={label}
        options={options}
        value={value}
        onValueChange={onChange}
        placeholder={placeholder}
        className="w-full lg:w-auto"
        triggerClassName="w-full lg:w-48"
        renderOption={renderOption}
    />
);