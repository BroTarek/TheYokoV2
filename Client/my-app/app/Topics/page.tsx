"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Users, LayoutGrid, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState, useEffect } from 'react'
import { da } from 'zod/v4/locales'
import { useFields } from '@/features/fields/hooks'
import { JobField } from '@/utils/schemas'

const TopicsPage = () => {

    const { data, isLoading } = useFields({})

    const topics = data?.data as JobField[] | undefined;

    const topicStats = useMemo(() => {
        if (!topics || !Array.isArray(topics)) return [];
        return topics.map(topic => ({
            name: topic.name,
            id: topic.name
        }))
    }, [topics])

    if (isLoading) {
        return <div className="p-10 text-center text-lg">Loading topics...</div>
    }

    return (
        <div className="container mx-auto px-4 py-8 space-y-10">
            <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
                <div className="space-y-3">
                    <h1 className="text-4xl font-bold tracking-tight text-primary-text font-space-grotesk">Topics Explorer</h1>
                    <p className="text-secondary-grey text-lg max-w-2xl">
                        Discover specialized fields and talent distribution across the platform. Click on a topic to explore specific companies and opportunities.
                    </p>
                </div>
                {/* <Button className="rounded-2xl px-8 py-7 h-auto font-bold bg-primary text-primary-foreground shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
                    <Plus className="w-6 h-6 mr-2" />
                    New Field
                </Button> */}
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {topicStats.map((topic, i) => (
                    <Link key={i} href={`/Topics/${encodeURIComponent(topic.name)}`} className="group outline-none">
                        <Card className="h-full border border-gray-100/50 shadow-sm hover:shadow-2xl transition-all duration-500 bg-white/70 backdrop-blur-md group-hover:-translate-y-2 overflow-hidden relative rounded-3xl">
                            {/* Decorative element */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[60px] -mr-12 -mt-12 transition-all duration-700 group-hover:scale-[2] group-hover:bg-primary/10" />

                            <CardHeader className="relative z-10">
                                <div className="p-4 bg-primary/5 w-fit rounded-2xl mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:rotate-6 shadow-sm">
                                    <LayoutGrid className="w-7 h-7" />
                                </div>
                                <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors font-space-grotesk">{topic.name}</CardTitle>
                                <CardDescription className="flex items-center gap-2 text-base font-medium mt-1">
                                    {/* <span className="text-primary font-bold">{topic.subtopics}</span> */}
                                    <span className="text-secondary-grey">Sub Topics</span>
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="relative z-10 pt-4">
                                <div className="flex items-center justify-between border-t border-gray-50 pt-6">
                                    <div className="flex items-center gap-3 bg-secondary/30 px-4 py-2 rounded-full">
                                        <Users className="w-5 h-5 text-primary" />
                                        {/* <span className="text-sm font-bold text-primary-text">{topic.applicants.toLocaleString()} Applicants</span> */}
                                    </div>
                                    <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-4 group-hover:translate-x-0 bg-primary/5">
                                        <ArrowRight className="w-5 h-5 text-primary" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default TopicsPage