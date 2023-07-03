import settingPlateRules from "./settingPlateRules";

const autoPlateSystem = (data, target, isDone, setValue) => {
  let i = 1;
  while (i < data.plate + 1) {
    const key = `plateContent${i}`;
    const isPlateFull = data[key]?.length > 1;
    console.log(isPlateFull);
    if (isDone && settingPlateRules(data[key], target) && !isPlateFull) {
      setValue(
        `plateContent${i}`,
        data[key] ? [...data[key], target] : [target]
      );
      break;
    }
    i++;
  }
};

export default autoPlateSystem;
