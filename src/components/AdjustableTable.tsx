import React, { useState } from 'react';
import { findInterest, findInterestForTable } from '../functions/helper';

interface adjustableTableProps {
  yearNumber: number
  amount: string
}

const AdjustableTable = (props:adjustableTableProps) => {
  console.log("year number -->", props.yearNumber)
  const [rows, setRows] = useState<number>(10);
  const [cols, setCols] = useState<number>(10);
  const [rowHeaders, setRowHeaders] = useState<string[]>(Array.from({ length: 10 }, (_, i) => `${i + 1}`));
  const [colHeaders, setColHeaders] = useState<string[]>(Array.from({ length: 10 }, (_, i) => `${props.yearNumber + i}`));

  const [tableData, setTableData] = useState<string[][]>(Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => '')));

  const handleRowsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRows = parseInt(e.target.value, 10);
    setRows(newRows);
    setRowHeaders(Array.from({ length: newRows }, (_, i) => rowHeaders[i] || `Row ${i + 1}`));
    setTableData(Array.from({ length: newRows }, (_, i) => tableData[i] || Array.from({ length: cols }, () => '')));
  };

  const handleColsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCols = parseInt(e.target.value, 10);
    setCols(newCols);
    setColHeaders(Array.from({ length: newCols }, (_, i) => colHeaders[i] || `201${i}`));
    setTableData(tableData.map(row => row.slice(0, newCols).concat(Array.from({ length: Math.max(0, newCols - row.length) }, () => ''))));
  };

  React.useEffect(() => {
    const newTableData = rowHeaders.map((_, rowIndex) =>
      colHeaders.map((_, colIndex) => findInterestForTable(props.amount, colIndex.toString(), rowIndex.toString()).toString())
    );
  
    setTableData(newTableData);
  }, [props.amount, props.yearNumber]);

  console.log("---->",tableData)

  return (
    <div>
      <div>
        <label>
          Rows:
          <input type="number" value={rows} onChange={handleRowsChange} min="1" />
        </label>
        <label>
          Columns:
          <input type="number" value={cols} onChange={handleColsChange} min="1" />
        </label>
      </div>
      <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}></th>
            {colHeaders.slice(0, cols).map((header, index) => (
              <th key={index} style={{ border: '1px solid black', padding: '8px' }}>
                <p>{header}</p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.slice(0, rows).map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                <p>{rowIndex + 1}</p>
              </td>
              {row.slice(0, cols).map((cell, colIndex) => (
                <td key={colIndex} style={{ border: '1px solid black', padding: '8px' }}>
                  <p>{Number(cell).toFixed(2)}</p>
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