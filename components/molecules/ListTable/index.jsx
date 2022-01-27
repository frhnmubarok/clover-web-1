import { useTable, useSortBy, usePagination } from 'react-table';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';

const ListTable = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    prepareRow,
  } = useTable({ columns, data }, useSortBy, usePagination);
  const { pageIndex } = state;
  return (
    <>
      <div className='flex flex-col mt-6 font-lato'>
        <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
            <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
              <table {...getTableProps()} className='min-w-full divide-y divide-gray-200 '>
                <thead className='bg-gray-50'>
                  {headerGroups.map((headerGroup, index) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                      {headerGroup.headers.map((column, index) => (
                        <th
                          {...column.getHeaderProps(column.getSortByToggleProps())}
                          isNumeric={column.isNumeric}
                          key={index}
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          {column.render('Header')}
                          <span style={{ paddingLeft: 4 }}>
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <GoTriangleDown aria-label='sorted descending' />
                              ) : (
                                <GoTriangleUp aria-label='sorted ascending' />
                              )
                            ) : null}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()} className='bg-white divide-y divide-gray-200'>
                  {page.map((row, index) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()} key={index}>
                        {row.cells.map((cell, index) => (
                          <td
                            {...cell.getCellProps()}
                            isNumeric={cell.column.isNumeric}
                            key={index}
                            className='px-6 py-4 whitespace-nowrap'>
                            {cell.render('Cell')}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-center items-center mt-4'>
        <span className='mr-2'>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        {/* <IconButton
          colorScheme='gray'
          aria-label='edit-button'
          size='md'
          icon={<MdNavigateBefore />}
          mr={2}
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        /> */}
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className='flex justify-center mr-2 items-center w-8 h-8 text-center py-2 text-sm font-semibold text-white duration-200 ease-in-out rounded-lg bg-primary-500 hover:bg-primary-600 hover:ring-2 hover:ring-sky-500 hover:ring-offset-2 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-75'>
          <MdNavigateBefore />
        </button>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className='flex justify-center items-center w-8 h-8 text-center py-2 text-sm font-semibold text-white duration-200 ease-in-out rounded-lg bg-primary-500 hover:bg-primary-600 hover:ring-2 hover:ring-sky-500 hover:ring-offset-2 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-75'>
          <MdNavigateNext />
        </button>
        {/* <IconButton
          colorScheme='gray'
          aria-label='edit-button'
          size='md'
          icon={<MdNavigateNext />}
          mr={2}
          onClick={() => nextPage()}
          disabled={!canNextPage}
        /> */}
      </div>
    </>
  );
};

export default ListTable;
