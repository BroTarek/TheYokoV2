// components/topics/CompanyGrid.tsx
import { Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CompanyCard from './CompanyCard'

type Field={
    name:string,
    id:string
}
type jobTitle={
    id:string,
    title:string,
    field:Field}
type  company= {
        id: string,
        name: string,
        description?: string | null | undefined,
        is_archived?: boolean | undefined,
        created_at?: string | Date | undefined,
        fields?: Field[] ,
        jobRequirementsCount?: number | undefined,
    };
interface CompanyGridProps {
    companies: company[]
    topicName: string
    loading: boolean
    onArchive: (id: string) => void
    onAddFirst: () => void
}

const CompanyGrid = ({ companies, topicName, loading, onArchive, onAddFirst }: CompanyGridProps) => {
    console.log(companies)
    if (loading && companies.length === 0) {
        return (
            <div className="min-h-100 flex items-center justify-center text-white text-xl">
                Loading hub...
            </div>
        )
    }

    if (companies.length === 0) {
        const displayTopicName = topicName.split(' :')[0]
        
        return (
            <div className="col-span-full py-20 text-center space-y-4">
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Building2 className="w-10 h-10 text-gray-600" />
                </div>
                <h3 className="text-2xl font-bold text-white">No Employers Found</h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                    Be the first to register an industry leader in the {displayTopicName} sector.
                </p>
                <Button 
                    variant="outline" 
                    onClick={onAddFirst} 
                    className="mt-4 border-gray-700 text-gray-400 hover:bg-white/5 hover:text-white rounded-xl"
                >
                    Add First Employer
                </Button>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companies.map((company, i) => (
                <CompanyCard 
                    key={i}
                    company={company}
                    topicName={topicName}
                    onArchive={onArchive}
                />
            ))}
        </div>
    )
}

export default CompanyGrid