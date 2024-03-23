import { Trip } from "@/types/trips";
import { useEffect, useState } from "react";

const useTripData = (trips: Trip[]) => {
  const [tripData, setTripData]: any = useState({
    miles: { total: 0, totalPerMonths: [] },
    payment: { total: 0, totalPerMonths: [] },
    statuses: {},
    totalDaysInTrip: 0,
  });

  useEffect(() => {
    const initializeMonthsData = () => {
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      return monthNames.map((month) => ({
        month,
      }));
    };

    const calculateTotalByMonth = () => {
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const milesMonthlySums = Array(12).fill(0);
      const paymentMonthlySums = Array(12).fill(0);

      trips.forEach((trip: Trip) => {
        const month = trip.dateRange.start.toDate().getMonth();
        milesMonthlySums[month] += trip.miles || 0;
        if (trip.paid) {
          paymentMonthlySums[month] += trip.payment || 0;
        }
      });

      const milesData = milesMonthlySums.map((milesSum, index) => ({
        month: monthNames[index],
        milesPerMonth: milesSum,
      }));

      const paymentData = paymentMonthlySums.map((paymentSum, index) => ({
        month: monthNames[index],
        paymentPerMonth: paymentSum,
      }));

      return { milesData, paymentData };
    };

    const calculateTotalByStatus = () => {
      const allStatuses = ["delivered", "canceled", "pending"]; // Assuming you have all possible statuses defined here
      const statusMap: any = {};

      allStatuses.forEach((status) => {
        statusMap[status] = 0;
      });

      trips.forEach((trip: Trip) => {
        const status = trip.status;
        if (allStatuses.includes(status)) {
          statusMap[status] += 1;
        }
      });

      return statusMap;
    };

    const calculateTotalDaysInTrip = () => {
      let totalDays = 0;
      trips.forEach((trip) => {
        const start = trip.dateRange.start.toDate();
        const end = trip.dateRange.end.toDate();
        const tripDuration = (end - start) / (1000 * 60 * 60 * 24);
        totalDays += tripDuration;
      });
      return totalDays;
    };

    const calculateTotal = () => {
      const milesTotal = trips.reduce(
        (total, trip) => total + (trip.miles || 0),
        0
      );
      const paymentTotal = trips.reduce(
        (total, trip) => (trip.paid ? total + (trip.payment || 0) : total),
        0
      );
      const statusesTotal = calculateTotalByStatus();
      const totalDaysInTrip = calculateTotalDaysInTrip();

      return {
        miles: milesTotal,
        payment: paymentTotal,
        statuses: statusesTotal,
        totalDaysInTrip: totalDaysInTrip,
      };
    };

    if (trips.length === 0) {
      setTripData({
        miles: { total: 0, totalPerMonths: initializeMonthsData() },
        payment: { total: 0, totalPerMonths: initializeMonthsData() },
        statuses: {},
        totalDaysInTrip: 0,
      });
    } else {
      const { milesData, paymentData } = calculateTotalByMonth();
      const totalData = calculateTotal();
      setTripData({
        miles: { total: totalData.miles, totalPerMonths: milesData },
        payment: { total: totalData.payment, totalPerMonths: paymentData },
        statuses: totalData.statuses,
        totalDaysInTrip: totalData.totalDaysInTrip,
      });
    }
  }, [trips]);

  return tripData;
};

export default useTripData;
