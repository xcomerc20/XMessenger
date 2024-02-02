import React from 'react';

const TableComponent = () => {
  const rows = Array.from({ length: 20 }, () => ({
    col1: Math.floor(Math.random() * 1000000),
    col2: Math.floor(Math.random() * 1000000),
  }));

  return (
    <table className="min-w-full border-collapse border border-[#3E3E3E]">
      <thead>
        <tr className="">
          <th className="border border-[#3E3E3E] p-2">Round<br/>Number</th>
          <th className="border border-[#3E3E3E] p-2">Completion<br/>Time (UTC)</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index} className="">
            <td className="border border-[#3E3E3E] p-2 text-center text-[#FFFD54]">{row.col1}</td>
            <td className="border border-[#3E3E3E] p-2 text-center text-white">{row.col2}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;