import React, { useState } from 'react';

const AdjustableTable: React.FC = () => {
  const [rows, setRows] = useState<number>(10);
  const [cols, setCols] = useState<number>(10);
  const [rowHeaders, setRowHeaders] = useState<string[]>(Array.from({ length: 10 }, (_, i) => `Row ${i + 1}`));
  const [colHeaders, setColHeaders] = useState<string[]>(Array.from({ length: 10 }, (_, i) => `201${i}`));
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

  const handleRowHeaderChange = (index: number, value: string) => {
    const newRowHeaders = [...rowHeaders];
    newRowHeaders[index] = value;
    setRowHeaders(newRowHeaders);
  };

  const handleColHeaderChange = (index: number, value: string) => {
    const newColHeaders = [...colHeaders];
    newColHeaders[index] = value;
    setColHeaders(newColHeaders);
  };

  const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
    const newData = tableData.map(row => [...row]);
    newData[rowIndex][colIndex] = value;
    setTableData(newData);
  };

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
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}></th>
            {colHeaders.slice(0, cols).map((header, index) => (
              <th key={index} style={{ border: '1px solid black', padding: '8px' }}>
                <input
                  type="text"
                  value={header}
                  onChange={(e) => handleColHeaderChange(index, e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box' }}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.slice(0, rows).map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                <input
                  type="text"
                  value={rowHeaders[rowIndex]}
                  onChange={(e) => handleRowHeaderChange(rowIndex, e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box' }}
                />
              </td>
              {row.slice(0, cols).map((cell, colIndex) => (
                <td key={colIndex} style={{ border: '1px solid black', padding: '8px' }}>
                  <input
                    type="text"
                    value={cell}
                    onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                    style={{ width: '100%', boxSizing: 'border-box' }}
                  />
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