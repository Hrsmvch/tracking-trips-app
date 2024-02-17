import { Trip } from "@/types/trips";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import ArrowIcon from "@/public/arrow.svg";
import EditIcon from "@/public/edit.svg";
import DeleteIcon from "@/public/delete.svg";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { userTripContext } from "@/context/TripContext";

interface TripItemProps {
  data: Trip;
}

const EditAction = ({ item }: { item: Trip }) => {
  const { trip, setTrip, resetTrip } = userTripContext();

  const handleEdit = async () => {
    setTrip(item);
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
  const { id, company, miles, note, timestamp } = data;

  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => setCollapsed(false), [id]);

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
            Fila, 13243 - Mayd, 23433
          </div>
        </div>
        <div className={styles.preview_action}>
          <button className={`${styles.status} ${styles["paid"]}`}>
            Paid
            {/* {statuses?.find((it: any) => it.value === status)?.label || ""} */}
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
                <div className={styles.value}>Mayrg, 23245</div>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div>
                <div className={styles.label}>Destination</div>
                <div className={styles.value}>Filds, 2356</div>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div>
                <div className={styles.label}>Miles</div>
                <div className={styles.value}>~{miles || "0"}</div>
              </div>
            </div>
          </div>

          <div className={styles.group}>
            <div className={styles.duration}>
              <div className={styles.label}>Duration:</div>
              <div className={styles.value}>3 days</div>
            </div>

            <div className={styles.payment}>
              <div className={styles.label}>Payment:</div>
              <div className={styles.value}>0</div>
            </div>
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
