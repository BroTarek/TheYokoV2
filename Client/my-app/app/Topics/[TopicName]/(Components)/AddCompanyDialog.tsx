// components/topics/AddCompanyDialog.tsx
import { useState } from 'react'
import { toast } from 'sonner'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import CompanyForm from './CompanyForm'
import { useCreateCompany } from '@/features/companies/hooks'
import { jobTitle } from './types'


interface AddCompanyDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    topicName: string
    availableJobs: jobTitle[]
    onSuccess: () => void
}

const AddCompanyDialog = ({
    open,
    onOpenChange,
    topicName,
    availableJobs,
    onSuccess
}: AddCompanyDialogProps) => {
    const { mutate: createCompany, isPending: loading } = useCreateCompany()

    const handleSubmit = async (formData: any) => {
        console.log(formData)
        try {
            createCompany(formData, {
                onSuccess: () => {
                    toast.success("Company added successfully")
                    onSuccess()
                    onOpenChange(false)
                },
                onError: (error: any) => {
                    const message = error?.response?.data?.error || "Failed to add company"
                    toast.error(message)
                }
            })
        } catch (error) {
            console.error("Failed to add company:", error)
            toast.error("Failed to add company")
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-130 w-[95vw] h-[85vh] max-h-200 bg-[#1c213e] border-gray-800 text-white rounded-[32px] shadow-2xl overflow-hidden p-0 flex! flex-col!">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-kaizen-red z-50" />

                <DialogHeader className="px-8 pt-10 pb-6 shrink-0 bg-linear-to-b from-[#1c213e] to-[#1c213e]/95">
                    <DialogTitle className="text-3xl font-black font-space-grotesk tracking-tight text-left">
                        Register Employer
                    </DialogTitle>
                    <DialogDescription className="text-gray-400 text-base text-left mt-1">
                        Initialize a new recruitment entity in the {topicName.split(' :')[0]} sector.
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="flex-1 min-h-0 bg-[#1c213e]">
                    <CompanyForm
                        topicName={topicName}
                        availableJobs={availableJobs}
                        onSubmit={handleSubmit}
                        loading={loading}
                        fieldId={availableJobs[0]?.field?.id || (availableJobs[0] as any)?.fieldId}
                    />
                </ScrollArea>

                <DialogFooter className="p-8 bg-black/40 border-t border-white/5 shrink-0 z-10">
                    <Button
                        type="submit"
                        form="company-form"
                        disabled={loading}
                        className="w-full h-16 rounded-4xl font-black text-xl bg-kaizen-red shadow-[0_10px_30px_rgba(188,0,45,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                        {loading ? 'Registering...' : 'Confirm Registration'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddCompanyDialog