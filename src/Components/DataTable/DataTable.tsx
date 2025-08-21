import React, { useState } from "react";
import { Loader2 } from "lucide-react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  multiple?: boolean; 
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  multiple = true,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: "asc" | "desc";
  } | null>(null);

  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(
    new Set()
  );

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const handleRowSelect = (row: T) => {
    const newSelection = new Set(selectedRows);

    if (multiple) {
      if (newSelection.has(row.id)) {
        newSelection.delete(row.id);
      } else {
        newSelection.add(row.id);
      }
    } else {
      newSelection.clear();
      newSelection.add(row.id);
    }

    setSelectedRows(newSelection);
    onRowSelect?.(data.filter((d) => newSelection.has(d.id)));
  };

  const handleSort = (col: Column<T>) => {
    if (!col.sortable) return;

    setSortConfig((prev) => {
      if (prev?.key === col.dataIndex) {
        return {
          key: col.dataIndex,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key: col.dataIndex, direction: "asc" };
    });
  };

  return (
    <div className="border rounded-lg overflow-hidden w-full">
      <table className="w-full text-left border-collapse bg-gray-50">
        <thead className="bg-gray-300 dark:bg-gray-700">
          <tr>
            {selectable && <th className="p-3 w-10"></th>}
            {columns.map((col) => (
              <th
                key={col.key}
                className={`p-3 font-semibold cursor-${
                  col.sortable ? "pointer" : "default"
                }`}
                onClick={() => handleSort(col)}
              >
                {col.title}
                {col.sortable &&
                  sortConfig?.key === col.dataIndex &&
                  (sortConfig.direction === "asc" ? " ↑" : " ↓")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Loading state */}
          {loading ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="p-6 text-center"
              >
                <Loader2 className="inline animate-spin text-gray-600" size={20} />
                <span className="ml-2">Loading...</span>
              </td>
            </tr>
          ) : sortedData.length === 0 ? (
            // Empty state
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="p-6 text-center text-gray-600"
              >
                No data available
              </td>
            </tr>
          ) : (
            sortedData.map((row) => (
              <tr
                key={row.id}
                className={`hover:bg-gray-100 dark:hover:bg-gray-500 ${
                  selectedRows.has(row.id) ? "bg-blue-50 dark:bg-blue-900" : ""
                }`}
              >
                {selectable && (
                  <td className="p-3">
                    <input
                      type={multiple ? "checkbox" : "radio"}
                      checked={selectedRows.has(row.id)}
                      onChange={() => handleRowSelect(row)}
                      className="cursor-pointer"
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} className="p-3 border-t dark:border-gray-700">
                    {String(row[col.dataIndex])}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
