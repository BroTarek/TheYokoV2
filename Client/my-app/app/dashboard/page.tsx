"use client"
import DataTableClient from '@/app/dashboard/(Components)/demo/DataTable/DataTableClient'
const DashboardPage = () => {
    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 bg-slate-50/50 min-h-screen">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Applicant Dashboard</h2>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <DataTableClient />
            </div>
        </div>
    )
}

export default DashboardPage
