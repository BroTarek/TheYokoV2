import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2, RotateCcw, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Applicant } from '@/utils/schemas'

interface ArchivedApplicantCardProps {
    applicantData: Applicant
    handleUnarchive: (applicantId: string) => Promise<void>
    isThisApplicantUnarchiving: boolean
}

const ArchivedApplicantCard = ({ 
    applicantData, 
    handleUnarchive, 
    isThisApplicantUnarchiving 
}: ArchivedApplicantCardProps) => {
    return (
        <Card className="h-full border border-gray-800/50 shadow-2xl bg-[#1c213e]/80 backdrop-blur-xl relative rounded-[40px] overflow-hidden grayscale">
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
                    {applicantData.firstName} {applicantData.lastName}
                </CardTitle>
                <div className="space-y-2 mt-4">
                    <div className="flex items-center gap-2 bg-gray-800 text-gray-500 border border-gray-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest w-fit">
                        {applicantData.jobField?.name || 'No Job Field'}
                    </div>
                    <div className="flex items-center gap-2 bg-gray-800 text-gray-500 border border-gray-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest w-fit">
                        {applicantData.jobTitle?.title || 'No Job Title'}
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-8 p-8">
                <div className="flex items-center justify-between border-t border-white/5 pt-8 mt-4">
                    <Button
                        onClick={() => handleUnarchive(applicantData.id)}
                        variant="outline"
                        className={`rounded-xl border-gray-700 text-gray-400 hover:bg-white/5 hover:text-white transition-all duration-200 ${
                            isThisApplicantUnarchiving ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={isThisApplicantUnarchiving}
                    >
                        <RotateCcw className={`w-4 h-4 mr-2 ${
                            isThisApplicantUnarchiving ? 'animate-spin' : ''
                        }`} />
                        {isThisApplicantUnarchiving ? 'Unarchiving...' : 'Unarchive'}
                    </Button>
                    <Button
                        variant="ghost"
                        className="rounded-xl text-kaizen-red hover:bg-kaizen-red/10"
                        disabled
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default ArchivedApplicantCard