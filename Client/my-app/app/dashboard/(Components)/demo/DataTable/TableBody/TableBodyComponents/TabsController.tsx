import { Badge } from '@/components/ui/badge'
import { TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useApplicants } from '@/features/applicants/hooks'
import { Applicant } from '@/utils/schema'
import React from 'react'

const TabsController = () => {
  return (
    <>
      <TabsList className="hidden lg:flex **:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1">
        <TabsTrigger value="outline" className="gap-2">
          Outline <Badge variant="secondary">{useApplicants({}).data?.pagination?.totalCount}</Badge>
        </TabsTrigger>
        <TabsTrigger value="archived" className="gap-2">
          Archived Applicants <Badge variant="secondary">{useApplicants({}).data?.applicants.filter((a: Applicant) => a.isArchived === true).length}</Badge>
        </TabsTrigger>
        <TabsTrigger value="key-personnel">
          Key Personnel <Badge variant="secondary">2</Badge>
        </TabsTrigger>
        <TabsTrigger value="focus-documents">Focus Documents</TabsTrigger>
      </TabsList>
    </>
  )
}

export default TabsController