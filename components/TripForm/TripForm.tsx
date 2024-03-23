"use client";
import React, { Fragment, useEffect } from "react";
import styles from "./styles.module.scss";
import { Field, Form, Formik, FormikHelpers } from "formik";
import ArrowIcon from "@/public/arrow.svg";

import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import { userTripContext } from "@/context/TripContext";
import { UserAuth } from "@/context/AuthContext";
import Select from "react-select";
import customStyles from "@/utils/selectFormat";
import getLocationFromZipCode from "@/utils/getLocationFromZipCode";
import calculateDistance from "@/utils/calculateDistance";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import statuses from "@/data/statuses";

export default function TripForm() {
  const { trip, resetTrip, mobileForm, setMobileForm } = userTripContext();
  const { user } = UserAuth();

  const handleZipCodeChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any,
    fieldName: string
  ) => {
    const value = event.target.value;
    setFieldValue(`${fieldName}.zip`, value);

    if (value.length === 5) {
      const locationData = await getLocationFromZipCode(value);

      if (locationData) {
        setFieldValue(fieldName, { ...locationData, zip: value });
      }
    } else {
      setFieldValue(fieldName, {});
    }
  };

  const handleSubmit = async (
    values: any,
    { resetForm }: FormikHelpers<any>
  ) => {
    const tripData = {
      ...values,
      user: user.email,
      timestamp: serverTimestamp(),
    };

    if (trip.hasOwnProperty("timestamp") && trip.id) {
      const docRef = doc(db, "trips", trip.id);
      await updateDoc(docRef, tripData);
    } else {
      const tripsCollection = collection(db, "trips");
      await addDoc(tripsCollection, tripData);
    }

    resetTrip();
    resetForm();
  };

  const handleDistance = async (
    origin: any,
    destination: any,
    setFieldValue: any
  ) => {
    const calculatedDistance = await calculateDistance(
      origin.latitude,
      origin.longitude,
      destination.latitude,
      destination.longitude
    );
    setFieldValue("miles", calculatedDistance);
  };

  const handleDateRangeChange = (dateRange: any, setFieldValue: any) => {
    console.log('dateRange: ', dateRange);
    setFieldValue("dateRange", {
      start: dateRange[0],
      end: dateRange[1],
    });
  };

  const handleMobileForm = () => {
    if (window.innerWidth < 1000) {
      setMobileForm(!mobileForm);
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1000) {
        setMobileForm(false);
      } else{
        setMobileForm(true);
      }
    }
  
    handleResize();
  
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Formik
      key={JSON.stringify(trip)}
      initialValues={{
        company: trip?.company || "",
        origin: trip?.origin || {},
        destination: trip?.destination || {},
        dateRange: {
          start: trip?.dateRange?.start?.toDate(),
          end: trip?.dateRange?.end?.toDate(),
        },
        miles: trip?.miles || "",
        payment: trip.payment || "",
        paid: trip.paid || false,
        status: trip.status || statuses[0].value,
        note: trip?.note || "",
      }}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, resetForm }) => (
        <Form
          className={`${styles.trip_form} ${!mobileForm ? styles.closed : ""}`}
        >
          <div className={styles.form_heading} onClick={handleMobileForm}>
            <h2>
              {trip.hasOwnProperty("timestamp") ? "Update trip" : "Create trip"}
            </h2>
            <button type="button" className={styles.btn_open_form}>
              <ArrowIcon />
            </button>
          </div>

          {!mobileForm ? (
            <Fragment key={mobileForm}>
              <div className={styles.field_row}>
                <label>Company</label>
                <Field type="text" name="company" placeholder="Company name" />
              </div>

              <div className={styles.field_row}>
                <label>Origin (zip Code): </label>
                <Field
                  key={values.origin.zip}
                  type="text"
                  name="origin"
                  value={values.origin.zip}
                  placeholder="Zip code"
                  onChange={(e: any) =>
                    handleZipCodeChange(e, setFieldValue, "origin")
                  }
                />

                {!!values?.origin?.city && (
                  <>
                    <div className={styles.zip_data}>
                      Location:
                      <span>{`${values?.origin?.state}, ${values?.origin?.city} `}</span>
                    </div>
                  </>
                )}
              </div>

              <div className={styles.field_row}>
                <label>Destination (zip Code): </label>
                <Field
                  key={values.destination.zip}
                  type="text"
                  value={values.destination.zip}
                  placeholder="Zip code"
                  onChange={(e: any) =>
                    handleZipCodeChange(e, setFieldValue, "destination")
                  }
                />

                {!!values?.destination?.city && (
                  <>
                    <div className={styles.zip_data}>
                      Location:
                      <span>{`${values?.destination?.state}, ${values?.destination?.city} `}</span>
                    </div>
                  </>
                )}
              </div>

              <div className={styles.field_row}>
                <label>Delivery period: </label>
                <DateRangePicker
                  showOneCalendar
                  onChange={(e: any) => handleDateRangeChange(e, setFieldValue)}
                  defaultValue={
                    values?.dateRange.start
                      ? [values?.dateRange?.start, values?.dateRange?.end]
                      : null
                  }
                />
              </div>

              <div className={styles.field_row}>
                <label>Miles</label>
                <Field
                  id="miles"
                  type="number"
                  name="miles"
                  placeholder="3600"
                />
                {values.origin.hasOwnProperty("longitude") &&
                values.destination.hasOwnProperty("longitude") ? (
                  <button
                    type="button"
                    className={styles.helper_btn}
                    onClick={() =>
                      handleDistance(
                        values.origin,
                        values.destination,
                        setFieldValue
                      )
                    }
                  >
                    Calculate automatically
                  </button>
                ) : null}
              </div>

              <div className={styles.field_row}>
                <label htmlFor="payment">Payment</label>
                <div className={styles.payment_group}>
                  <Field
                    id="payment"
                    type="number"
                    name="payment"
                    placeholder="1 400"
                  />
                  <Field type="checkbox" name="paid" />
                </div>
              </div>

              <div className={styles.field_row}>
                <label htmlFor="status">Status</label>
                <Select
                  key={values.status}
                  options={statuses || []}
                  onChange={(select: any) =>
                    setFieldValue("status", select.value)
                  }
                  name="status"
                  placeholder="Choose status"
                  defaultValue={statuses?.find(
                    (item): any => item.value === values.status
                  )}
                  components={{ IndicatorSeparator: () => null }}
                  styles={customStyles}
                />
              </div>

              <div className={styles.field_row}>
                <label htmlFor="note">Notes:</label>
                <Field as="textarea" name="note" />
              </div>

              <div className={styles.action}>
                <button
                  type="button"
                  onClick={() => {
                    resetTrip();
                    resetForm();
                  }}
                >
                  Cancel
                </button>
                <button type="submit">Save</button>
              </div>
            </Fragment>
          ) : null}
        </Form>
      )}
    </Formik>
  );
}
