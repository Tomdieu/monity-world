"use client"

import React from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';



type UserRequest = {
  id: string;
  name: string;
  email: string;
  dateRequested: string;
  status: RequestStatus;
};

type KycUserTableProps = {
  requests: UserRequest[];
  totalRequests: number;
  itemsPerPage?: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const getStatusStyle = (status: RequestStatus) => {
  switch (status) {
    case 'Pending':
      return 'text-yellow-500';
    case 'Approved':
      return 'text-green-500';
    case 'Rejected':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

const KycUserTable: React.FC<KycUserTableProps> = ({
  requests,
  totalRequests,
  itemsPerPage=13,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalRequests / itemsPerPage);

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="overflow-x-auto rounded-lg border border-neutral-300">
        <table className="w-full">
          <thead>
            <tr className=''>
              <th className="bg-blue-50 rounded-md py-3 px-4 text-left text-sm text-blue-400 font-semibold">ID</th>
              <th className="bg-blue-50 rounded-md py-3 px-4 text-left text-sm text-blue-400 font-semibold">Name</th>
              <th className="bg-blue-50 rounded-md py-3 px-4 text-left text-sm text-blue-400 font-semibold">Email</th>
              <th className="bg-blue-50 rounded-md py-3 px-4 text-left text-sm text-blue-400 font-semibold">Date requested</th>
              <th className="bg-blue-50 rounded-md py-3 px-4 text-left text-sm text-blue-400 font-semibold">Status</th>
            </tr>
          </thead>
          
          <tbody className='bg-white'>
            {requests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-600">
                    <Link href={`/dashboard/users/kyc-center/${request.id}`} className='hover:text-primary'>{request.id}</Link>
                </td>
                <td className="py-3 px-4 text-sm font-medium text-gray-700">{request.name}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{request.email}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{request.dateRequested}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1.5">
                    {/* <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span> */}
                    <Clock className="w-2 h-2  text-yellow-400"/>
                    <span className={`text-sm ${getStatusStyle(request.status)}`}>
                      {request.status}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-3 flex items-center justify-end border-t border-gray-100">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 font-semibold">
            Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, totalRequests)} of {totalRequests}
          </span>
          <div className="flex items-center  gap-2 rounded-lg border border-neutral-300">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className='w-2 h-6 border-r'></div>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KycUserTable