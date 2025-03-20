import React from 'react'
import { useState } from 'react';
import StorePerformanceHeader from '../components/StorePerformanceHeader'
import StorePerformanceGrid from '../components/StorePerformanceGrid';

const StorePerformance = () => {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedQuarter, setSelectedQuarter] = useState("fullYear");
  const [selectedStore, setSelectedStore] = useState(1);
  
  return (
    <div>
      <StorePerformanceHeader
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedQuarter={selectedQuarter}
        setSelectedQuarter={setSelectedQuarter}
        selectedStore={selectedStore}
        setSelectedStore={setSelectedStore}
      />
      <StorePerformanceGrid
        selectedYear={selectedYear}
        selectedQuarter={selectedQuarter}
        selectedStore = {selectedStore}
      />
    </div>
  );
}

export default StorePerformance