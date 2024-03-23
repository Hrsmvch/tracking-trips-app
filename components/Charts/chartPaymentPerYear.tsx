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

  return (
    <div className={styles.chart}>
      <div className={styles.chart_header}>
        <h2 className={styles.chart_title}>Payment Outlook</h2>
        <div className={styles.chart_total}>Total: ${total?.toLocaleString() || 0}</div>
      </div>
      <div className={styles.chart_data}>
        {JSON.stringify(totalPerMonths)}
        {/* <Bar data={chartData} options={options} /> */}
      </div>
    </div>
  );
};

export default PaymentPerYearChart;
