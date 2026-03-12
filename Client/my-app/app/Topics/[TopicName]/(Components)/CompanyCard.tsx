// components/topics/CompanyCard.tsx
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Building2, Briefcase, ArrowRight, Archive, TrendingUp } from 'lucide-react'

interface CompanyCardProps {
    company: any
    topicName: string
    onArchive: (id: string) => void
}

const CompanyCard = ({ company, topicName, onArchive }: CompanyCardProps) => {
    const handleArchive = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        onArchive(company.id)
    }

    // Get job requirements count
    const jobCount = company.jobRequirementsCount || 0

    return (
        <Link 
            href={`/Topics/${encodeURIComponent(topicName)}/${encodeURIComponent(company.name)}`} 
            className="group outline-none"
        >
            <Card className="h-full border border-gray-800/50 shadow-2xl transition-all duration-700 bg-linear-to-br from-[#1c213e]/80 to-[#181b31]/80 backdrop-blur-xl group-hover:bg-[#252a4d] group-hover:-translate-y-3 overflow-hidden relative rounded-[40px]">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-kaizen-red/10 rounded-full blur-[80px] group-hover:bg-kaizen-red/20 transition-all duration-700" />

                <CardHeader className="relative pb-0 pt-10 px-8">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-5 bg-white/5 w-fit rounded-[24px] border border-white/5 group-hover:bg-kaizen-red group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-xl">
                            <Building2 className="w-8 h-8 text-kaizen-red group-hover:text-white" />
                        </div>
                        <div className="flex items-center gap-2 bg-kaizen-red/10 text-kaizen-red border border-kaizen-red/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse">
                            <TrendingUp className="w-3.5 h-3.5" />
                            Active
                        </div>
                    </div>
                    
                    <CardTitle className="text-3xl font-black text-white group-hover:text-kaizen-red transition-colors font-space-grotesk leading-tight">
                        {company.name}
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-8 p-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">
                            <Briefcase className="w-4 h-4 text-kaizen-red" />
                            Key Role Alignments
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                            {company.fields && company.fields.length > 0 ? (
                                company.fields.map((field: any, idx: number) => (
                                    <span key={idx} className="bg-kaizen-red/10 border border-kaizen-red/30 px-4 py-2 rounded-2xl text-[10px] text-kaizen-red font-bold">
                                        {field.name}
                                    </span>
                                ))
                            ) : (
                                <span className="bg-white/5 border border-white/5 px-4 py-2 rounded-2xl text-[10px] text-gray-500">
                                    No fields specified
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/5 pt-8 mt-4">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-1">
                                Open Positions
                            </span>
                            <div className="flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-kaizen-red" />
                                <span className="text-2xl font-black text-white tracking-tighter">
                                    {jobCount}
                                    <span className="text-sm font-normal text-gray-500 ml-2 tracking-normal">
                                        Role{jobCount !== 1 ? 's' : ''}
                                    </span>
                                </span>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <Button
                                onClick={handleArchive}
                                variant="ghost"
                                size="icon"
                                className="w-10 h-10 rounded-xl text-gray-500 hover:text-kaizen-red hover:bg-kaizen-red/10 transition-all opacity-0 group-hover:opacity-100"
                            >
                                <Archive className="w-5 h-5" />
                            </Button>
                            
                            <div className="w-14 h-14 rounded-4xl bg-kaizen-red text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0 rotate-45 group-hover:rotate-0 shadow-2xl shadow-kaizen-red/40">
                                <ArrowRight className="w-7 h-7" />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}

export default CompanyCard