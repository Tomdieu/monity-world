import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import React from "react";

interface Staff {
  id: string;
  name: string;
  startDate: string;
  department: string;
  role: string;
  lastActivity: string;
}

interface StaffDataTableProps {
  staff: Staff[];
  totalStaff: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const StaffDataTable = ({
  staff,
  totalStaff,
  currentPage,
  onPageChange,
}: StaffDataTableProps) => {
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalStaff / itemsPerPage);

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table className="w-full border-separate border-spacing-2">
          <TableHeader>
            <TableRow>
              <TableHead className="bg-primary/10 rounded-md py-3 px-4 text-center text-sm text-primary font-semibold">
                Staff ID
              </TableHead>
              <TableHead className="bg-primary/10 rounded-md py-3 px-4 text-center text-sm text-primary font-semibold">
                Name
              </TableHead>
              <TableHead className="bg-primary/10 rounded-md py-3 px-4 text-center text-sm text-primary font-semibold">
                Start Date
              </TableHead>

              <TableHead className="bg-primary/10 rounded-md py-3 px-4 text-center text-sm text-primary font-semibold">
                Department
              </TableHead>
              <TableHead className="bg-primary/10 rounded-md py-3 px-4 text-center text-sm text-primary font-semibold">
                Role
              </TableHead>
              <TableHead className="bg-primary/10 rounded-md py-3 px-4 text-center text-sm text-primary font-semibold">
                Last Activity
              </TableHead>

              <TableHead className="bg-primary/10 rounded-md py-3 px-4 text-center text-sm text-primary font-semibold">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staff.map((member) => (
              <TableRow key={member.id} className="hover:bg-gray-50">
                <TableCell>#{member.id}</TableCell>
                <TableCell className="text-center">{member.name}</TableCell>
                <TableCell className="text-center">
                  {member.startDate}
                </TableCell>

                <TableCell className="text-center">
                  {member.department}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {member.role}
                </TableCell>
                <TableCell className="text-primary text-start">
                  {member.lastActivity}
                </TableCell>

                <TableCell className="text-right">
                  <Link href={`/dashboard/control/${member.id}`}>
                    <Button variant="outline" className="w-full">
                      Manage
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <div className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default StaffDataTable;
