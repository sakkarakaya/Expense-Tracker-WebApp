import { ThunkDispatch } from "redux-thunk";
import { Category } from "./category";

export interface RecordState {
    data: Record[];
    loading: boolean;
    error: string;
}

export interface Record{
    id: number;
    title: string;
    amount: number;
    createdAd: string;
    updatedAd: string;
    category: Category;
}

export interface RecordForm{
    title: string;
    amount: number;
    category_id: number;
}

interface GET_RECORD_START {
    type: "GET_RECORD_START";
}

interface GET_RECORD_SUCCESS {
    type: "GET_RECORD_SUCCESS";
    payload: Record[];
}

interface GET_RECORD_ERROR {
    type: "GET_RECORD_ERROR";
}

interface ADD_RECORD_START {
    type: "ADD_RECORD_START";
}

interface ADD_RECORD_SUCCESS {
    type: "ADD_RECORD_SUCCESS";
    payload: Record;
}

interface ADD_RECORD_ERROR {
    type: "ADD_RECORD_ERROR";
}

interface EDIT_RECORD_START {
    type: "EDIT_RECORD_START";
}

interface EDIT_RECORD_SUCCESS {
    type: "EDIT_RECORD_SUCCESS";
    payload: Record;
}

interface EDIT_RECORD_ERROR {
    type: "EDIT_RECORD_ERROR";
}
interface DELETE_RECORD_START {
    type: "DELETE_RECORD_START";
}

interface DELETE_RECORD_SUCCESS {
    type: "DELETE_RECORD_SUCCESS";
    payload: number;
}

interface DELETE_RECORD_ERROR {
    type: "DELETE_RECORD_ERROR";
}

export type RecordAction = GET_RECORD_START | GET_RECORD_SUCCESS | GET_RECORD_ERROR | ADD_RECORD_START | ADD_RECORD_SUCCESS | ADD_RECORD_ERROR | EDIT_RECORD_START | EDIT_RECORD_SUCCESS | EDIT_RECORD_ERROR | DELETE_RECORD_START | DELETE_RECORD_SUCCESS | DELETE_RECORD_ERROR;
export type RecordDispatch = ThunkDispatch<RecordState, void, RecordAction>;