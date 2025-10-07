import React from "react";

function TableList({ columns, data, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto shadow-md rounded-2xl border border-gray-200 bg-white">
      <table className="min-w-full text-sm text-gray-700">
        <thead className="bg-gray-100 text-gray-900 uppercase">
          <tr>
            {columns.map((col) => (
              <th key={col} className="px-6 py-3 text-left font-semibold">
                {col}
              </th>
            ))}
            <th className="px-6 py-3 text-left font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className={`border-t ${
                i % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-gray-100`}
            >
              {columns.map((col) => (
                <td key={col} className="px-6 py-3">
                  {row[col]}
                </td>
              ))}
              <td className="px-6 py-3 space-x-2">
                <button
                  onClick={() => onEdit(row)}
                  className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 rounded text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(row)}
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableList;
