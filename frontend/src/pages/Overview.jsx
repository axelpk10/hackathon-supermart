import { useState } from "react";
import OverviewMetrics from "../components/OverviewMetrics";
import OverviewGrid from "../components/OverviewGrid";

const Overview = () => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedQuarter, setSelectedQuarter] = useState("fullYear");

  return (
    <>
      <OverviewMetrics
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedQuarter={selectedQuarter}
        setSelectedQuarter={setSelectedQuarter}
      />
      <OverviewGrid
        selectedYear={selectedYear}
        selectedQuarter={selectedQuarter}
      />
    </>
  );
};

export default Overview;
