"use client"
import React from 'react';
import { ChevronLeft, ChevronRight, Settings } from 'lucide-react';
import Link from 'next/link';

type UserStatus = 'Active' | 'Inactive';
type VerificationStatus = 'Verified' | 'UnVerified' | 'Pending';

type User = {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
  date: string;
  lastLogin: string;
  verified: VerificationStatus;
};

type UserDataTableProps = {
  users: User[];
  totalUsers: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const getStatusStyle = (status: UserStatus) => {
  switch (status) {
    case 'Active':
      return 'text-blue-500';
    case 'Inactive':
      return 'text-red-400';
    default:
      return 'text-gray-500';
  }
};

const getVerificationStyle = (status: VerificationStatus) => {
  switch (status) {
    case 'Verified':
      return 'text-green-500';
    case 'UnVerified':
      return 'text-red-500';
    case 'Pending':
      return 'text-yellow-500';
    default:
      return 'text-gray-500';
  }
};

const UserDataTable: React.FC<UserDataTableProps> = ({
  users,
  totalUsers,
  currentPage,
  onPageChange,
}) => {
  const itemsPerPage = 13;
  const totalPages = Math.ceil(totalUsers / itemsPerPage);

  return (
    <div className="w-full bg-white rounded-lg shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-3">
          <thead>
            {/* Header row */}
            <tr>
              <th className="bg-primary/10 rounded-md py-3 px-4 text-left text-sm text-primary font-semibold">ID</th>
              <th className="bg-primary/10 rounded-md py-3 px-4 text-left text-sm text-primary font-semibold">Name</th>
              <th className="bg-primary/10 rounded-md py-3 px-4 text-left text-sm text-primary font-semibold">Email</th>
              <th className="bg-primary/10 rounded-md py-3 px-4 text-left text-sm text-primary font-semibold">Status</th>
              <th className="bg-primary/10 rounded-md py-3 px-4 text-left text-sm text-primary font-semibold">Date</th>
              <th className="bg-primary/10 rounded-md py-3 px-4 text-left text-sm text-primary font-semibold">Last login</th>
              <th className="bg-primary/10 rounded-md py-3 px-4 text-left text-sm text-primary font-semibold flex items-center"><Settings className='size-3' />Verified</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-600">
                  <Link href={`/dashboard/users/profiles/${user.id}/`} className="text-primary font-medium">
                    #{user.id}
                  </Link>
                </td>
                <td className="py-3 px-4 text-sm text-gray-800 font-medium">{user.name}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{user.email}</td>
                <td className="py-3 px-4">
                  <span className={`text-sm flex items-center gap-1 ${getStatusStyle(user.status)}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-blue-500' : 'bg-red-400'
                      }`}></span>
                    {user.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">{user.date}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{user.lastLogin}</td>
                <td className="py-3 px-4">
                  <span className={`text-sm ${getVerificationStyle(user.verified)}`}>
                    {user.verified}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-3 flex items-center justify-between border-t border-gray-100">
        <p className="text-sm text-gray-500">
          Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, totalUsers)} of {totalUsers}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
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
  );
};

export default UserDataTable