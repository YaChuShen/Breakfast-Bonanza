import { sample } from "lodash";
import foodList from "../contents/foodList";

const values = {
  customer1: { order: sample(foodList), status: "waiting" },
  customer2: { order: sample(foodList), status: "waiting" },
  plateContent1: [],
  plate: 2,
};

export default values;
