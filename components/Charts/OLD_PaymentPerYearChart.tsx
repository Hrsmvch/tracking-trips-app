import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

import styles from "./styles.module.scss";
import getPaymentDataForYear from "@/utils/getPaymentDataForYear";

interface MilesPerMonthData {
  month: string;
  sumPerMonth: number;
}

interface PaymentPerYearChartProps {
  data: MilesPerMonthData[];
}

const PaymentPerYearChart: React.FC<PaymentPerYearChartProps> = ({ data }) => {
  let totalSum = data.reduce((total, entry) => total + entry.sumPerMonth, 0);

  const fff = getPaymentDataForYear('something')

  const chartData = {
    labels: data.map((entry) => entry.month),
    datasets: [
      {
        label: "Sum",
        data: data.map((entry) => entry.sumPerMonth),
        backgroundColor: (context: any) => {
          const values = context.dataset.data;
          const maxValue = Math.max(...values);
          const value = values[context.dataIndex];
          
          if (value <= maxValue / 3) {
            return '#FFD9A5'; 
          } else if (value <= (maxValue / 3) * 2) {
            return '#9DCAF4'; 
          } else {
            return '#B4D4B8';
          }
        },
        borderRadius: 8,
        borderWidth: 0, 
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false, 
        },
        
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false, 
        },
        ticks: {
          callback: function(value: any) {
            return '$' + value;
          }
        }
      }
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
        <h2 className={styles.chart_title}>Payment Outlook</h2>
        <div className={styles.chart_total}>Total: {totalSum || 0}</div>
      </div>
      <div className={styles.chart_data}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};
 
