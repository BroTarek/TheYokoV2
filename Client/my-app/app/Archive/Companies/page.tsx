"use client"
import React from 'react'
import { useCompanies, useUnarchiveCompany } from '@/features/companies/hooks'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2, Archive, ArrowLeft, RotateCcw, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function CompaniesArchivePage() {
    const { data, isLoading, error } = useCompanies({ includeArchived: true })
    const unarchiveMutation = useUnarchiveCompany()

    const handleUnarchive = async (id: string) => {
        try {
            await unarchiveMutation.mutateAsync(id)
            toast.success('Company unarchived successfully')
        } catch (error: any) {
            toast.error(error?.response?.data?.error || 'Failed to unarchive company')
        }
    }

    if (isLoading) {
        return <div className="p-10 text-center">Loading archived companies...</div>
    }

    if (error) {
        return <div className="p-10 text-center text-red-500">Failed to load archived companies.</div>
    }

    const companies = data?.companies?.filter((c: any) => c.isArchived) || []

    return (
        <div className="container mx-auto px-4 py-8 space-y-8">
            <header className="space-y-4">
                <Link href="/Topics">
                    <Button variant="ghost" size="sm" className="gap-2 text-gray-400 hover:text-white">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Topics
                    </Button>
                </Link>
                <h1 className="text-4xl font-black tracking-tight text-white font-space-grotesk flex items-center gap-4">
                    <Archive className="w-10 h-10 text-kaizen-red" />
                    Companies Archive
                </h1>
                <p className="text-gray-400 text-lg">
                    Manage industry leaders that are currently inactive or archived.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {companies.length > 0 ? (
                    companies.map((company: any) => (
                        <Card key={company.id} className="h-full border border-gray-800/50 shadow-2xl bg-[#1c213e]/80 backdrop-blur-xl relative rounded-[40px] overflow-hidden grayscale">
                            <CardHeader className="pb-0 pt-10 px-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-5 bg-white/5 w-fit rounded-[24px] border border-white/5">
                                        <Building2 className="w-8 h-8 text-gray-500" />
                                    </div>
                                    <div className="flex items-center gap-2 bg-gray-800 text-gray-500 border border-gray-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                                        Archived
                                    </div>
                                </div>
                                <CardTitle className="text-3xl font-black text-white font-space-grotesk leading-tight">
                                    {company.name}
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-8 p-8">
                                <div className="flex items-center justify-between border-t border-white/5 pt-8 mt-4">
                                    <Button
                                        onClick={() => handleUnarchive(company.id)}
                                        variant="outline"
                                        className="rounded-xl border-gray-700 text-gray-400 hover:bg-white/5 hover:text-white"
                                        disabled={unarchiveMutation.isPending}
                                    >
                                        <RotateCcw className="w-4 h-4 mr-2" />
                                        {unarchiveMutation.isPending ? 'Unarchiving...' : 'Unarchive'}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="rounded-xl text-kaizen-red hover:bg-kaizen-red/10 animate-pulse"
                                        disabled
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center space-y-4">
                        <Archive className="w-16 h-16 text-gray-600 mx-auto" />
                        <h3 className="text-2xl font-bold text-white">Archive is Empty</h3>
                        <p className="text-gray-500">No companies have been archived yet.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
