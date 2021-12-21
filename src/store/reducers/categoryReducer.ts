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
        case "ADD_START":
            return {...state, loading: true, error: ""}
        case "ADD_SUCCESS":
            return {...state, loading: false, data: [action.payload, ...state.data]}
        case "ADD_ERROR":
            return {...state, loading: false, error:"add error"}
        case "EDIT_START":
            return {...state, loading: true, error: ""}
        case "EDIT_SUCCESS":
            return {...state, loading: false, data: state.data.map(category => category.id === action.payload.id ? action.payload : category)}
        case "EDIT_ERROR":
            return {...state, loading: false, error:"edit error"}
        case "DELETE_START":
            return {...state, loading: true, error: ""}
        case "DELETE_SUCCESS":
            return {...state, loading: false, data: state.data.filter(category => category.id !== action.payload)}
        case "DELETE_ERROR":
            return {...state, loading: false, error:"delete error"}
        default:
            return state;
    }
} 

export default categoryReducer;