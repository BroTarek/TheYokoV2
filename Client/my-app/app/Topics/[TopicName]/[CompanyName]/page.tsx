"use client"
import { useParams } from 'next/navigation'
import DataTableClient from '@/app/dashboard/(Components)/demo/DataTable/DataTableClient'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { ChevronLeft, Building2, Filter, Download, Share2, Users, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts'
import { Badge } from '@/components/ui/badge'
import { useCompanies, useCompany } from '@/features/companies/hooks'
import { useApplicants } from '@/features/applicants/hooks'
import { useFields } from '@/features/fields/hooks'
import { useJobRequirements } from '@/features/jobRequirments/hooks'

const COLORS = ['#BC002D', '#365AD6', '#181B31', '#8A8A91', '#ff6900', '#9b51e0']

const CompanyDetailPage = () => {
    const params = useParams()
    const topicName = decodeURIComponent(params.TopicName as string)
    const companyName = decodeURIComponent((params.CompanyName || params.ComapnyName) as string)

    // Pagination & Filter state
    const [pageIndex, setPageIndex] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [experienceFilter, setExperienceFilter] = useState('')

    const { data: companiesData, isPending: companiesLoading } = useCompanies()
    const { data: fieldsData } = useFields()

    // Find IDs
    const companyId = useMemo(() => {
        return companiesData?.companies?.find(
            (c: any) => c.name.toLowerCase() === companyName.toLowerCase()
        )?.id || null
    }, [companiesData, companyName])

    const fieldId = useMemo(() => {
        return fieldsData?.data?.find(
            (f: any) => f.name.toLowerCase() === topicName.toLowerCase()
        )?.id || null
    }, [fieldsData, topicName])

    const { data: companyDetails, isPending: detailsLoading } = useCompany(companyId || '')

    // Query params for applicants
    const queryParams: any = {
        page: pageIndex + 1,
        limit: pageSize,
    }
    if (fieldId) queryParams.field = fieldId
    if (experienceFilter && experienceFilter !== 'All') queryParams.yearsOfExperience = experienceFilter

    const { data: applicantsResponse, isLoading: applicantsLoading } = useApplicants(queryParams)

    const { data: jobRequirementsResponse, isPending: jobReqsLoading } = useJobRequirements({
        companyId: companyId || undefined,
        jobFieldId: fieldId || undefined
    })

    const applicants = applicantsResponse?.applicants || []
    const jobRequirements = jobRequirementsResponse?.data || []
    const meta = applicantsResponse?.pagination

    // Sync pagination state from server
    useEffect(() => {
        if (meta) {
            setPageIndex(meta.currentPage - 1)
            setPageSize(meta.limit)
        }
    }, [meta])

    const finalLoading = companiesLoading || detailsLoading || applicantsLoading || jobReqsLoading

    // Process Data for Referral Resources
    const referralData = useMemo(() => {
        const counts: Record<string, number> = {}
        applicants.forEach((item: any) => {
            const source = item.referralSource?.name || 'Other'
            counts[source] = (counts[source] || 0) + 1
        })
        return Object.entries(counts).map(([name, value]) => ({ name, value }))
    }, [applicants])

    // Process Data for Experience
    const experienceData = useMemo(() => {
        const counts: Record<string, number> = {}
        applicants.forEach((item: any) => {
            let exp = item.yearsOfExperience || 'Other'
            counts[exp] = (counts[exp] || 0) + 1
        })
        const order = ['0-5', '5-10', '10+', 'Other']
        return order
            .map(name => ({ name, value: counts[name] || 0 }))
            .filter(item => item.value > 0)
    }, [applicants])

    if (finalLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-kaizen-red border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 font-bold animate-pulse">Syncing talent database...</p>
                </div>
            </div>
        )
    }

    const finalCompany = companyDetails?.data || companiesData?.companies?.find(
        (c: any) => c.name.toLowerCase() === companyName.toLowerCase()
    )

    return (
        <div className="container mx-auto px-4 py-8 space-y-10">
            <header className="space-y-8">
                <Link href={`/Topics/${encodeURIComponent(topicName)}`} className="flex items-center text-secondary-grey hover:text-primary transition-all gap-2 font-bold text-sm w-fit group">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-all">
                        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                    </div>
                    Back to Companies
                </Link>

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-white p-10 rounded-[40px] border border-gray-100 shadow-2xl shadow-gray-200/30 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-8 relative z-10">
                        <div className="p-6 bg-linear-to-br from-[#1c213e] to-[#181b31] rounded-[28px] shadow-2xl text-white transform hover:rotate-3 transition-transform duration-500">
                            <Building2 className="w-12 h-12 text-kaizen-red" />
                        </div>
                        <div className="space-y-3">
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#1c213e] font-space-grotesk">{finalCompany?.name || companyName}</h1>
                            <div className="flex flex-wrap items-center gap-3">
                                <Badge variant="secondary" className="bg-kaizen-red/10 text-kaizen-red hover:bg-kaizen-red/20 border-none px-4 py-1.5 rounded-full text-sm font-bold">
                                    <Filter className="w-4 h-4 mr-2" />
                                    {topicName}
                                </Badge>
                                <div className="flex items-center gap-2 bg-gray-100 text-secondary-grey px-4 py-1.5 rounded-full text-sm font-bold">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    {(meta?.totalCount || 0) > 0 ? 'Active Recruitment' : 'Monitoring'}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 relative z-10">
                        <div className="bg-white px-8 py-4 rounded-3xl border border-gray-100 shadow-lg shadow-gray-100/50 flex flex-col items-center min-w-30">
                            <span className="text-[10px] text-secondary-grey font-black uppercase tracking-[0.2em] mb-1">Job Requirements</span>
                            <span className="text-3xl font-black text-kaizen-red font-space-grotesk">{finalCompany?.jobRequirementsCount || 0}</span>
                        </div>
                        <div className="bg-white px-8 py-4 rounded-3xl border border-gray-100 shadow-lg shadow-gray-100/50 flex flex-col items-center min-w-30">
                            <span className="text-[10px] text-secondary-grey font-black uppercase tracking-[0.2em] mb-1">Total Applicants</span>
                            <span className="text-3xl font-black text-kaizen-red font-space-grotesk">{meta?.totalCount || 0}</span>
                        </div>
                    </div>
                </div>
            </header>

            {applicants.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card className="rounded-[32px] border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden">
                        <CardHeader className="bg-gray-50/50 border-b border-gray-50">
                            <CardTitle className="text-lg font-bold font-space-grotesk">Sourcing Channels</CardTitle>
                            <CardDescription>Candidate acquisition breakdown</CardDescription>
                        </CardHeader>
                        <CardContent className="h-72 pt-6">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={referralData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={90}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {referralData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card className="rounded-[32px] border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden">
                        <CardHeader className="bg-gray-50/50 border-b border-gray-50">
                            <CardTitle className="text-lg font-bold font-space-grotesk">Seniority Pyramid</CardTitle>
                            <CardDescription>Experience levels across applicant pool</CardDescription>
                        </CardHeader>
                        <CardContent className="h-72 pt-6">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={experienceData}>
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
                                    <YAxis hide />
                                    <Tooltip
                                        cursor={{ fill: '#f9fafb' }}
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Bar
                                        dataKey="value"
                                        fill="#BC002D"
                                        radius={[8, 8, 8, 8]}
                                        barSize={40}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <div className="bg-white rounded-[40px] p-20 text-center border border-gray-100 shadow-sm space-y-4">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                        <Users className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#1c213e]">No Applicants Yet</h3>
                    <p className="text-gray-500 max-w-sm mx-auto">We haven't received any submissions for {companyName} in the {topicName} field yet.</p>
                </div>
            )}

            <section className="space-y-6">
                <div className="flex items-center justify-between px-4">
                    <h2 className="text-2xl font-bold text-[#1c213e] font-space-grotesk flex items-center gap-3">
                        <Briefcase className="w-7 h-7 text-kaizen-red" />
                        Job Requirements
                        <span className="text-sm font-medium text-secondary-grey bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
                            {jobRequirements.length} Positions
                        </span>
                    </h2>
                </div>

                {jobRequirements.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {jobRequirements.map((req: any) => (
                            <Card key={req.id} className="rounded-[32px] border-gray-100 shadow-xl shadow-gray-100/30 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 overflow-hidden group">
                                <div className="p-1 px-5 pt-5">
                                     <div className="flex justify-between items-start mb-4">
                                        <div className="space-y-1">
                                            <h3 className="text-xl font-bold text-[#1c213e] group-hover:text-kaizen-red transition-colors">
                                                {req.jobTitle?.title || req.jobTitle?.name || 'Position'}
                                            </h3>
                                            <p className="text-sm text-gray-500 font-medium">{req.jobField?.name || topicName}</p>
                                        </div>
                                        <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-200 border-none rounded-full px-3">
                                            {req.jobNature}
                                        </Badge>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="bg-gray-50 p-3 rounded-2xl">
                                            <p className="text-[10px] text-gray-400 font-black uppercase mb-1">Experience</p>
                                            <p className="text-sm font-bold text-[#1c213e]">{req.yearsOfExperience} Years</p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-2xl">
                                            <p className="text-[10px] text-gray-400 font-black uppercase mb-1">Headcount</p>
                                            <p className="text-sm font-bold text-[#1c213e]">{req.numberOfApplicantsNeeded} Needed</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500 font-medium">Progress</span>
                                            <span className="font-bold text-kaizen-red">{Math.round(((req.numberOfApplicantsSelected || 0) / req.numberOfApplicantsNeeded) * 100)}%</span>
                                        </div>
                                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-kaizen-red rounded-full transition-all duration-1000" 
                                                style={{ width: `${Math.min(100, ((req.numberOfApplicantsSelected || 0) / req.numberOfApplicantsNeeded) * 100)}%` }} 
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 p-4 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden">
                                                <Users className="w-4 h-4 text-gray-400" />
                                            </div>
                                        ))}
                                        <div className="w-8 h-8 rounded-full border-2 border-white bg-white flex items-center justify-center text-[10px] font-bold text-gray-400">
                                            +{req.numberOfApplicantsSelected || 0}
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-kaizen-red font-bold hover:bg-kaizen-red/10 rounded-full">
                                        View Applicants
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-[40px] p-12 text-center border border-dashed border-gray-200 space-y-3">
                        <Briefcase className="w-10 h-10 text-gray-300 mx-auto" />
                        <p className="text-gray-500 font-medium">No specific job requirements listed yet.</p>
                    </div>
                )}
            </section>

            <main className="space-y-6">
                <div className="flex items-center justify-between px-4">
                    <h2 className="text-2xl font-bold text-[#1c213e] font-space-grotesk flex items-center gap-3">
                        Talent Roster
                        <span className="text-sm font-medium text-secondary-grey bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
                            {meta?.totalCount || 0} Total Matches
                        </span>
                    </h2>
                </div>

                <div className="bg-white rounded-[40px] shadow-2xl shadow-gray-200/40 border border-gray-100 overflow-hidden group/table">
                    <div className="p-8 border-b border-gray-50 bg-linear-to-r from-gray-50/50 to-transparent flex justify-between items-center">
                        <div className="space-y-1">
                            <p className="text-sm text-secondary-grey font-medium uppercase tracking-widest">Applicant Stream</p>
                            <p className="text-xs text-gray-400">Live feed from the central submission database</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                            <Users className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="p-2">
                        <DataTableClient
                        />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default CompanyDetailPage
