import { RecordAction, RecordState } from "../../types/record"

const defaultState = {
    data: [],
    loading: false,
    error: ""
}

const recordReducer = (state: RecordState = defaultState, action: RecordAction) => {
    switch(action.type){
        case "GET_RECORD_START":
            return {...state, loading: true, error: ""}
        case "GET_RECORD_SUCCESS":
            return {...state, data: action.payload, loading: false}
        case "GET_RECORD_ERROR":
            return {...state, loading: false, error: "get records error"}
        case "ADD_RECORD_START":
            return {...state, loading: true, error: ""}
        case "ADD_RECORD_SUCCESS":
            return {...state, data: [action.payload, ...state.data], loading: false}
        case "ADD_RECORD_ERROR":
            return {...state, loading: false, error: "add record error"}
        case "EDIT_RECORD_START":
            return {...state, loading: true, error: ""}
        case "EDIT_RECORD_SUCCESS":
            return {...state, data: state.data.map((record) => record.id === action.payload.id ? action.payload : record), loading: false}
        case "EDIT_RECORD_ERROR":
            return {...state, loading: false, error: "edit record error"}
        case "DELETE_RECORD_START":
            return {...state, loading: true, error: ""}
        case "DELETE_RECORD_SUCCESS":
            return {...state, data: state.data.filter((record) => record.id !== action.payload), loading: false}
        case "DELETE_RECORD_ERROR":
            return {...state, loading: false, error: "delete record error"}
        default:
            return state
    }
}

export default recordReducer