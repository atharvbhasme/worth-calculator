import React from 'react';
import { findInterestForTable, findPastValueForTable } from '../functions/helper';

interface AdjustableTableProps {
  baseYear: number;
  amount: string;
  rows: number;
  cols: number;
  isFutureTable: boolean;
}

const AdjustableTable: React.FC<AdjustableTableProps> = ({
  baseYear,
  amount,
  rows,
  cols,
  isFutureTable,
}) => {
  // Generate year headers
  const yearHeaders = React.useMemo(() => {
    return Array.from({ length: rows }, (_, i) => 
      isFutureTable ? baseYear + i + 1 : baseYear - i - 1
    ).map(year => year.toString());
  }, [baseYear, rows, isFutureTable]);

  // Generate interest rate headers
  const interestHeaders = React.useMemo(() => {
    return Array.from({ length: cols }, (_, i) => (i + 1).toString());
  }, [cols]);

  // Calculate table data with validation
  const tableData = React.useMemo(() => {
    const numericAmount = parseFloat(amount) || 0;
    
    return yearHeaders.map((_, rowIndex) =>
      interestHeaders.map((rate, colIndex) => {
        try {
          const years = rowIndex + 1;
          const numericRate = parseFloat(rate) || 0;
          
          if (isFutureTable) {
            const value = findInterestForTable(
              numericAmount.toString(),
              numericRate.toString(),
              years.toString()
            );
            return Number(value).toFixed(2);
          } else {
            const value = findPastValueForTable(
              numericAmount.toString(),
              numericRate.toString(),
              years.toString()
            );
            return Number(value).toFixed(2);
          }
        } catch (error) {
          console.error('Calculation error:', error);
          return '0.00';
        }
      })
    );
  }, [amount, yearHeaders, interestHeaders, isFutureTable]);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse mt-5">
        <thead>
          <tr>
            <th className="border p-2 sticky left-0 bg-white">Year</th>
            {interestHeaders.map((header, index) => (
              <th key={index} className="border p-2 min-w-[80px]">
                {header}%
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="border p-2 sticky left-0 bg-white font-medium">
                {yearHeaders[rowIndex]}
              </td>
              {row.map((cell, colIndex) => (
                <td key={colIndex} className="border p-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdjustableTable;