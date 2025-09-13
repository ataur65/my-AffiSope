'use client';

import React from 'react';

const Table = ({ columns, data, actions }) => {
  return (
    <div className="bg-custom-surface rounded-lg mt-8 overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-700">
            {columns.map((column) => (
              <th key={column.accessor} className="p-4 font-semibold text-sm text-custom-text-secondary">
                {column.Header}
              </th>
            ))}
            {actions && actions.length > 0 && (
              <th className="p-4 font-semibold text-sm text-custom-text-secondary">Actions</th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {data.map((row, i) => (
            <tr key={i}>
              {columns.map((column) => (
                <td key={column.accessor} className="p-4 text-sm text-custom-text-primary">
                  {column.Cell ? column.Cell({ row, value: row[column.accessor] }) : row[column.accessor]}
                </td>
              ))}
              {actions && actions.length > 0 && (
                <td className="p-4 text-sm text-custom-text-primary flex space-x-2">
                  {actions.map((action, actionIndex) => (
                    <button
                      key={actionIndex}
                      onClick={() => action.onClick(row)}
                      className="text-blue-500 hover:underline"
                    >
                      {action.name}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;