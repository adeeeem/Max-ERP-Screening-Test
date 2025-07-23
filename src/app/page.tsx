"use client"
import { useState } from "react";
import styles from "./page.module.css";
import LeaveBalance from '../components/LeaveBalance';
import LeaveForm from '../components/LeaveForm'
import { initialLeaveBalance } from "@/utils/constants";
import dayjs from "dayjs";

export default function Home() {
  const [balance, setBalance] = useState(initialLeaveBalance);

  const calculateLeaveDays = (dates: any[], type: string) => {
    if (!dates || dates.length < 2) return 0;

    const start = dayjs(dates[0]);
    const end = dayjs(dates[1]);

    const totalDays = end.diff(start, "day") + 1;

    return type === "half" ? totalDays * 0.5 : totalDays;
  };
const handleLeaveSubmitted = (dates: any[], type: string) => {
  const days = calculateLeaveDays(dates, type);

  setBalance(prev => ({
    ...prev,
    annual: prev.annual - days,
  }));
};
 
  return (
    <div>
      <h1 className="headerText">Leave Portal </h1>
      <div className="formBody" >
        <LeaveBalance balance={balance} />
        <div style={{ marginTop: 20 }}>
          <LeaveForm onSubmitted={handleLeaveSubmitted} />
        </div>
      </div>
    </div>
  );
}
