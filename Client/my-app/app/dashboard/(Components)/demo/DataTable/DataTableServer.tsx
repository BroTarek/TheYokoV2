import { Applicant, pagination } from '@/utils/schemas'
import DataTableBody from './TableBody/DataTableBody';

type DataTableServerProps = 
  | { status: 'loading' | 'fetching'; isLoading: boolean; isFetching: boolean }
  | { status: 'error'; error: Error }
  | { status: 'success'; data: { applicant: Applicant[]; pagination: pagination } }

const DataTableServer = (props: DataTableServerProps) => {
  switch (props.status) {
    case 'loading':
    case 'fetching':
      return <div>{props.status === 'loading' ? 'Loading...' : 'Fetching...'}</div>
    
    case 'error':
      return <div>Error: {props.error.message}</div>
    
    case 'success':
      return (
        <>
        <DataTableBody applicant={props.data.applicant} pagination={props.data.pagination}/>
        </>
      )
    
    default:
      return <div>No data available</div>
  }
}

export default DataTableServer