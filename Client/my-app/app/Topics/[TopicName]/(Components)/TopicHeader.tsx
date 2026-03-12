// components/topics/TopicHeader.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

interface TopicHeaderProps {
    topicName: string
    companyCount: number
    onAddClick: () => void
}

const TopicHeader = ({ topicName, companyCount, onAddClick }: TopicHeaderProps) => {
    const displayTopicName = topicName.split(' :')[0]

    return (
        <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-8">
            <div className="space-y-4">
                <nav className="flex items-center gap-3 text-sm font-bold tracking-widest uppercase">
                    <Link href="/Topics" className="text-gray-400 hover:text-kaizen-red transition-colors">
                        Topics
                    </Link>
                    <span className="text-gray-600">/</span>
                    <span className="text-kaizen-red">{topicName}</span>
                </nav>
                
                <h1 className="text-5xl font-black tracking-tight text-white font-space-grotesk leading-[1.1]">
                    {displayTopicName} <span className="text-transparent bg-clip-text bg-linear-to-r from-kaizen-red to-red-400">Hub</span>
                </h1>
                
                <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                    Discover industry leaders and open opportunities. Currently tracking{' '}
                    <span className="text-white font-semibold">{companyCount} active employers</span>{' '}
                    in the {displayTopicName} sector.
                </p>
            </div>

            <Button 
                onClick={onAddClick}
                className="rounded-2xl px-10 py-8 h-auto font-black bg-kaizen-red text-white shadow-[0_0_30px_rgba(188,0,45,0.3)] hover:shadow-[0_0_50px_rgba(188,0,45,0.5)] hover:scale-[1.05] border-none transition-all duration-300"
            >
                <Plus className="w-6 h-6 mr-3" />
                Add Employer
            </Button>
        </header>
    )
}

export default TopicHeader