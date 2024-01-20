import React, { useEffect, useState } from "react";
import { statuses } from "@/data/statuses";
import { userTrips } from "@/context/TripsContext";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import getFormatedDate from "@/utils/getFormatedDate";
import calculateDuration from "@/utils/calculateDuration";
import styles from "./styles.module.scss";

export default function TripItem({ data }: any) {  
  const { id, company, destination, origin, note, paid, payment, status, miles } = data; 
  const { getTripsData } = userTrips();

  const [collapsed, setCollapsed] = useState(false); 
  useEffect(() => setCollapsed(false), [id])
 
  const updateTripById = async (tripId: string) => {
    const {id, ...restData} = data;
    const testUpdatingData = {...restData, company: `${company} Updated` }
    try {
      const tripDocRef = doc(db, 'trips', tripId); 
      await setDoc(tripDocRef, testUpdatingData, { merge: true });
  
      getTripsData();
    } catch (error) {
      console.error('Error updating trip:', error);
    }
  };

  const removeTripById = async (tripId: string) => {
    try {
      const tripDocRef = doc(db, 'trips', tripId); 
      await deleteDoc(tripDocRef);
  
  
      getTripsData();
    } catch (error) {
      console.error('Error removing trip:', error);
    }
  };
  
  return (
    <div className={styles.tripItem} key={id}>
      <div className={styles.preview}>
        <div className={styles.previewInfo}>
          <div
            className={`${styles.company} ${collapsed ? styles.opened : ""}`}
          >
            {company}
          </div>
          <div className={`${styles.distance} ${collapsed ? styles.hide : ""}`}>
            {origin.city} {origin.state} - {destination.city}{" "}
            {destination.state}
          </div>
        </div>
        <div className={styles.preview_action}>
          <button className={`${styles.status} ${styles[status]}`}>
            {statuses?.find((it: any) => it.value === status)?.label || ""}
          </button>
          <button
            className={`${styles.more} ${collapsed ? styles.opened : ""}`}
            onClick={() => setCollapsed(!collapsed)}
          >
            <svg
              width="39"
              height="38"
              viewBox="0 0 39 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_5_843)">
                <path
                  d="M11.5 14L19.5 21.5L27.5 14L29.25 15.8333L19.5 25.3333L9.75 15.8333L11.5 14Z"
                  fill="#b0b0b0"
                />
              </g>
              <defs>
                <clipPath id="clip0_5_843">
                  <rect width="39" height="38" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      </div>

      {collapsed ? (
        <div className={styles.detailedInfo}>
          <div className={styles.group_info}>
            <div className={styles.infoItem}>
              <div>
                <div className={styles.label}>Origin</div>
                <div className={styles.value}>
                  {origin.city} {origin.state || "-"}
                </div>
              </div>
              <div>
                <div className={styles.label}>Date:</div>
                <div className={styles.value}>
                  {getFormatedDate(origin.date)}
                </div>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div>
                <div className={styles.label}>Destination</div>
                <div className={styles.value}>
                  {destination.city} {destination.state || "-"}
                </div>
              </div>
              <div>
                <div className={styles.label}>Date:</div>
                <div className={styles.value}>
                  {getFormatedDate(destination.date)}
                </div>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div>
                <div className={styles.label}>Miles</div>
                <div className={styles.value}>~{miles || "3500"}</div>
              </div>
              <div>
                <div className={styles.label}>Duration:</div>
                <div className={styles.value}>
                  {calculateDuration(origin?.date, destination?.date)}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.group_info}>
            <div className={styles.payment}>
              <div className={styles.label}>Payment:</div>
              <div className={styles.value}>
                ${payment || "0"}
                {!paid ? (
                  <>
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 9.81081C0 4.39252 4.39252 0 9.81081 0H11.991C17.4093 0 21.8018 4.39252 21.8018 9.81081V11.991C21.8018 17.4093 17.4093 21.8018 11.991 21.8018H9.81081C4.39252 21.8018 0 17.4093 0 11.991V9.81081Z"
                        fill="#FAC5C5"
                        fill-opacity="0.5"
                      />
                      <path
                        d="M7.75381 6.98255C7.5407 6.76998 7.19569 6.76998 6.98258 6.98255C6.77001 7.19566 6.77001 7.54067 6.98258 7.75324L10.1302 10.9009L6.98312 14.0485C6.77 14.2611 6.77 14.6061 6.98312 14.8192C7.19568 15.0318 7.5407 15.0318 7.75381 14.8192L10.9009 11.6716L14.0485 14.8192C14.2616 15.0318 14.6067 15.0318 14.8192 14.8192C15.0323 14.6061 15.0323 14.2611 14.8192 14.0485L11.6721 10.9009L14.8192 7.75324C15.0323 7.54067 15.0323 7.19566 14.8192 6.98255C14.6067 6.76998 14.2616 6.76998 14.0485 6.98255L10.9009 10.1302L7.75381 6.98255Z"
                        fill="#B30F0F"
                      />
                    </svg>
                  </>
                ) : null}
              </div>
            </div>
            {note ? (
              <div className={styles.note}>
                <div className={styles.label}>Note:</div>
                <div className={styles.value}>{note}</div>
              </div>
            ) : null}
          </div>

          <div className={styles.tripActions}>
            <button className={styles.edit} onClick={() => updateTripById(id)}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.9046 8.04356C17.9125 7.03184 19.5197 6.98068 20.5882 7.89228L20.7443 8.03623L20.8961 8.20015C21.7651 9.21841 21.7651 10.7239 20.8961 11.7422L20.7516 11.8988L12.5 20.1818C12.314 20.3686 12.0899 20.5116 11.8439 20.6017L11.6555 20.6592L7.95284 21.5716C7.54592 21.6718 7.17628 21.3374 7.211 20.9396L7.22832 20.8391L8.1787 17.1541C8.24274 16.9058 8.35889 16.6748 8.51862 16.4761L8.64644 16.3333L16.9046 8.04356ZM7.70903 2.67441L7.75928 2.77574L11.3376 11.9306L10.4112 12.8605L9.6048 10.7978H4.8084L3.55937 14.0135C3.45263 14.2879 3.16602 14.4394 2.88673 14.3852L2.78272 14.3552C2.50818 14.2484 2.35679 13.9619 2.41087 13.6825L2.44096 13.5786L6.64123 2.7767C6.82524 2.3035 7.45993 2.26917 7.70903 2.67441ZM7.20073 4.64506L5.2752 9.59775H9.1368L7.20073 4.64506Z"
                  fill="#212121"
                />
              </svg>
            </button>
            <button className={styles.delete} onClick={() => removeTripById(id)}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 2L9 3H5C4.448 3 4 3.448 4 4C4 4.552 4.448 5 5 5H7H17H19C19.552 5 20 4.552 20 4C20 3.448 19.552 3 19 3H15L14 2H10ZM5 7V20C5 21.105 5.895 22 7 22H17C18.105 22 19 21.105 19 20V7H5Z"
                  fill="black"
                />
              </svg>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
