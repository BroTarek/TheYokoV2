import { TabsContent } from '@/components/ui/tabs'
import React from 'react'
import { TableContent } from './TableContent'
import { Table as TableType } from '@tanstack/react-table'
import { Applicant, pagination } from '@/utils/schemas'
import { UniqueIdentifier } from '@dnd-kit/core'

interface MainTableContentProps {
    table: TableType<Applicant>;
    dataIds: UniqueIdentifier[];
    pagination: pagination;
}

const MainTableContent = ({ table, dataIds, pagination }: MainTableContentProps) => {
    return (
        <>
            <TabsContent
                value="outline"
                className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6 m-0"
            >
                <TableContent 
                    table={table} 
                    dataIds={dataIds} 
                    meta={pagination} 
                />
            </TabsContent>

            <TabsContent
                value="archived"
                className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6 m-0"
            >
                <TableContent 
                    table={table} 
                    dataIds={dataIds} 
                    meta={pagination} 
                />
            </TabsContent>

            <TabsContent value="key-personnel" className="flex flex-col px-4 lg:px-6 m-0">
                <div className="aspect-video w-full flex-1 rounded-lg border border-dashed flex items-center justify-center text-muted-foreground bg-slate-50">
                    Key Personnel content coming soon
                </div>
            </TabsContent>
            
            <TabsContent value="focus-documents" className="flex flex-col px-4 lg:px-6 m-0">
                <div className="aspect-video w-full flex-1 rounded-lg border border-dashed flex items-center justify-center text-muted-foreground bg-slate-50">
                    Focus Documents content coming soon
                </div>
            </TabsContent>
        </>
    )
}

export default MainTableContent
