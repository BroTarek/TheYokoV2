"use client"
import DataTableClient from '@/app/dashboard/(Components)/demo/DataTable/DataTableClient'
import ApplicantCharts from '@/app/dashboard/(Components)/Charts/ApplicantCharts'

const DashboardPage = () => {
    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 bg-slate-50/50 min-h-screen">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">Applicant Dashboard</h2>
            </div>

            {/* Charts Section */}
            <ApplicantCharts />

            {/* Data Table Section */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mt-6">
                <DataTableClient />
            </div>
        </div>
    )
}

export default DashboardPage
