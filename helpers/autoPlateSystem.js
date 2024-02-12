import settingPlateRules from './settingPlateRules';
import { addFood } from 'pages/features/plateSlice';

const autoPlateSystem = (data, target, isDone, setValue, dispatch) => {
  let i = 1;
  while (i < data.plate + 1) {
    const key = `plateContent${i}`;
    const isPlateFull = data[key]?.length > 1;
    if (isDone && settingPlateRules(data[key], target) && !isPlateFull) {
      setValue(`plateContent${i}`, [...data[key], target]);
      dispatch(addFood({ id: i, targetItem: target }));
      break;
    }
    i++;
  }

  // Object.entries(data).filter(([key, value]) => {
  //   if (key.startsWith("plateContent") && value.length < 2) {
  //     /**Todo */
  //   }
  // });
};

export default autoPlateSystem;
