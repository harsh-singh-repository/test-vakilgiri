import { ColumnDef } from '@tanstack/react-table';
import { Project } from '../types';
import ActionButton from './actions';
import ShowBusiness from './showBusiness';

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: 'profile-image',
    header: '',
    cell: ({ row }) => (
      <img
        src={row.getValue('profile-image')}
        alt="Profile"
        className="w-10 h-10 rounded-full object-cover"
      />
    ),
  },
  {
    accessorKey: 'code',
    header: 'Project ID',
    cell: ({ row }) => (
      <span
        className="font-medium text-[14px] ml-2"
        style={{ color: '#f21300', fontFamily: 'Poppins' }}
      >
        {row.getValue('code')}
      </span>
    ),
  },
  {
    accessorKey: 'project',
    header: 'Project',
    cell: ({ row }) => (
      <span style={{ color: '#091747', fontFamily: 'Poppins' }} className='text-[14px] font-medium'>
        {row.original.projectService.name}
      </span>
    ),
  },
  {
    accessorKey: 'bussiness',
    header: 'Business',
    cell: ({ row }) => (
      <span
        style={{ color: '#f21300', fontFamily: 'Poppins' }} className='text-[14px] font-medium'
      >
       <ShowBusiness id={row.original.businessId}/>
      </span>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Created by',
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'));
      const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
      return (
        <span style={{ color: '#091747', fontFamily: 'Poppins' }} className='text-[14px] font-medium'>
          {formattedDate}
        </span>
      );
    },
  },
  {
    accessorKey: 'projectDateDue',
    header: 'Due Date',
    cell: ({ row }) => {
      const date = new Date(row.getValue('projectDateDue'));
      return (
        <span style={{ color: '#091747', fontFamily: 'Poppins' }} className='text-[14px] font-medium'>
          {date.toLocaleDateString() === '1/1/1970' ? '' : date.toLocaleDateString()}
        </span>
      );
    },
  },
  {
    accessorKey: 'progress',
    header: 'Progress',
    cell: ({ row }) => {
      const progress: string = row.getValue('progress');
      return (
        <div className="flex items-center">
          <span style={{ color: '#091747', fontFamily: 'Poppins' }}>
            {progress}
          </span>
          <div className="w-full h-2 ml-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-[#f21300] rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'assigned',
    header: 'Assigned',
    cell: ({ row }) => (
      <span style={{ color: '#091747', fontFamily: 'Poppins' }}>
        {row.getValue('assigned')}
      </span>
    ),
  },
  {
    accessorKey: 'projectStatus',
    header: () => (
      <div className="flex justify-center items-center">Status</div>
    ),
    cell: ({ row }) => {
      const status: string = row.getValue('projectStatus');
      const statusColor = status === 'Upgrade' ? 'bg-[#b114fa]' : 'bg-[#afafaf]';
      return (
        <div className="flex justify-center items-center w-full">
          <span
            className={`px-2 py-1 rounded-full text-white text-[13px] ${statusColor}`}
            style={{ fontFamily: 'Poppins' }}
          >
            {status}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'action',
    header: () => (
      <div className="flex justify-center items-center">Action</div>
    ),
    cell: ({row}) => <ActionButton project={row.original}/>,
  },
];
