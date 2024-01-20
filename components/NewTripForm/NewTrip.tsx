import { auth, db } from "@/utils/firebase";
import { addDoc, collection } from "firebase/firestore";
import { Field, Form, Formik, FormikHelpers } from "formik";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import styles from "./styles.module.scss";
import { Country, State, City } from "country-state-city";
import { statuses } from "@/data/statuses";
import customStyles from '@/utils/selectFormat'
import { stringify } from "querystring";

export default function NewTrip() {
  const tripsCollaction = collection(db, "trips");
  // const companiesCollaction = collection(db, "companies");

  const [selectedState, setSelectedState] = useState("");
  const [citiesInState, setCitiesInState] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const states = State.getStatesOfCountry("US").map((state) => ({
    value: state.isoCode,
    label: state.name,
  }));

  useEffect(() => {
    if (selectedState) {
      const cities = City.getCitiesOfState("US", selectedState).map((city) => ({
        value: city.name,
        label: city.name,
      }));
      setCitiesInState(cities);
    }
  }, [selectedState]);

  const companies: any = [
    { label: "Company name", value: "company name" },
    { label: "Company name 2", value: "company name 2" },
    { label: "Company name 3", value: "company name 3" },
  ];

  const handleSubmit = async (
    values: any,
    { resetForm }: FormikHelpers<any>
  ) => {
    setLoading(true)
    await addDoc(tripsCollaction, values);
    resetForm();
    setLoading(false)
  };

  return (
    <Formik
      initialValues={{
        id: Date.now().toString(),
        user: auth?.currentUser?.uid || null,
        company: "",
        origin: {
          state: "",
          city: "",
          date: "",
        },
        destination: {
          state: "",
          city: "",
          date: "",
        },
        miles: '',
        payment: "",
        paid: false,
        status: statuses[0].value || "",
        note: "",
      }}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, resetForm }) => (
        <Form key={`${loading}`}>
          <div className={styles.field_row}>
            <label>Company</label>
            <Field type="text" name="company" placeholder="Company name" />
          </div>

          {/* <Select
            // key={values.company}
            options={companies ? companies : []}
            onChange={(select: any) => setFieldValue("company", select.value)}
            name="company"
            placeholder="Choose Company"
            // styles={customStyles}
            components={{ IndicatorSeparator: () => null }}
          /> */}

          <div className={`${styles.field_row} ${styles.group}`}>
            <Select
              isSearchable
              options={states ? states : []}
              onChange={(select: any) => {
                setSelectedState(select.value);
                setFieldValue("origin.state", select.value);
              }}
              name="origin.state"
              placeholder="Choose state"
              components={{ IndicatorSeparator: () => null }}
              styles={customStyles}
            />
            <Select
              isSearchable
              id="status"
              options={citiesInState ? citiesInState : []}
              onChange={(select: any) =>
                setFieldValue("origin.city", select.value)
              }
              name="origin.city"
              placeholder="Choose city"
              components={{ IndicatorSeparator: () => null }}
              styles={customStyles}
            />
          </div>

          <div className={styles.field_row}>
            <Field type="date" name="origin.date" placeholder="Date" />
          </div>

          <div className={`${styles.field_row} ${styles.group}`}>
            <Select
              options={states ? states : []}
              onChange={(select: any) => {
                setSelectedState(select.value);
                setFieldValue("destination.state", select.value);
              }}
              name="destination.state"
              placeholder="Choose state"
              components={{ IndicatorSeparator: () => null }}
              styles={customStyles}
            />
            <Select
              id="city"
              options={citiesInState ? citiesInState : []}
              onChange={(select: any) =>
                setFieldValue("destination.city", select.value)
              }
              name="destination.city"
              placeholder="Choose city"
              components={{ IndicatorSeparator: () => null }}
              styles={customStyles}
            />
          </div>

          <div className={styles.field_row}>
            <Field type="date" name="destination.date" placeholder="Date" />
          </div>

          <div className={styles.field_row}>
            <label>Miles</label>
            <Field 
              id="miles" 
              type="number" 
              name="miles" 
              placeholder="3600" />
          </div>

          <div className={styles.field_row}>
            <label htmlFor="payment">Payment</label>
            <div className={styles.group}>
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
              options={statuses ? statuses : []}
              onChange={(select: any) => setFieldValue("status", select.value)}
              name="status"
              placeholder="Choose status"
              defaultValue={statuses[0]}
              components={{ IndicatorSeparator: () => null }}
              styles={customStyles}
            />
          </div>

          <div className={styles.field_row}>
            <label htmlFor="note">Notes:</label>
            <textarea
              defaultValue={values.note}
              id="note"
              name="notes"
              onChange={(event) => setFieldValue("note", event.target.value)}
            ></textarea>
          </div>

          <div className={styles.action}>
            <button type="button" onClick={() => resetForm()}>
              Clean
            </button>
            <button type="submit">Save</button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
