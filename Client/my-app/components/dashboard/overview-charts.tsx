'use client'

import React, { useMemo } from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

const COLORS = ['#BC002D', '#365AD6', '#181B31', '#8A8A91', '#ff6900', '#9b51e0']

interface DashboardData {
    field: string
    experience: string
    [key: string]: any
}

export function OverviewCharts({ data }: { data: DashboardData[] }) {
    // Process Data for Field Distribution
    const fieldData = useMemo(() => {
        const counts: Record<string, number> = {}
        if(data.length>0){
            data&&data.forEach((item) => {
            const field = item?.field || 'Unknown'
            counts[field] = (counts[field] || 0) + 1
        })
        
        }
        return Object.entries(counts)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 6)
    }, [data])

    // Process Data for Experience
    const experienceData = useMemo(() => {
        const counts: Record<string, number> = {}
        data.forEach((item) => {
            let exp = item?.experience || 'Other'
            // Normalize experience labels for better charting
            if (exp.includes('0-5')) exp = '0-5y'
            else if (exp.includes('5-10')) exp = '5-10y'
            else if (exp.includes('10+')) exp = '10y+'
            else if (!isNaN(Number(exp))) {
                const years = Number(exp)
                if (years < 5) exp = '0-5y'
                else if (years < 10) exp = '5-10y'
                else exp = '10y+'
            }
            counts[exp] = (counts[exp] || 0) + 1
        })
        const order = ['0-5y', '5-10y', '10y+', 'Other']
        return order
            .filter(name => counts[name])
            .map(name => ({ name, value: counts[name] }))
    }, [data])

    // Process Data for Referral Resources (Mocking since not in data.json)
    const referralData = useMemo(() => {
        const sources = ['LinkedIn', 'Wazzuf', 'Indeed', 'Referral', 'Social Media', 'WhatsApp']
        // We'll use the ID as a seed for consistent "random" distribution
        const counts: Record<string, number> = {}
        data.forEach((item, index) => {
            const source = item?.referralSource || sources[index % sources.length]
            counts[source] = (counts[source] || 0) + 1
        })
        return Object.entries(counts).map(([name, value]) => ({ name, value }))
    }, [data])

    // Process Data for Applications Over Time (Mocking dates)
    const timeData = useMemo(() => {
        // Generate dates for the last 6 months
        const months = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb']
        const counts: Record<string, number> = {}

        // Distribute data points across months
        data.forEach((_, index) => {
            const month = months[index % months.length]
            counts[month] = (counts[month] || 0) + 1
        })

        return months.map(month => ({
            name: month,
            applications: counts[month] || 0
        }))
    }, [data])

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border border-gray-100 shadow-xl rounded-lg">
                    <p className="text-xs font-bold text-gray-900 mb-1">{label}</p>
                    <p className="text-sm font-medium text-kaizen-red">
                        {payload[0].value} <span className="text-gray-500 font-normal">Applications</span>
                    </p>
                </div>
            )
        }
        return null
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Field Distribution */}
            <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold uppercase tracking-wider text-gray-500">Field Distribution</CardTitle>
                    <CardDescription className="text-xs text-secondary-grey">By industry sector</CardDescription>
                </CardHeader>
                <CardContent className="h-60 pt-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={fieldData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {fieldData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="bg-white p-2 border shadow-lg rounded text-xs">
                                                <span className="font-bold">{payload[0].name}:</span> {payload[0].value}
                                            </div>
                                        )
                                    }
                                    return null
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Experience Levels */}
            <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold uppercase tracking-wider text-gray-500">Experience Levels</CardTitle>
                    <CardDescription className="text-xs text-secondary-grey">Years of professional work</CardDescription>
                </CardHeader>
                <CardContent className="h-60 pt-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={experienceData} margin={{ top: 20, right: 30, left: -20, bottom: 0 }}>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
                            <YAxis hide />
                            <Tooltip cursor={{ fill: '#f9fafb' }} content={<CustomTooltip />} />
                            <Bar
                                dataKey="value"
                                fill="#BC002D"
                                radius={[4, 4, 0, 0]}
                                barSize={30}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Referral Sources */}
            <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold uppercase tracking-wider text-gray-500">Referral Sources</CardTitle>
                    <CardDescription className="text-xs text-secondary-grey">Where candidates found us</CardDescription>
                </CardHeader>
                <CardContent className="h-60 pt-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={referralData}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                dataKey="value"
                                labelLine={false}
                            >
                                {referralData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Applications Growth */}
            <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold uppercase tracking-wider text-gray-500">Application Velocity</CardTitle>
                    <CardDescription className="text-xs text-secondary-grey">Growth over last 6 months</CardDescription>
                </CardHeader>
                <CardContent className="h-60 pt-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={timeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#BC002D" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#BC002D" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area
                                type="monotone"
                                dataKey="applications"
                                stroke="#BC002D"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorApps)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    )
}
