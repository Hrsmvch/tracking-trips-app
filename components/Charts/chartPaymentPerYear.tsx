import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

import styles from "./styles.module.scss";

interface PaymentPerMonthData {
  totalPerMonths: {
    month: string;
    paymentPerMonth: number;
  };
}

interface Props {
  data: {
    total: number;
    totalPerMonths: PaymentPerMonthData[];
  };
}

const PaymentPerYearChart: React.FC<Props> = ({ data }) => {
  const { total, totalPerMonths } = data;

  const chartData = {
    labels: totalPerMonths.map((entry: any) => entry.month),
    datasets: [
      {
        label: "Sum",
        data: totalPerMonths.map((entry: any) => entry.paymentPerMonth),
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
    // responsive: true,
    // maintainAspectRatio: false,
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
        <div className={styles.chart_total}>Total: ${total?.toLocaleString() || 0}</div>
      </div>
      <div className={styles.chart_data}>
        {/* {JSON.stringify(totalPerMonths)} */}
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PaymentPerYearChart;
