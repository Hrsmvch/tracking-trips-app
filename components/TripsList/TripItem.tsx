import { Trip } from "@/types/trips";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import ArrowIcon from "@/public/arrow.svg";
import UnpaidIcon from "@/public/unpaid.svg";
import EditIcon from "@/public/edit.svg";
import DeleteIcon from "@/public/delete.svg";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { userTripContext } from "@/context/TripContext";
import { formatDateRange } from "@/utils/formatDateRange";
import { calculateDuration } from "@/utils/calculateDuration";
import statuses from "@/data/statuses";

interface TripItemProps {
  data: Trip;
}

const EditAction = ({ item }: { item: Trip }) => {
  const { trip, setTrip, resetTrip, setMobileForm } = userTripContext();

  const handleEdit = async () => {
    setTrip(item);
    setMobileForm(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button className={styles.edit} onClick={handleEdit}>
      <EditIcon />
    </button>
  );
};

const DeleteAction = ({ id }: { id: string | undefined }) => {
  const handleDelete = async () => {
    if (!id) return;

    const docRef = doc(db, "trips", id);
    await deleteDoc(docRef);
  };
  return (
    <button className={styles.edit} onClick={handleDelete}>
      <DeleteIcon />
    </button>
  );
};

export default function TripItem({ data }: TripItemProps) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    id,
    company,
    miles,
    note,
    status,
    payment,
    paid,
    origin,
    destination,
    dateRange,
  } = data;
  console.log('data: ', data);

  console.log('collapsed: ', collapsed);
  // useEffect(() => setCollapsed(false), [id]);

 

  return (
    <div className={styles.trip_item}>
      <div className={styles.trip_preview}>
        <div>
          <div
            className={`${styles.company} ${collapsed ? styles.opened : ""}`}
          >
            {company}
          </div>
          <div className={`${styles.distance} ${collapsed ? styles.hide : ""}`}>
            {origin.state_abbr}
            <span>, {origin.city}</span> - {destination.state_abbr}
            <span>, {destination.city}</span>
          </div>
        </div>
        <div className={styles.preview_action}>
          {!paid ? <UnpaidIcon /> : null}
          <button className={`${styles.status} ${styles[status]}`}>
            {statuses?.find((it: any) => it.value === status)?.label || ""}
          </button>
          <button
            className={`${styles.more} ${collapsed ? styles.opened : ""}`}
            onClick={() => setCollapsed(!collapsed)}
          >
            <ArrowIcon /> 
          </button>
        </div>
      </div>
      {collapsed ? (
        <div className={styles.trip_detailed}>
          <div className={styles.group}>
            <div className={styles.infoItem}>
              <div>
                <div className={styles.label}>Origin</div>
                <div className={styles.value}>
                  {origin.state_abbr}, {origin.city}
                </div>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div>
                <div className={styles.label}>Destination</div>
                <div className={styles.value}>
                  {destination.state_abbr}, {destination.city}
                </div>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div>
                <div className={styles.label}>Miles</div>
                <div className={styles.value}>~{miles || 0}</div>
              </div>
            </div>
          </div>

          <div className={styles.group}>
            <div className={styles.payment}>
              <div className={styles.label}>Payment:</div>
              <div className={styles.value}>
                ${payment || 0}
                {!paid ? <UnpaidIcon /> : null}
              </div>
            </div>
            <div className={styles.time_range}>
              <div className={styles.label}>Time range:</div>
              <div className={styles.value}>
                {formatDateRange(dateRange)}{" "}
                <span>({calculateDuration(dateRange)})</span>
              </div>
            </div>
          </div>

          <div className={styles.note_detail}>
            {note ? (
              <div className={styles.note}>
                <div className={styles.label}>Note:</div>
                <div className={styles.value}>{note}</div>
              </div>
            ) : (
              <div className={styles.note} />
            )}
          </div>

          <div className={styles.trip_actions}>
            <EditAction item={data} />
            <DeleteAction id={id} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
