import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import styles from "./styles.module.scss";

Chart.register(...registerables);

interface MilesPerMonthData {
  month: string;
  milesPerMonth: number;
}

interface Props {
  data: {
    total: number;
    totalPerMonths: MilesPerMonthData[];
  };
}

const MilesPerYearChart: React.FC<Props> = ({ data }) => {
  const { total, totalPerMonths } = data;

  const chartData: any = {
    labels: totalPerMonths.map((entry: MilesPerMonthData) => entry.month),
    datasets: [
      {
        label: "Miles",
        data: totalPerMonths.map((entry: MilesPerMonthData) => entry.milesPerMonth),
        fill: false, 
        borderColor: '#023E8A', 
        tension: 0.5,  
        pointStyle: false,
      }, 
    ],
   
  };

  const options = {
    // responsive: true,
    // maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        }, 
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false, 
        }, 
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      
    },
  };

  return (
    <div className={styles.chart}>
      <div className={styles.chart_header}>
        <h2 className={styles.chart_title}>Trip Statistics </h2>
        <div className={styles.chart_total}>Total: {total?.toLocaleString() || 0} miles</div>
      </div>
      <div className={styles.chart_data}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default MilesPerYearChart;
