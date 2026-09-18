import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "../redux/Auth/AuthSlice";
import ErpsReducer from "../redux/Auth/ErpsSlice";
import PlansReducer from "../redux/Auth/PlansSlice";
 
const rootReducer = combineReducers({
  authAdmin: AuthReducer,
    erps: ErpsReducer,
    plans: PlansReducer,
});
 
const store = configureStore({
  reducer: rootReducer,
});
 
export default store;