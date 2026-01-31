"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { 
  ssr: false,
  loading: () => <div style={{ height: 450, backgroundColor: 'transparent' }} /> 
});

const PerformanceRadar = () => {
  const series = [
    {
      name: 'Team Metrics',
      data: [80, 90, 70, 85, 75],
    },
  ];

  const options: ApexOptions = {
    chart: {
      toolbar: { show: false },
      background: 'transparent',
    },
    colors: ['#469F885C'],
    // 1. Ensure markers (dots) are hidden
    markers: {
      size: 0,
      strokeWidth: 0,
    },
    // 2. Main data line style
    stroke: {
      show: true,
      width: 3,
      colors: ['#33AD8C'],
      curve: 'smooth', // Optional: use 'straight' for the exact hex look
    },
    fill: {
      opacity: 0.3,
    },
    xaxis: {
      categories: [
        'Comm',
        'Strat Align',
        'Team Coh',
        'Incident',
        'Docs',
      ],
      labels: {
            rotate: 0, // normal on large screens

        style: {
          colors: '#9ca3af',
          fontSize: '14px',
          fontFamily: 'inherit',
        },
      },
    },
    yaxis: {
      show: false,
      min: 0,
      max: 100,
    },
    plotOptions: {
      radar: {
        size: 120,
        polygons: {
          strokeColors: '#2d3748', 
          strokeWidth: '1',
          connectorColors: '#2d3748',
          fill: {
            colors: ['transparent', 'transparent'],
          },
        },
      },
    },
 
    legend: { show: false },
    tooltip: { theme: 'dark' },
  };

  return (
    <div className='mt-[20px]' >
      <Chart
        options={options}
        series={series}
        type="radar"
        height={300}
      />
    </div>
  );
};

export default PerformanceRadar;