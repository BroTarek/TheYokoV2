// components/topics/CompanyForm.tsx
import { useState, useMemo } from 'react'
import { toast } from 'sonner'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search } from 'lucide-react'
import RoleSelector from './RoleSelector'
import { jobTitle } from './types'



interface CompanyFormProps {
    topicName: string
    availableJobs: jobTitle[]
    onSubmit: (data: any) => void
    loading?: boolean
    fieldId?: string
}

const CompanyForm = ({ availableJobs, onSubmit, loading, fieldId }: CompanyFormProps) => {
    const [companyName, setCompanyName] = useState('')
    const [selectedRoles, setSelectedRoles] = useState<{
        jobTitleId: string,
        yearsOfExperience: string,
        jobNature: string,
        numberOfApplicantsNeeded: number,
        desiredRegionIds: string[]
    }[]>(() =>
        availableJobs.length > 0 ? [{
            jobTitleId: availableJobs[0].id,
            yearsOfExperience: '0-5',
            jobNature: 'fullTime',
            numberOfApplicantsNeeded: 1,
            desiredRegionIds: []
        }] : []
    )

    const handleSubmit = (e: React.FormEvent) => {
        toast.info("Form submission started")
        e.preventDefault()

        // Build job requirements structure matching backend schema
        const jobRequirements = selectedRoles.map(role => {
            const job = availableJobs.find(aj => aj.id === role.jobTitleId)
            return {
                jobTitleId: role.jobTitleId,
                jobFieldId: job?.field?.id || (job as any)?.fieldId || fieldId,
                yearsOfExperience: role.yearsOfExperience,
                jobNature: role.jobNature,
                numberOfApplicantsNeeded: role.numberOfApplicantsNeeded || 1,
                numberOfApplicantsSelected: 0,
                desiredRegions: role.desiredRegionIds.map(id => ({ id }))
            }
        })
        console.log(jobRequirements)
        // validate jobRequirement entries
        const valid = jobRequirements.every(jr => jr.jobTitleId && jr.jobFieldId)
        if (!valid) {
            toast.error('Please select valid job roles before submitting.')
            return
        }

        onSubmit({
            name: companyName,
            description: '',
            jobRequirements
        })
    }

    return (
        <form id="company-form" onSubmit={handleSubmit} className="px-8 py-4 space-y-8 pb-12">
            <div className="grid gap-3">
                <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
                    Organization Identity
                </Label>
                <Input
                    id="name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Acme Corporation"
                    className="rounded-2xl h-16 bg-white/5 border-gray-800 text-white placeholder:text-gray-600 focus:border-kaizen-red focus:ring-kaizen-red/20 text-lg font-medium px-6 transition-all"
                    required
                    disabled={loading}
                />
            </div>

            <RoleSelector
                availableJobs={availableJobs}
                selectedRoles={selectedRoles}
                onRolesChange={setSelectedRoles}
                loading={loading}
            />
        </form>
    )
}

export default CompanyForm