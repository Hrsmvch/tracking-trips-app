import React from "react";
import styles from "./styles.module.scss";

interface Props {
  totalTrips: number;
  data: {
    [key: string]: number
  };
}

const TripsByStatusPerYearChart: React.FC<Props> = ({ data, totalTrips }) => { 
  const { delivered, canceled, pending } = data; 

  return (
    <div className={styles.chart}>
      <div className={styles.chart_header}>
        <h2 className={styles.chart_title}>By status </h2>
      </div>
      <div className={styles.chart_statuses_data}>

       <div className={styles.chart_item}>
        <div className={styles.chart_item_heading}>
          <span>Delivered</span> 
          <span>{delivered} / {totalTrips}</span> 
        </div>
        <div className={styles.chart_item_progress}>
          <span style={{width: `${(delivered / totalTrips) * 100}%`}}></span>
        </div>
       </div>

       <div className={styles.chart_item}>
        <div className={styles.chart_item_heading}>
          <span>Canceled</span> 
          <span>{canceled} / {totalTrips}</span> 
        </div>
        <div className={styles.chart_item_progress}>
          <span style={{width: `${(canceled / totalTrips) * 100}%`}}></span>
        </div>
       </div>

       <div className={styles.chart_item}>
        <div className={styles.chart_item_heading}>
          <span>Pending</span> 
          <span>{pending} / {totalTrips}</span> 
        </div>
        <div className={styles.chart_item_progress}>
          <span style={{width: `${(pending / totalTrips) * 100}%`}}></span>
        </div>
       </div> 

      </div>
    </div>
  );
};

export default TripsByStatusPerYearChart;
