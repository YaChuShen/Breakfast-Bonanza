const toastNotValidArr = ['hotDog', 'sunnyEgg'];

const rules = (plateContent) => {
  return { toast: toastNotValidArr.includes(plateContent?.[0]) };
};
const settingPlateRules = (plateContent, currentValue) => {
  if (plateContent?.[0] === currentValue || rules(plateContent)[currentValue]) {
    return false;
  } else {
    return true;
  }
};

export default settingPlateRules;
