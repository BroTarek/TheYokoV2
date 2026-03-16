"use client"
import { useParams } from 'next/navigation'
import { useState, useEffect, useMemo } from 'react'
import { toast } from 'sonner'

import TopicHeader from './(Components)/TopicHeader'
import CompanyGrid from './(Components)/CompanyGrid'
import AddCompanyDialog from './(Components)/AddCompanyDialog'

import { useFields, useJobTitles } from '@/features/fields/hooks'
import { useArchiveCompany, useCompanies } from '@/features/companies/hooks'
import { Company, JobField } from '@/utils/schemas'

type Field = {
    name: string,
    id: string
}
type JobTitle = {
    id: string,
    title: string,
    field: Field
}
// type Company = {
//     id: string,
//     name: string,
//     description?: string | null | undefined,
//     is_archived?: boolean | undefined,
//     created_at?: string | Date | undefined,
//     fields?: Field[],
//     jobRequirementsCount?: number | undefined,
// };
type CompaniesData = {
    company: Company,
    fields: Field[];
    jobRequirements: any[];
}

const TopicDetailPage = () => {
    const params = useParams()
    const topicName = decodeURIComponent(params.TopicName as string)
    
    // Get fields data
    const { data: fieldsData, isLoading: fieldsLoading } = useFields({})
    const fields = fieldsData?.data as JobField[] || []
    
    // Find the current field based on topicName
    const field = useMemo(() => {
        if (!fields.length) return undefined
        return fields.find(
            f => f.name.toLowerCase() === topicName.toLowerCase()
        )
    }, [fields, topicName])

    // Get companies for this field
    const { data: companiesData, isPending: companiesLoading, refetch: refetchCompanies } = 
        useCompanies({ fieldId: field?.id })

    // Get job titles for this field - unconditionally call but with conditional param
    const { data: jobTitlesData, isLoading: jobTitlesLoading } = 
        useJobTitles(field?.id || '')

    const { mutate: archiveCompany } = useArchiveCompany()

    const [isDialogOpen, setIsDialogOpen] = useState(false)

    // Filter companies by field (though the API should already be filtered)
    const filteredCompanies = useMemo(() => {
        if (!companiesData?.companies) return []
        return companiesData.companies
    }, [companiesData?.companies])

    // Transform jobTitlesData to the expected format if needed
    const jobTitles = useMemo(() => {
        if (!jobTitlesData) return []
        // Handle different possible response formats
        if (Array.isArray(jobTitlesData)) return jobTitlesData
        if (jobTitlesData.data && Array.isArray(jobTitlesData.data)) return jobTitlesData.data
        return []
    }, [jobTitlesData])

    // Handle loading states
    if (fieldsLoading) {
        return <div className="text-white text-center py-12">Loading fields...</div>
    }

    if (!field) {
        return (
            <div className="text-white text-center py-12">
                <h2 className="text-2xl font-bold mb-4">Field not found</h2>
                <p className="text-gray-400">No field named "{topicName}" exists.</p>
            </div>
        )
    }

    const handleArchive = async (companyId: string) => {
        archiveCompany(companyId, {
            onSuccess: () => {
                toast.success("Company archived successfully")
                refetchCompanies()
            },
            onError: (error: any) => {
                toast.error(error?.response?.data?.error || "Failed to archive company")
            }
        })
    }

    const handleCompanyAdded = () => {
        refetchCompanies()
        setIsDialogOpen(false)
        toast.success("Company created successfully")
    }

    return (
        <div className="min-h-screen bg-deep-midnight py-12 transition-colors duration-500">
            <div className="container mx-auto px-4 space-y-12">
                <TopicHeader
                    topicName={topicName}
                    companyCount={filteredCompanies.length}
                    onAddClick={() => setIsDialogOpen(true)}
                />

                <CompanyGrid
                    companies={filteredCompanies as Company[]}
                    topicName={topicName}
                    loading={companiesLoading}
                    onArchive={handleArchive}
                    onAddFirst={() => setIsDialogOpen(true)}
                />

                <AddCompanyDialog
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    topicName={topicName}
                    availableJobs={jobTitles}
                    onSuccess={handleCompanyAdded}
                />
            </div>
        </div>
    )
}

export default TopicDetailPage