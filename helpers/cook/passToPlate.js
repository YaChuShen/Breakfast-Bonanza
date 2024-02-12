import autoPlateSystem from '../autoPlateSystem';

const passToPlate = (
  data,
  cookedGroup,
  isDone,
  setValue,
  setStatus,
  setMove,
  dispatch
) => {
  autoPlateSystem(data, cookedGroup?.done.value, isDone, setValue, dispatch);
  if (isDone) {
    setStatus(null);
    setMove && setMove(false);
  }
};

export default passToPlate;
