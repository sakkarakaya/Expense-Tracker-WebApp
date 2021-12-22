import { Record, RecordDispatch, RecordForm } from "../../types/record";
import api from "../../utils/api"

export const getRecords = () => async (dispatch: RecordDispatch) => {
    dispatch({ type:"GET_RECORD_START" })
    try {
        const response = await api().get<Record[]>("/records")
        dispatch({ type:"GET_RECORD_SUCCESS", payload: response.data })
    } catch {
        dispatch({ type:"GET_RECORD_ERROR" })
    }
}

export const addRecord = (form: RecordForm) => async (dispatch: RecordDispatch) => {
    dispatch({ type:"ADD_RECORD_START" })
    try {
        const response = await api().post<Record>("/records", form)
        dispatch({ type:"ADD_RECORD_SUCCESS", payload: response.data })
    } catch {
        dispatch({ type:"ADD_RECORD_ERROR" })
    }
}

export const editRecord = (form: RecordForm, id: number) => async (dispatch: RecordDispatch) => {
    dispatch({ type:"EDIT_RECORD_START" })
    try {
        const response = await api().put<Record>(`/records/${id}`, form)
        dispatch({ type:"EDIT_RECORD_SUCCESS", payload: response.data })
    } catch {
        dispatch({ type:"EDIT_RECORD_ERROR" })
    }
}

export const deleteRecord = (id: number) => async (dispatch: RecordDispatch) => {
    dispatch({ type:"DELETE_RECORD_START" })
    try {
        await api().delete<Record>(`/records/${id}`)
        dispatch({ type:"DELETE_RECORD_SUCCESS", payload: id })
    } catch {
        dispatch({ type:"DELETE_RECORD_ERROR" })
    }
}