'use client';
import React from 'react';
import {
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
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon
} from '@radix-ui/react-icons';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import Image from 'next/image'; // Assuming you're using Next.js Image component
import profileImage from '../../../../../public/assets/profile-image.png'
import ActionButton from './actions';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { ScrollBar } from '@/components/ui/scroll-area';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
  pageNo: number;
  totalUsers: number;
  pageSizeOptions?: number[];
  pageCount: number;
}

export function ClientTable<TData, TValue>({
  columns,
  data,
  pageNo,
  searchKey,
  totalUsers,
  pageCount,
  pageSizeOptions = [10, 20, 30, 40, 50]
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = React.useState(
    searchParams?.get(searchKey) ?? ''
  );

  const [{ pageIndex, pageSize }, setPagination] = React.useState<PaginationState>({
    pageIndex: pageNo - 1,
    pageSize: parseInt(searchParams?.get('limit') || '10')
  });

  // Sync pagination and search state with URL on the first load
  React.useEffect(() => {
    if (searchParams) {
      const pageFromParams = parseInt(searchParams.get('page') || `${pageNo}`);
      const limitFromParams = parseInt(searchParams.get('limit') || '10');
      const searchFromParams = searchParams.get(searchKey) || '';

      setPagination({
        pageIndex: pageFromParams - 1,
        pageSize: limitFromParams,
      });
      setSearchValue(searchFromParams);
    }
  }, [searchParams, pageNo, searchKey]);

  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams]
  );

  function renderCellContent(cell: any) {
    // Destructure column id and value for readability
    const { id: columnId } = cell.column;
    const cellValue = cell.value;

    if (columnId === 'kyc') {
      // Render KYC cell with specific styles
      return (
        <div className="mx-auto w-[7rem] flex items-center justify-center px-2 py-1 rounded-full bg-[#f21300] text-white text-sm">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </div>
      );
    }

    if (columnId === 'profile-image' || columnId === 'manager') {
      // Render profile image or manager image with rounded styling
      return (
        <div className="flex items-center justify-center w-full h-full rounded-full">
          <Image
            src={profileImage}
            alt="Profile Image"
            width={50}
            height={50}
            className="rounded-full"
          />
        </div>
      );
    }

    if (columnId === 'action') {
      return <ActionButton />
    }

    // Default rendering for other cell types
    return flexRender(cell.column.columnDef.cell, cell.getContext());
  }

  // Update URL when pageIndex, pageSize, or searchValue changes
  React.useEffect(() => {
    router.push(
      `${pathname}?${createQueryString({
        page: pageIndex + 1,
        limit: pageSize,
        [searchKey]: searchValue || null
      })}`,
      { scroll: false }
    );
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

  React.useEffect(() => {
    router.push(
      `${pathname}?${createQueryString({
        page: pageIndex + 1,
        limit: pageSize,
        [searchKey]: searchValue || null
      })}`,
      { scroll: false }
    );
  }, [pageIndex, pageSize, searchValue, pathname, router, createQueryString, searchKey]);

  return (
    <>
      <Input
        placeholder={'Search name...'}
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        className="w-full md:max-w-sm ml-auto bg-white"
      />
      <ScrollArea className='w-full overflow-y-auto max-h-[24rem] border border-gray-300 rounded-2xl shadow-lg shadow-gray-200 hide-scrollbar'>
        <Table className='border rounded-2xl bg-white'>
          <TableHeader className='bg-[#042559] text-white text-center'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className='text-white text-center'>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
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
                      className={`text-[#042559] font-medium text-center ${cell.column.id === `name` ?`text-[#f21300] hover:text-[#042559]` : ``}`}
                    >
                      {
                        renderCellContent(cell)
                      }
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
        <ScrollBar orientation='horizontal' />
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
