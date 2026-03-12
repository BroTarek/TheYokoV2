export type Field = {
    _name: string,
    _id: string
}
export type jobTitle = {
    _id: string,
    _title: string,
    _field: Field
}
export interface CompanyFormProps {
    topicName: string
    availableJobs: jobTitle[]
    onSubmit: (data: any) => void
    loading?: boolean
    fieldId?: string
}