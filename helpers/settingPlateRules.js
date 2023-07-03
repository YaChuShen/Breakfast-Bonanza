import React from "react";

const notValidArr = ["hotDog", "sunnyEgg"];

const rules = (plateContent) => {
  return { toast: notValidArr.includes(plateContent?.[0]) };
};
const settingPlateRules = (plateContent, currentValue) => {
  if (
    plateContent?.[0] === currentValue ||
    plateContent?.length > 1 ||
    rules(plateContent)[currentValue]
  ) {
    return false;
  } else {
    return true;
  }
};

export default settingPlateRules;
