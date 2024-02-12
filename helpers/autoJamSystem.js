import { addFood } from 'pages/features/plateSlice';

const autoJamSystem = (data, target, setValue, dispatch) => {
  let i = 1;
  while (i < data.plate + 1) {
    const key = `plateContent${i}`;
    //如果盤子裡面有吐司又是只有一個食物
    if (data[key].includes('toast') && data[key].length === 1) {
      setValue(`plateContent${i}`, [...data[key], target]);
      dispatch(addFood({ id: i, targetItem: target }));
      break;
    }
    i++;
  }
};

export default autoJamSystem;
