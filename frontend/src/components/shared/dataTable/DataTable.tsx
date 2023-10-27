import React, { forwardRef, useMemo, useEffect, useState, useImperativeHandle, useRef } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender, Header
} from "@tanstack/react-table";
import Table from "@/components/ui/table";
import Alert from "@/components/ui/alert";
import Loading from "@/components/shared/loading";
import Pagination from "@/components/ui/pagination";
import Checkbox from "@/components/ui/checkbox";
import { FaGear } from "react-icons/fa6";

const { Tr, Th, Td, THead, TBody, Sorter } = Table;

const IndeterminateCheckbox = ((props: any) => {

  const { indeterminate, onChange, onCheckBoxChange, onIndeterminateCheckBoxChange, ...rest } = props;

  const ref = useRef<any>(null);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, indeterminate]);

  const handleChange = (e: any) => {
    onChange(e);
    onCheckBoxChange?.(e);
    onIndeterminateCheckBoxChange?.(e);
  };

  return <Checkbox className="mt-1" ref={ref} onChange={(_: any, e: any) => handleChange(e)} {...rest} />;
});

const DataTable = forwardRef((props: any, ref) => {
  const {
    className = "",
    columns: columnsProp = [],
    data = [],
    loading = false,
    pageSizes = [5, 10, 25, 50, 100],
    pagingData = {
      total: 0,
      pageIndex: 1,
      pageSize: 10
    },
    selectable,
    selectableAll = true,
    onCheckBoxChange,
    onIndeterminateCheckBoxChange,
    onPaginationChange,
    onSelectChange,
    onSort,
    onRowClick
  } = props;
  const { pageSize, pageIndex, total } = pagingData;

  const [sorting, setSorting] = useState<any>(null);

  const handleCheckBoxChange = (checked: any, row: any) => {
    if (!loading) {
      onCheckBoxChange?.(checked, row);
    }
  };

  const handleIndeterminateCheckBoxChange = (checked: any, rows: any) => {
    if (!loading) {
      onIndeterminateCheckBoxChange?.(checked, rows);
    }
  };

  const handlePaginationChange = (page: any) => {
    if (!loading) {
      onPaginationChange?.(page);
    }
  };

  const handleSelectChange = (value: any) => {
    if (!loading) {
      onSelectChange?.(Number(value));
    }
  };

  useEffect(() => {
    if (Array.isArray(sorting)) {
      const sortOrder = sorting.length > 0 ? sorting[0].desc ? "desc" : "asc" : "";
      const id = sorting.length > 0 ? sorting[0].id : "";
      onSort?.({ order: sortOrder, key: id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting]);

  const hasOldColumnMetaKey = columnsProp.some((col: any) => col.Header || col.accessor || col.Cell);

  const finalColumns = useMemo(() => {

    const columns = columnsProp;

    if (selectable) {
      return [
        {
          id: "select",
          className: "w-[1%]",
          header: ({ table }: any) => selectableAll && (
            <IndeterminateCheckbox
              checked={table.getIsAllRowsSelected()}
              indeterminate={table.getIsSomeRowsSelected()}
              onChange={table.getToggleAllRowsSelectedHandler()}
              onIndeterminateCheckBoxChange={(e: any) => {
                handleIndeterminateCheckBoxChange(
                  e.target.checked,
                  table.getRowModel().rows
                );
              }}
            />
          ),
          cell: ({ row }: any) => {
            return (
              <IndeterminateCheckbox
                checked={row.getIsSelected()}
                disabled={!row.getCanSelect()}
                indeterminate={row.getIsSomeSelected()}
                onChange={row.getToggleSelectedHandler()}
                onCheckBoxChange={(e: any) =>
                  handleCheckBoxChange(
                    e.target.checked,
                    row.original
                  )
                }
              />
            );
          }
        },
        ...columns
      ];
    }
    return columns;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnsProp, selectable]);

  const table = useReactTable({
    data,
    columns: hasOldColumnMetaKey ? [] : finalColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    manualSorting: true,
    onSortingChange: setSorting,
    state: {
      sorting
    }
  });

  const resetSorting = () => {
    table.resetSorting();
  };

  const resetSelected = () => {
    table.toggleAllRowsSelected(false);
  };

  useImperativeHandle(ref, () => ({
    resetSorting,
    resetSelected
  }));

  if (hasOldColumnMetaKey) {

    const message = "You are using old react-table v7 column config, please use v8 column config instead, refer to our demo or https://tanstack.com/table/v8";

    if (process.env.NODE_ENV === "development") {
      console.warn(message);
    }

    return (
      <Alert>{message}</Alert>
    );
  }

  return (
    <Loading loading={loading} type="cover">
      <Table className={className}>
        <THead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header: any) => {
                return (
                  <Th
                    key={header.id}
                    colSpan={header.colSpan}
                    className={header.column?.columnDef?.className}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={`${header.column.getCanSort() && "cursor-pointer select-none point flex items-center gap-1"} ${loading && "pointer-events-none"}`}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef
                            .header,
                          header.getContext()
                        )}
                        {header.column.getCanSort() && <Sorter sort={header.column.getIsSorted()} />}
                      </div>
                    )}
                  </Th>
                );
              })}
            </Tr>
          ))}
        </THead>
        <TBody>
          {loading && data.length === 0 ? (
            <Tr><Td className="p-6"></Td></Tr>
          ) : (
            table
              .getRowModel()
              .rows.slice(0, pageSize)
              .map((row, index) => {
                return (
                  <Tr key={row.id} onClick={() => onRowClick ? onRowClick(row) : ""}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <Td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })
          )}
        </TBody>
      </Table>
      {onPaginationChange && (
        <div className="flex items-center justify-between mt-4 text-gray-500">
          <div className="flex items-center justify-between gap-3 text-sm">
            <FaGear /> Table Settings
          </div>
          <div className="flex items-center justify-between gap-4">
            {onSelectChange && (
              <div className="min-w-[130px] flex items-center justify-between gap-2">
                <span className="text-sm">Row per pages</span>
                <select
                  className="border-0 bg-gray-100 py-1 pl-3 pr-5 text-xs font-semibold text-gray-600"
                  value={pageSize}
                  onChange={(e: any) => handleSelectChange(e.currentTarget.value)}
                >
                  {pageSizes.map((value: any) => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
              </div>
            )}
            <Pagination
              pageSize={pageSize}
              currentPage={pageIndex}
              total={total}
              onChange={handlePaginationChange}
            />
          </div>
        </div>
      )}
    </Loading>
  );
});

export default DataTable;
