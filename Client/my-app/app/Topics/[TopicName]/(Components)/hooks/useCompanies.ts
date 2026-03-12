// hooks/useCompanies.ts
import { useState, useEffect } from 'react'

export const useCompanies = (topicName: string) => {
    const [companies, setCompanies] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const fetchCompanies = async () => {
        setLoading(true)
        try {
            const res = await fetch(`http://localhost:5000/api/companies?topic=${encodeURIComponent(topicName)}`)
            const data = await res.json()
            setCompanies(data)
        } catch (error) {
            console.error("Failed to fetch companies:", error)
        } finally {
            setLoading(false)
        }
    }

    const archiveCompany = async (id: number) => {
        try {
            const res = await fetch(`http://localhost:5000/api/companies/${id}/archive`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ archive: true })
            })
            if (res.ok) {
                setCompanies(prev => prev.filter(c => c.id !== id))
                return true
            }
        } catch (error) {
            console.error("Failed to archive company:", error)
        }
        return false
    }

    useEffect(() => {
        fetchCompanies()
    }, [topicName])

    return { companies, loading, fetchCompanies, archiveCompany }
}