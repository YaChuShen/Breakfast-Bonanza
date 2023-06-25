import React from "react";

const notValidArr = ["hotDog", "sunnyEgg"];

const settingPlateRules = (plateContent, currentValue) => {
  if (
    plateContent[0] === currentValue ||
    plateContent.length > 1 ||
    notValidArr.includes(plateContent[0])
  ) {
    return false;
  } else {
    return true;
  }
};

export default settingPlateRules;
