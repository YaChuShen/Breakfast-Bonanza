import autoPlateSystem from "../autoPlateSystem";

const passToPlate = (
  data,
  cookedGroup,
  isDone,
  setValue,
  setStatus,
  setMove
) => {
  autoPlateSystem(data, cookedGroup?.done.value, isDone, setValue);
  if (isDone) {
    setStatus(null);
    setMove && setMove(false);
  }
};

export default passToPlate;
