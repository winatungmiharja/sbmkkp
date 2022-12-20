/* eslint-disable @typescript-eslint/ban-types */
import debounce from 'lodash/debounce';
import * as React from 'react';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import { HiChevronLeft, HiChevronRight, HiSearch } from 'react-icons/hi';
import {
  Column,
  PluginHook,
  TableOptions,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table';

import clsxm from '@/lib/clsxm';

import Button from '@/components/buttons/Button';

type Props<T extends object> = {
  data: T[];
  columns: Column<T>[];
  options?: Omit<TableOptions<T>, 'data' | 'columns'>;
  plugins?: PluginHook<T>[];
  className?: string;
  withFooter?: boolean;
  entries?: number[];
  isLoading?: boolean;
};

export default function ReactTable<T extends object>({
  data,
  columns,
  options,
  plugins = [],
  className,
  withFooter = false,
  entries = [5, 10, 20],
  isLoading,
}: Props<T>) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    setGlobalFilter,
    footerGroups,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable<T>(
    { ...options, data, columns },
    useGlobalFilter,
    useSortBy,
    usePagination,
    ...plugins
  );

  //#region  //*=========== Global Filter ===========
  const [value, setValue] = React.useState(state.globalFilter);
  const onChange = debounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);
  //#endregion  //*======== Global Filter ===========

  return (
    <div className={clsxm('flex flex-col w-full', className)}>
      <div className='flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center'>
        {/* Filter */}
        <div>
          <label className='text-gray-500 sr-only'>Filter</label>
          <div className='relative'>
            <input
              placeholder='Find...'
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                onChange(e.target.value);
              }}
              className={clsxm(
                'w-full rounded-md sm:max-w-xs',
                'px-4 py-2 pl-9',
                'text-sm placeholder-gray-400 md:text-base',
                'border border-gray-300 focus:border-primary-500 focus:ring-primary-500'
              )}
            />
            <div className='flex absolute inset-y-0 left-0 items-center pl-2 pointer-events-none'>
              <HiSearch className='text-xl text-gray-400' />
            </div>
          </div>
        </div>
        {/* Select entries */}
        <div className='flex gap-2 items-center'>
          <p className='flex-shrink-0 text-sm text-gray-400'>
            entries per page
          </p>
          <select
            className={clsxm(
              'border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500',
              'block w-full text-sm text-gray-500 rounded-md shadow-sm sm:max-w-xs'
            )}
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {entries.map((page) => (
              <option key={page} value={page}>
                {page}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='overflow-x-auto -my-2 mt-2'>
        <div className='inline-block py-2 min-w-full align-middle'>
          <div className='overflow-hidden border-b border-gray-200 shadow-sm sm:rounded-lg'>
            <table
              {...getTableProps()}
              className='min-w-full divide-y divide-gray-200'
            >
              <thead className='bg-gray-50'>
                {headerGroups.map((headerGroup, index) => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        key={column.id}
                        scope='col'
                        className='group px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
                      >
                        <div className='flex relative gap-4 items-center py-1'>
                          <p>{column.render('Header')}</p>
                          <span className='flex flex-col justify-center items-center'>
                            <GoTriangleUp
                              className={clsxm(
                                'transition-opacity',
                                column.isSorted
                                  ? column.isSortedDesc
                                    ? // sorted desc
                                      'text-gray-400'
                                    : // sorted asc
                                      'text-gray-700'
                                  : // not sorted
                                  column.disableSortBy
                                  ? 'text-transparent'
                                  : 'group-hover:text-gray-400 text-transparent'
                              )}
                            />
                            <GoTriangleDown
                              className={clsxm(
                                '-mt-1 transition-opacity',
                                column.isSorted
                                  ? column.isSortedDesc
                                    ? // sorted desc
                                      'text-gray-700'
                                    : // sorted asc
                                      'text-gray-400'
                                  : // not sorted
                                  column.disableSortBy
                                  ? 'text-transparent'
                                  : 'group-hover:text-gray-400 text-transparent'
                              )}
                            />
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.length > 0 ? (
                  page.map((row, index) => {
                    prepareRow(row);
                    return (
                      <tr
                        {...row.getRowProps()}
                        key={index}
                        className={clsxm(
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        )}
                      >
                        {row?.cells?.map((cell, i) => (
                          <td
                            {...cell.getCellProps()}
                            className={clsxm(
                              'px-6 py-4 text-sm text-gray-700 whitespace-nowrap',
                              cell.column.className
                            )}
                            key={i}
                          >
                            {cell.render('Cell')}
                          </td>
                        ))}
                      </tr>
                    );
                  })
                ) : (
                  // Fallback
                  <tr className={clsxm('bg-gray-100')}>
                    <td
                      colSpan={columns.length}
                      className='px-6 py-4 text-sm text-center text-gray-700 whitespace-nowrap'
                    >
                      Tidak ada data
                    </td>
                  </tr>
                )}

                {/* Skeleton */}
                {isLoading &&
                  [...Array(pageSize)].map((_, i) => (
                    <tr
                      key={i}
                      className={clsxm(
                        'animate-pulse',
                        i % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
                      )}
                    >
                      <td
                        colSpan={columns.length}
                        className='px-6 py-4 text-sm text-gray-700 whitespace-nowrap'
                      >
                        <span className='invisible'>loading...</span>
                      </td>
                    </tr>
                  ))}
              </tbody>
              {withFooter && (
                <tfoot className='bg-gray-50'>
                  {footerGroups.map((footerGroup, index) => (
                    <tr
                      {...footerGroup.getFooterGroupProps()}
                      key={index}
                      className='group px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
                    >
                      {footerGroup.headers.map((column) => (
                        <td
                          {...column.getFooterProps()}
                          className={clsxm(
                            'px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase'
                          )}
                          key={column.id}
                        >
                          {column.render('Footer')}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tfoot>
              )}
            </table>
          </div>
        </div>
      </div>

      {/* Table Pagination Section */}
      <div className='flex justify-between items-center mt-4'>
        <p className='text-sm text-gray-400'>
          {`Showing ${pageIndex * pageSize + 1} to ${(pageIndex + 1) * pageSize}
          from ${data.length} entries`}
        </p>
        <div className='flex gap-1'>
          <Button
            className='!p-2'
            variant='light'
            disabled={!canPreviousPage}
            onClick={() => previousPage()}
          >
            <HiChevronLeft size={20} />
          </Button>
          <Button
            className='!p-2'
            variant='light'
            disabled={!canNextPage}
            onClick={() => nextPage()}
          >
            <HiChevronRight size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
