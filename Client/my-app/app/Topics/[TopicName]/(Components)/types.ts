export type Field = {
    name: string,
    id: string
}
export type jobTitle = {
    id: string,
    title: string,
    field?: Field,
    fieldId?: string
}
export interface CompanyFormProps {
    topicName: string
    availableJobs: jobTitle[]
    onSubmit: (data: any) => void
    loading?: boolean
    fieldId?: string
}