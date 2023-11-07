/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

function Table({
  headerLabel,
  data,
}: {
  headerLabel: { title: string; key: string }[];
  data: Array<{ [key: string]: string }>;
}) {
  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg w-full'>
      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            {headerLabel.map((item, i) => (
              <th scope='col' className='px-6 py-3' key={i.toString()}>
                {item.title}
              </th>
            ))}
            <th scope='col' className='px-6 py-3 text-right'>
              Hành động
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) =>
            i !== data.length - 1 ? (
              <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                {headerLabel.map(({ key }: { key: string }, i) => (
                  <td className='px-6 py-4' key={i.toString()}>
                    {row[key]}
                  </td>
                ))}
                <td className='px-6 py-4'>
                  <a
                    href='#'
                    className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ) : (
              <tr className='bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600'>
                {headerLabel.map(({ key }, i) => (
                  <td className='px-6 py-4' key={i.toString()}>
                    {row[key]}
                  </td>
                ))}
                <td className='px-6 py-4 text-right'>
                  <a
                    href='#'
                    className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                  >
                    Edit
                  </a>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
