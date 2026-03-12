"use client"
import { useParams } from 'next/navigation'
import { useState, useEffect, useMemo } from 'react'
import { toast } from 'sonner'

import TopicHeader from './(Components)/TopicHeader'
import CompanyGrid from './(Components)/CompanyGrid'
import AddCompanyDialog from './(Components)/AddCompanyDialog'

import { useTopics } from './(Components)/hooks/useTopics'
import { useJobTitles } from '@/features/fields/hooks'
import { useArchiveCompany, useCompanies } from '@/features/companies/hooks'
import { Company } from '@/utils/schemas'

type Field = {
    name: string,
    id: string
}
type jobTitle = {
    _id: string,
    _title: string,
    _field: Field
}
type company = {
    id: string,
    name: string,
    description?: string | null | undefined,
    is_archived?: boolean | undefined,
    created_at?: string | Date | undefined,
    fields?: Field[],
    jobRequirementsCount?: number | undefined,
};
type Companiesdata = {
    company: company,
    fields: Field[];
    jobRequirements: any[];
}
const TopicDetailPage = () => {
    const params = useParams()
    const topicName = decodeURIComponent(params.TopicName as string)

    const { topics, loading: topicsLoading } = useTopics()
    const availableFields: Field[] = topics.fields || []

    const field = useMemo(() =>
        availableFields.find(
            f => f.name.toLowerCase() === topicName.toLowerCase()
        ),
        [availableFields, topicName]
    );

    const { data: CompaniesData, isPending: companiesLoading, refetch: refetchCompanies } = useCompanies({ fieldId: field?.id })
    const { mutate: archiveCompany } = useArchiveCompany()

    const [isDialogOpen, setIsDialogOpen] = useState(false)

    // ALWAYS call useJobTitles - unconditionally
    const { data: jobTitlesData } = useJobTitles(field?.id || '');

    // Filter companies by field
    const filteredCompanies = useMemo(() => {
        if (!CompaniesData?.companies) return []
        return CompaniesData.companies
    }, [CompaniesData?.companies])

    // Now do conditional rendering
    if (topicsLoading || !field) {
        return <div className="text-white text-center py-12">Loading field: {topicName}</div>;
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



    const jobTitles = (Array.isArray(jobTitlesData) ? jobTitlesData : (jobTitlesData as any)?.data) || []

    return (
        <div className="min-h-screen bg-deep-midnight py-12 transition-colors duration-500">
            <div className="container mx-auto px-4 space-y-12">
                <TopicHeader
                    topicName={topicName}
                    companyCount={filteredCompanies.length}
                    onAddClick={() => setIsDialogOpen(true)}
                />

                <CompanyGrid
                    companies={filteredCompanies as company[]}
                    topicName={topicName}
                    loading={companiesLoading}
                    onArchive={handleArchive}
                    onAddFirst={() => setIsDialogOpen(true)}
                />

                <AddCompanyDialog
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    topicName={topicName}
                    availableJobs={jobTitles as jobTitle[]}
                    onSuccess={handleCompanyAdded}
                />
            </div>
        </div>
    )
}

export default TopicDetailPage