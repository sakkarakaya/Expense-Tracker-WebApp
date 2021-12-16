import { ThunkDispatch } from "redux-thunk";

export interface CategoryState {
    data: Category[];
    loading: boolean;
    error: string;
}

export interface Category{
    id: number;
    name: string;
    type: string;
    color: string;
}

export interface CategoryForm{
    name: string;
    type: string;
    color: string;
}

interface GET_START {
    type: "GET_START";
}

interface GET_SUCCESS {
    type: "GET_SUCCESS";
    payload: Category[];
}

interface GET_ERROR {
    type: "GET_ERROR";
}

interface ADD_START {
    type: "ADD_START";
}

interface ADD_SUCCESS {
    type: "ADD_SUCCESS";
    payload: Category;
}

interface ADD_ERROR {
    type: "ADD_ERROR";
}

interface EDIT_START {
    type: "EDIT_START";
}

interface EDIT_SUCCESS {
    type: "EDIT_SUCCESS";
    payload: Category;
}

interface EDIT_ERROR {
    type: "EDIT_ERROR";
}
interface DELETE_START {
    type: "DELETE_START";
}

interface DELETE_SUCCESS {
    type: "DELETE_SUCCESS";
    payload: number;
}

interface DELETE_ERROR {
    type: "DELETE_ERROR";
}

export type CategoryAction = GET_START | GET_SUCCESS | GET_ERROR | ADD_START | ADD_SUCCESS | ADD_ERROR | EDIT_START | EDIT_SUCCESS | EDIT_ERROR | DELETE_START | DELETE_SUCCESS | DELETE_ERROR;
export type CategoryDispatch = ThunkDispatch<CategoryState, void, CategoryAction>;