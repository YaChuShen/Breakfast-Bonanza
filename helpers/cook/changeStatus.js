import React from "react";
import { MUTURITYTIME, OVERTIME } from "../../contents/rulse";

const time = (setStatus, status, seconds) => {
  const s = setTimeout(() => {
    setStatus(status);
  }, [seconds]);
  return () => clearTimeout(s);
};

const changeStatus = (setStatus, status) => {
  const isCooking = status === "cooking";
  const isMaturity = status === "maturity";
  const isOver = status === "over";
  if (isCooking) time(setStatus, "maturity", MUTURITYTIME);
  if (isMaturity) time(setStatus, "over", OVERTIME);
  
};

export default changeStatus;
