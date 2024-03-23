import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

import styles from "./styles.module.scss";

interface MilesPerMonthData {
  totalPerMonths: {
    month: string;
    milesPerMonth: number;
  };
}

interface Props {
  data: {
    total: number;
    totalPerMonths: MilesPerMonthData[];
  };
}

const MilesPerYearChart: React.FC<Props> = ({ data }) => {
  const { total, totalPerMonths } = data;

  return (
    <div className={styles.chart}>
      <div className={styles.chart_header}>
        <h2 className={styles.chart_title}>Trip Statistics </h2>
        <div className={styles.chart_total}>Total: {total?.toLocaleString() || 0} miles</div>
      </div>
      <div className={styles.chart_data}>
        {JSON.stringify(totalPerMonths)}
        {/* <Bar data={chartData} options={options} /> */}
      </div>
    </div>
  );
};

export default MilesPerYearChart;
