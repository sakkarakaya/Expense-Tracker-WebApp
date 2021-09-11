import { combineReducers } from "redux";
import { CategoryState } from "../types/category";
import { UserState } from "../types/user";
import userReducer from "./reducers/userReducer";
import categoryReducer from "./reducers/categoryReducer";

export interface AppState {
    user: UserState;
    categories: CategoryState;
    records: any;
}

const rootReducer = combineReducers({
    user: userReducer,
    categories: categoryReducer,
    // records: () => {}
})

export default rootReducer