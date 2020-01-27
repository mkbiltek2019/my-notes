import { createStore } from "redux";
import notesReducer from "./notes-reducer";

const store = createStore(notesReducer);
export default store;
