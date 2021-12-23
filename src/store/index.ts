import { combineReducers } from "redux";
import { CategoryState } from "../types/category";
import { UserState } from "../types/user";
import userReducer from "./reducers/userReducer";
import categoryReducer from "./reducers/categoryReducer";
import recordReducer from "./reducers/recordReducer";
import { RecordState } from "../types/record";

export interface AppState {
    user: UserState;
    categories: CategoryState;
    records: RecordState;
}

const rootReducer = combineReducers({
    user: userReducer,
    categories: categoryReducer,
    records: recordReducer
})

export default rootReducer