"use client"

import React, { useMemo } from 'react';
import { useApplicants } from '@/features/applicants/hooks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Loader2 } from 'lucide-react';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'];

export default function ApplicantCharts() {
    // Fetch a large number of applicants to get meaningful stats 
    // In a real production app, stats should ideally be aggregated on the backend
    const { data, isLoading, error } = useApplicants({ limit: 1000 });

    const stats = useMemo(() => {
        if (!data?.applicants) return null;

        const applicants = data.applicants;
        
        // 1. Years of Experience Stats
        const expMap: Record<string, number> = {};
        // 2. Referral Source Stats
        const refMap: Record<string, number> = {};
        // 3. Status Stats
        const statusMap: Record<string, number> = {};
        // 4. Job Field Stats
        const fieldMap: Record<string, number> = {};

        applicants.forEach((app: any) => {
            // Experience
            const exp = app.yearsOfExperience || 'Unknown';
            expMap[exp] = (expMap[exp] || 0) + 1;

            // Referral Source
            const refSource = app.referralSource?.name || 'Walk-in / Direct';
            refMap[refSource] = (refMap[refSource] || 0) + 1;

            // Status
            const status = app.status || 'unseen';
            statusMap[status] = (statusMap[status] || 0) + 1;

            // Job Field
            const field = app.jobField?.name || 'Unspecified';
            fieldMap[field] = (fieldMap[field] || 0) + 1;
        });

        // Format for Recharts
        const expData = Object.entries(expMap).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
        const refData = Object.entries(refMap).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
        const statusData = Object.entries(statusMap).map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value })).sort((a, b) => b.value - a.value);
        const fieldData = Object.entries(fieldMap).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);

        return { expData, refData, statusData, fieldData, total: applicants.length };
    }, [data]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-8 bg-white rounded-xl shadow-sm border border-slate-200">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                <span className="ml-3 text-slate-500 font-medium">Loading charts...</span>
            </div>
        );
    }

    if (error || !stats) {
        return (
            <div className="p-8 bg-white rounded-xl shadow-sm border border-red-200 text-red-500">
                Failed to load chart data. 
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="col-span-1 lg:col-span-2 shadow-sm border-slate-200">
                <CardHeader>
                    <CardTitle className="text-lg text-slate-800">Years of Experience</CardTitle>
                    <CardDescription>Distribution of applicants by experience level</CardDescription>
                </CardHeader>
                <CardContent className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={stats.expData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} tickLine={false} axisLine={false} />
                            <YAxis tick={{ fill: '#64748b', fontSize: 12 }} tickLine={false} axisLine={false} />
                            <Tooltip 
                                cursor={{ fill: '#f1f5f9' }}
                                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                {stats.expData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card className="col-span-1 shadow-sm border-slate-200">
                <CardHeader>
                    <CardTitle className="text-lg text-slate-800">Referral Sources</CardTitle>
                    <CardDescription>Where applicants come from</CardDescription>
                </CardHeader>
                <CardContent className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={stats.refData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={2}
                                dataKey="value"
                            >
                                {stats.refData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Legend wrapperStyle={{ fontSize: '12px' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card className="col-span-1 shadow-sm border-slate-200">
                <CardHeader>
                    <CardTitle className="text-lg text-slate-800">Applicant Status</CardTitle>
                    <CardDescription>Current pipeline status</CardDescription>
                </CardHeader>
                <CardContent className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={stats.statusData}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                labelLine={false}
                            >
                                {stats.statusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[(index + 3) % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {stats.fieldData.length > 0 && (
                <Card className="col-span-1 md:col-span-2 lg:col-span-4 shadow-sm border-slate-200">
                    <CardHeader>
                        <CardTitle className="text-lg text-slate-800">Job Fields</CardTitle>
                        <CardDescription>Applicants categorized by job field</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats.fieldData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                                <XAxis type="number" tick={{ fill: '#64748b', fontSize: 12 }} tickLine={false} axisLine={false} />
                                <YAxis dataKey="name" type="category" width={120} tick={{ fill: '#64748b', fontSize: 12 }} tickLine={false} axisLine={false} />
                                <Tooltip 
                                    cursor={{ fill: '#f1f5f9' }}
                                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                                    {stats.fieldData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
