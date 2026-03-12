// components/topics/RoleItem.tsx
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { CountrySelect } from "@/components/forms/form-fields/country-select"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type Field = {
    _name: string,
    _id: string
}
type jobTitle = {
    _id: string,
    _title: string,
    _field: Field
}
interface RoleItemProps {
    job: jobTitle
    isSelected: boolean
    experience?: string
    jobNature?: string
    numberOfApplicantsNeeded?: number
    desiredRegionIds?: string[]
    onToggle: (jobTitleId: string) => void
    onExperienceChange: (jobTitleId: string, exp: string) => void
    onJobNatureChange: (jobTitleId: string, nature: string) => void
    onApplicantsChange: (jobTitleId: string, count: number) => void
    onRegionsChange: (jobTitleId: string, regions: string[]) => void
    disabled?: boolean
}
const EXPERIENCE_LEVELS = [
    {
        value: "0-5",
        label: "0-5"
    },
    {
        value: "5-10",
        label: "5-10"
    },
    {
        value: "10+",
        label: "10+"
    },
]
const JOB_NATURE_LEVELS = [
    { value: "remote", label: "Remote" },
    { value: "fullTime", label: "Full-Time" },
    { value: "partTime", label: "Part-Time" },
    { value: "hybrid", label: "Hybrid" },
    { value: "freelance", label: "Freelance" },
    { value: "contractor", label: "Contractor" },
]
const RoleItem = ({
    job,
    isSelected,
    experience,
    jobNature,
    numberOfApplicantsNeeded,
    desiredRegionIds,
    onToggle,
    onExperienceChange,
    onJobNatureChange,
    onApplicantsChange,
    onRegionsChange,
    disabled
}: RoleItemProps) => {
    return (
        <div
            className={`flex flex-col gap-4 p-5 rounded-[24px] transition-all border ${isSelected
                ? 'bg-kaizen-red/10 border-kaizen-red/40 text-white shadow-[0_0_20px_rgba(188,0,45,0.1)]'
                : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10'
                }`}
        >
            <div className="flex items-center space-x-4">
                <Checkbox
                    id={`role-${job._id}`}
                    checked={isSelected}
                    onCheckedChange={() => onToggle(job._id)}
                    className="border-gray-600 data-[state=checked]:bg-kaizen-red data-[state=checked]:border-kaizen-red rounded-lg w-6 h-6"
                    disabled={disabled}
                />
                <label
                    htmlFor={`role-${job._id}`}
                    className="text-base font-bold cursor-pointer leading-tight flex-1 py-1"
                >
                    {job._title}
                </label>
            </div>

            {isSelected && (
                <div className="pl-10 animate-in slide-in-from-top-2 duration-300 space-y-4">
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black uppercase text-gray-500 shrink-0">
                            Required Experience:
                        </span>
                        <Select
                            value={experience || '0-5'}
                            onValueChange={(val) => onExperienceChange(job._id, val)}
                            disabled={disabled}
                        >
                            <SelectTrigger className="h-10 bg-white/5 border-gray-800 rounded-xl text-xs font-bold w-35">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1c213e] border-gray-800 text-white rounded-xl">
                                {EXPERIENCE_LEVELS.map(level => (
                                    <SelectItem key={level.value} value={level.value} className="text-xs font-bold focus:bg-kaizen-red focus:text-white">
                                        {level.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black uppercase text-gray-500 shrink-0">
                            Job Nature:
                        </span>
                        <Select
                            value={jobNature || 'fullTime'}
                            onValueChange={(val) => onJobNatureChange(job._id, val)}
                            disabled={disabled}
                        >
                            <SelectTrigger className="h-10 bg-white/5 border-gray-800 rounded-xl text-xs font-bold flex-1">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1c213e] border-gray-800 text-white rounded-xl">
                                {JOB_NATURE_LEVELS.map(level => (
                                    <SelectItem key={level.value} value={level.value} className="text-xs font-bold focus:bg-kaizen-red focus:text-white">
                                        {level.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black uppercase text-gray-500 shrink-0">
                            Apply Limit:
                        </span>
                        <Input
                            type="number"
                            min={1}
                            value={numberOfApplicantsNeeded || 1}
                            onChange={(e) => onApplicantsChange(job._id, parseInt(e.target.value) || 1)}
                            disabled={disabled}
                            className="h-10 bg-white/5 border-gray-800 rounded-xl text-xs font-bold w-20"
                        />
                    </div>

                    <div className="space-y-2">
                        <span className="text-[10px] font-black uppercase text-gray-500 block">
                            Target Regions:
                        </span>
                        <CountrySelect
                            value={desiredRegionIds || []}
                            onChange={(vals) => onRegionsChange(job._id, vals)}
                            placeholder="Select target regions..."
                            className="bg-white/5 border-gray-800 rounded-xl w-full"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default RoleItem