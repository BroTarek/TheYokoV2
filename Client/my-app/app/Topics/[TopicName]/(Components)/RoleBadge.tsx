// components/topics/RoleBadge.tsx

interface RoleBadgeProps {
    role: any
    topicName: string
}

const RoleBadge = ({ role, topicName }: RoleBadgeProps) => {
    const roleName = typeof role === 'string' ? role : role.name
    const experience = typeof role === 'string' ? null : role.experience
    const isCurrentTopic = roleName === topicName

    return (
        <span className={`bg-white/5 border px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
            isCurrentTopic 
                ? 'border-kaizen-red/40 bg-kaizen-red/10 text-kaizen-red' 
                : 'border-white/5 text-gray-400'
        }`}>
            {roleName.split(' (')[0].split(' :')[0]}
            {experience && (
                <span className="opacity-60 text-[8px] border-l border-white/10 pl-2">
                    {experience}Y
                </span>
            )}
        </span>
    )
}

export default RoleBadge