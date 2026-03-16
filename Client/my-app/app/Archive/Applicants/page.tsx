"use client"
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle,CardDescription } from '@/components/ui/card'
import { Archive, ArrowLeft, Building2, RotateCcw, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useUnarchiveApplicant } from '@/features/applicants/hooks'
import { useQueryClient } from '@tanstack/react-query'
import ArchivedApplicantCard from './_components/ArchivedApplicantCard'

export default function ApplicantsArchivePage() {
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [unarchivingId, setUnarchivingId] = React.useState<string | null>(null)
    const queryClient = useQueryClient()
    
    // Initialize the unarchive mutation hook
    const unarchiveMutation = useUnarchiveApplicant()

    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await fetch('http://localhost:3000/api/applicant/filter/advanced?isArchived=true')
            const jsonData = await response.json()
            setData(jsonData.applicants)
        } catch (error) {
            console.error("Failed to fetch archived submissions:", error)
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        fetchData()
    }, [])

    const handleUnarchive = async (applicantId: string) => {
        setUnarchivingId(applicantId)
        
        unarchiveMutation.mutate(applicantId, {
            onSuccess: () => {
                // Refresh the list after successful unarchive
                fetchData()
                // Invalidate queries to update other components
                queryClient.invalidateQueries({ queryKey: ['applicants'] })
            },
            onSettled: () => {
                setUnarchivingId(null)
            },
            onError: () => {
                setUnarchivingId(null)
                // Optionally show error toast here
                console.error('Failed to unarchive applicant')
            }
        })
    }

    // Separate loading state for the entire page
    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-center items-center min-h-[400px]">
                    <div className="text-center space-y-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-kaizen-red mx-auto"></div>
                        <p className="text-gray-500">Loading archives...</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8 space-y-8">
            <header className="flex items-center justify-between">
                <div className="space-y-2">
                    <Link href="/dashboard">
                        <Button variant="ghost" size="sm" className="gap-2 mb-2">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Dashboard
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight text-primary-text flex items-center gap-3">
                        <Archive className="w-8 h-8 text-kaizen-red" />
                        Applicants Archive
                    </h1>
                    <p className="text-secondary-grey">
                        Review and manage archived applicant profiles.
                    </p>
                </div>
            </header>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data?.length > 0 ? (
                        data?.map((applicant: any) => {
                            const isThisApplicantUnarchiving = unarchivingId === applicant.id
                            
                            return (
                                <ArchivedApplicantCard 
                                    key={applicant.id}
                                    applicantData={applicant} 
                                    handleUnarchive={handleUnarchive} 
                                    isThisApplicantUnarchiving={isThisApplicantUnarchiving}
                                />
                            )
                        })
                    ) : (
                        <div className="col-span-full py-20 text-center space-y-4">
                            <Archive className="w-16 h-16 text-gray-400 mx-auto" />
                            <h3 className="text-2xl font-bold text-gray-700">Archive is Empty</h3>
                            <p className="text-gray-500">No applicants have been archived yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}