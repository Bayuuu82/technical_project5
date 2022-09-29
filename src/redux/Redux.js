import { createStore } from "redux";
import Reducer from "./reducers/Reducer.js";

const Redux = createStore(Reducer);
export default Redux;
