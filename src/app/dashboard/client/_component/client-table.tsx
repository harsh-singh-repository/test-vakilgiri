'use client';
import React, { useEffect } from 'react';
import {
  Cell,
  ColumnDef,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import Image from 'next/image';
import profileImage from '../../../../../public/assets/profile-image.png';
import ActionButton from './actions';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { ScrollBar } from '@/components/ui/scroll-area';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
  searchValue: string; // Add searchValue here
  pageNo: number;
  totalUsers: number;
  pageSizeOptions?: number[];
  pageCount: number;
}

interface CustomCellProps<TData, TValue>{
  cell: Cell<TData, TValue>; // Adjust `any` for your data type
}

export function ClientTable<TData, TValue>({
  columns,
  data,
  pageNo,
  searchKey,
  // totalUsers,
  pageCount,
  pageSizeOptions = [20, 30, 50, 100]
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = React.useState<string>(searchParams?.get(searchKey) || '');
  
  const [{ pageIndex, pageSize }, setPagination] = React.useState<PaginationState>({
    pageIndex: pageNo - 1,
    pageSize: parseInt(searchParams?.get('limit') || '20', 10),
    
  });

  // Handle search params and update pagination or search value
  React.useEffect(() => {
    if (!searchParams) return;

    const pageFromParams = parseInt(searchParams.get('page') || `${pageNo}`);
    const limitFromParams = parseInt(searchParams.get('limit') || '20');
    const searchFromParams = searchParams.get(searchKey) || '';

    setPagination({
      pageIndex: pageFromParams - 1,
      pageSize: limitFromParams,
    });
    setSearchValue(searchFromParams);
  }, [searchParams, pageNo, searchKey]);

  // Handle query string creation based on search parameters
  const createQueryString = React.useCallback((params: Record<string, string | number | null>) => {
    const newSearchParams = new URLSearchParams(searchParams?.toString() || '');

    for (const [key, value] of Object.entries(params)) {
      if (value === null) {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, String(value));
      }
    }
    return newSearchParams.toString();
  }, [searchParams]);

  // Handle push to the router with updated params
  useEffect(() => {
    if (searchParams) {
      const newQueryParams = {
        page: pageIndex + 1,
        limit: pageSize,
        [searchKey]: searchValue || null
      };
      router.push(`${pathname}?${createQueryString(newQueryParams)}`, { scroll: false });
    }
  }, [pageIndex, pageSize, searchValue, pathname, router, createQueryString, searchKey]);

  const table = useReactTable({
    data,
    columns,
    pageCount,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination: { pageIndex, pageSize }
    },
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    manualFiltering: true
  });

  const renderCellContent = (cell: CustomCellProps<TData, TValue>['cell']) => {
    const { id: columnId } = cell.column;
    // const cellValue = cell.value;

    if (columnId === 'kyc') {
      return (
        <div className="mx-auto w-[7rem] flex items-center justify-center px-2 py-1 rounded-full bg-[#f21300] text-white text-sm">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </div>
      );
    }

    if (columnId === 'profile-image' || columnId === 'manager') {
      return (
        <div className="flex items-center justify-center w-full h-full rounded-full">
          <Image
            src={profileImage}
            alt="Profile Image"
            width={35}
            height={35}
            className="rounded-full"
          />
        </div>
      );
    }

    if (columnId === 'action') {
      const uniqueId = cell.row.original.id;
      // console.log("UniqueId",uniqueId);
      return <ActionButton id={uniqueId}/>;
    }

    return flexRender(cell.column.columnDef.cell, cell.getContext());
  };

  return (
    <>
      <ScrollArea className="w-full h-[100vh] overflow-y-auto max-h-fit border border-gray-300 rounded-2xl shadow-lg shadow-gray-200 hide-scrollbar">
        <Table className="border rounded-2xl bg-white">
          <TableHeader className="bg-[#042559] text-white text-center">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-white text-center">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={`text-[#042559] font-medium text-center ${cell.column.id === 'firstName' ? 'text-[#f21300] hover:text-[#042559]' : ''}`}
                    >
                      {renderCellContent(cell)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="flex flex-col items-center justify-end gap-2 py-4 sm:flex-row">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => setPagination({ pageIndex, pageSize: Number(value) })}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={`${pageSize}`} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <p className="text-sm text-center py-2 mx-4">
          Page {pageIndex + 1} of {pageCount}
        </p>

        <div className="flex items-center space-x-2">
          <Button
            aria-label="Go to first page"
            variant="outline"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            aria-label="Go to previous page"
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            aria-label="Go to next page"
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            aria-label="Go to last page"
            variant="outline"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}
