"use client";
import React, { useContext, useState } from "react";
import styles from "./styles.module.scss";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { Trip } from "@/types/trips";
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

export default function TripForm() {
  const { trip, resetTrip } = userTripContext();
  const { user } = UserAuth();

  const handleSubmit = async (
    values: any,
    { resetForm }: FormikHelpers<any>
  ) => {
    const tripData = { ...values, user: user.email,  timestamp: serverTimestamp() };

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

  return (
    <Formik
      key={JSON.stringify(trip)}
      initialValues={{
        company: trip?.company || "",
        miles: trip?.miles || "",
        note: trip?.note || "",
      }}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, resetForm }) => (
        <Form className={styles.trip_form}>
          <h2>
            {trip.hasOwnProperty("timestamp") ? "Update trip" : "Create trip"}
          </h2>

          <div className={styles.field_row}>
            <label>Company</label>
            <Field type="text" name="company" placeholder="Company name" />
          </div>

          <div className={styles.field_row}>
            <label>Miles</label>
            <Field id="miles" type="number" name="miles" placeholder="3600" />
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
        </Form>
      )}
    </Formik>
  );
}
