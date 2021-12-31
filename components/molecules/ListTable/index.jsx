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
      {/* <Box textAlign='center'>
        <chakra.span mr={2}>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </chakra.span>
        <IconButton
          colorScheme='gray'
          aria-label='edit-button'
          size='md'
          icon={<MdNavigateBefore />}
          mr={2}
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        />
        <IconButton
          colorScheme='gray'
          aria-label='edit-button'
          size='md'
          icon={<MdNavigateNext />}
          mr={2}
          onClick={() => nextPage()}
          disabled={!canNextPage}
        />
      </Box> */}
    </>
  );
};

export default ListTable;
