// components/topics/RoleSelector.tsx
import { useState, useMemo } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search } from 'lucide-react'
import RoleItem from './RoleItem'
import { jobTitle } from './types'



interface RoleSelectorProps {
    availableJobs: jobTitle[]
    selectedRoles: {
        jobTitleId: string,
        yearsOfExperience: string,
        jobNature: string,
        numberOfApplicantsNeeded: number,
        desiredRegionIds: string[]
    }[]
    onRolesChange: (roles: {
        jobTitleId: string,
        yearsOfExperience: string,
        jobNature: string,
        numberOfApplicantsNeeded: number,
        desiredRegionIds: string[]
    }[]) => void
    loading?: boolean
}

const RoleSelector = ({ availableJobs, selectedRoles, onRolesChange, loading }: RoleSelectorProps) => {
    const [search, setSearch] = useState('')

    const filteredJobs = useMemo(() => {
        console.log(availableJobs)
        return availableJobs.filter((job: jobTitle) =>
            job._title.toLowerCase().includes(search.toLowerCase())
        )
    }, [availableJobs, search])

    const toggleRole = (jobTitleId: string) => {
        const exists = selectedRoles.find(r => r.jobTitleId === jobTitleId)
        if (exists) {
            onRolesChange(selectedRoles.filter(r => r.jobTitleId !== jobTitleId))
        } else {
            onRolesChange([...selectedRoles, {
                jobTitleId,
                yearsOfExperience: '0-5',
                jobNature: 'fullTime',
                numberOfApplicantsNeeded: 1,
                desiredRegionIds: []
            }])
        }
    }

    const updateExperience = (jobTitleId: string, experience: string) => {
        onRolesChange(selectedRoles.map(r =>
            r.jobTitleId === jobTitleId ? { ...r, yearsOfExperience: experience } : r
        ))
    }

    const updateJobNature = (jobTitleId: string, jobNature: string) => {
        onRolesChange(selectedRoles.map(r =>
            r.jobTitleId === jobTitleId ? { ...r, jobNature } : r
        ))
    }

    const updateApplicants = (jobTitleId: string, count: number) => {
        onRolesChange(selectedRoles.map(r =>
            r.jobTitleId === jobTitleId ? { ...r, numberOfApplicantsNeeded: count } : r
        ))
    }

    const updateRegions = (jobTitleId: string, regions: string[]) => {
        onRolesChange(selectedRoles.map(r =>
            r.jobTitleId === jobTitleId ? { ...r, desiredRegionIds: regions } : r
        ))
    }

    return (
        <div className="grid gap-6">
            <div className="flex justify-between items-end">
                <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
                    Select Operating Roles
                </Label>
                <span className="text-[10px] font-bold text-kaizen-red bg-kaizen-red/10 px-2 py-0.5 rounded-md">
                    {selectedRoles.length} Selected
                </span>
            </div>

            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                    placeholder="Search roles..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-12 h-14 bg-white/5 border-gray-800 rounded-2xl text-base placeholder:text-gray-600"
                    disabled={loading}
                />
            </div>

            <div className="grid grid-cols-1 gap-3">
                {filteredJobs.map((job: jobTitle) => {
                    const role = selectedRoles.find(r => r.jobTitleId === job._id)
                    const isSelected = !!role

                    return (
                        <RoleItem
                            key={job._id}
                            job={job}
                            isSelected={isSelected}
                            experience={role?.yearsOfExperience}
                            jobNature={role?.jobNature}
                            numberOfApplicantsNeeded={role?.numberOfApplicantsNeeded}
                            desiredRegionIds={role?.desiredRegionIds}
                            onToggle={toggleRole}
                            onExperienceChange={updateExperience}
                            onJobNatureChange={updateJobNature}
                            onApplicantsChange={updateApplicants}
                            onRegionsChange={updateRegions}
                            disabled={loading}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default RoleSelector