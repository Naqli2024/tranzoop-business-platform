import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "../redux/Auth/AuthSlice";
import ErpsReducer from "../redux/Auth/ErpsSlice";
import PlansReducer from "../redux/Auth/PlansSlice";
import PurchaseReducer from '../redux/Auth/PurchaseSlice'
import BusinessReducer from '../redux/Auth/BusinessSlice'
 
const rootReducer = combineReducers({
  authAdmin: AuthReducer,
    erps: ErpsReducer,
    plans: PlansReducer,
    purchases:PurchaseReducer,
    businesses:BusinessReducer

});
 
const store = configureStore({
  reducer: rootReducer,
});
 
export default store;