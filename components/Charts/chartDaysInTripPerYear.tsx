"use client";
import React, { useEffect, useRef } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

import styles from "./styles.module.scss";

interface Props {
  data: number;
}

const DaysInTripPerYearChart: React.FC<Props> = ({ data }) => {
  const daysInYear = calculateDaysInYear(2024);

  const chartData = {
    datasets: [
      {
        data: [data, daysInYear - data],
        backgroundColor: ["#B4D4B8", "#dcdfdc"],  
        hoverBackgroundColor:["#B4D4B8", "#dcdfdc"], 
        display: true,
      },
    ],
  };

  function calculateDaysInYear(year: number) {
    return (year % 4 === 0 && year % 100 > 0) || year % 400 == 0 ? 366 : 365;
  }

  return (
    <div className={styles.chart}>
      <div className={styles.chart_header}>
        <h2 className={styles.chart_title}>By days</h2>
      </div>
      <div className={styles.chart_data}> 
        <Doughnut
          data={chartData}
          options={{
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                enabled: false,
              },
            },
            rotation: -150,
            circumference: 300,
            // @ts-ignore
            borderRadius: 50,
            cutout: "75%",
            // maintainAspectRatio: true,
            // responsive: true,
          }}
        />
        <div className={styles.moon_tooltip}>
          <div className={styles.moon_header}>Days / year</div>
          <div className={styles.moon_number}>{data} days</div>
        </div>
      </div>
    </div>
  );
};

export default DaysInTripPerYearChart;
