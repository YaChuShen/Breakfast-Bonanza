import { range, sample } from "lodash";
import foodList from "../contents/foodList";

const settings = {
  customers: 3,
  plate: 3,
};

const generateValues = () => {
  const v = range(settings.customers).reduce((all, curr, i) => {
    all[`customer${i + 1}`] = { order: sample(foodList), status: "waiting" };
    return all;
  }, {});
  const p = range(settings.plate).reduce((all, curr, i) => {
    all[`plateContent${i + 1}`] = [];
    return all;
  }, {});
  return { ...p, ...v, plate: settings.plate, customer: settings.customers };
};

const values = generateValues();

export default values;
