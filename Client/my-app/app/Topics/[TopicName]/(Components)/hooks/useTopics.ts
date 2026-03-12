// hooks/useTopics.ts
import { useState, useEffect } from 'react'
type Fields={
    name:string,
    id:string
}

type FieldsEndpoint={
    meta:{
    hasNextPage:boolean,hasPrevPage:boolean,
    limit:number,
    page:number,
    total:number,
    totalPages:number
    },
    fields:Fields[]
}
export const useTopics = () => {
    const [topics, setTopics] = useState<FieldsEndpoint>({
        meta: {
            hasNextPage: false,
            hasPrevPage: false,
            limit: 0,
            page: 0,
            total: 0,
            totalPages: 0
        },
        fields: []
    })
    const [loading, setLoading] = useState(true)

    const fetchTopics = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/fields')
            const data = await res.json()
            setTopics(data)
        } catch (error) {
            console.error("Failed to fetch topics:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTopics()
    }, [])

    return { topics, loading, fetchTopics }
}