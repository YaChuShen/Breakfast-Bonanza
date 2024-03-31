import settingPlateRules from './settingPlateRules';
import { addFood } from 'store/features/plateSlice';
import splitCategories from 'helpers/splitCategories';
import menuList from 'contents/menuList';
import { isEqual } from 'lodash';

const sortList = menuList.map((e) => {
  return e.split('&').sort();
});

const autoPlateSystem = (data, target, isDone, dispatch) => {
  let i = 1;
  while (i < data.plate + 1) {
    const key = `plateContent${i}`;

    const checkIsPlateFull = sortList.some((e) => {
      return isEqual(e, [...data[key]]?.sort());
    });

    if (isDone && settingPlateRules(data[key], target) && !checkIsPlateFull) {
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
