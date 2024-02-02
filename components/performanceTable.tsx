import React from 'react';

const PerformanceTableComponent = () => {
  const rows = Array.from({ length: 20 }, () => ({
    col1: Math.floor(Math.random() * 1000000),
    col2: Math.floor(Math.random() * 10),
    col3: Math.floor(Math.random() * 10),
  }));

  return (
    <table className="min-w-full border-collapse border border-[#3E3E3E]">
      <thead>
        <tr className="">
          <th className="border border-[#3E3E3E] p-2">Round Number</th>
          <th className="border border-[#3E3E3E] p-2">Precomp duration</th>
          <th className="border border-[#3E3E3E] p-2">Realtime Duration</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index} className="">
            <td className="border border-[#3E3E3E] p-2 text-center text-[#FFFD54]">{row.col1}</td>
            <td className="border border-[#3E3E3E] p-2 text-center text-white">{row.col2}</td>
            <td className="border border-[#3E3E3E] p-2 text-center text-white">{row.col3}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PerformanceTableComponent;