import { CategoryAction, CategoryState } from "../../types/category";

const defaultState: CategoryState = {
    data: [],
    loading: false,
    error: ""
}

const categoryReducer = (state: CategoryState = defaultState, action: CategoryAction) => {
    switch(action.type){
        case "GET_START":
            return {...state, loading: true, error: ""}
        case "GET_SUCCESS":
            return {...state, loading: false, data: action.payload}
        case "GET_ERROR":
            return {...state, loading: false, error:"get error"}
        default:
            return state;
    }
} 

export default categoryReducer;