import { Category, CategoryDispatch, CategoryForm } from "../../types/category";
import api from "../../utils/api"

export const getCategories = () => async (dispatch: CategoryDispatch) => {
    dispatch({ type: "GET_START"});
    try {
        const response = await api().get<Category[]>("/categories");
        dispatch({ type: "GET_SUCCESS", payload: response.data})
    } catch {
        dispatch({ type: "GET_ERROR"})
    }
}

export const addCategory = (form: CategoryForm) => async (dispatch: CategoryDispatch) => {
    dispatch({ type: "ADD_START" });
    try {
        const response = await api().post<Category>("/categories", form);
        dispatch({ type: "ADD_SUCCESS", payload: response.data })
    } catch {
        dispatch({ type: "ADD_ERROR" })   
    }
}

export const editCategory = (form: CategoryForm ,id: number) => async (dispatch: CategoryDispatch) => {
    dispatch({ type: 'EDIT_START' })
    try {
        const response = await api().put<Category>(`categories/${id}`, form)
        dispatch({ type: 'EDIT_SUCCESS', payload: response.data})
    } catch {
        dispatch({ type: 'EDIT_ERROR'})
    }
}

export const deleteCategory = (id: number)=> async (dispatch: CategoryDispatch)=> {
    dispatch({type: 'DELETE_START'})
    try {
        await api().delete<Category>(`categories/${id}`);
        dispatch({type: 'DELETE_SUCCESS', payload: id})
    } catch {
        dispatch({type:'DELETE_ERROR'})
    }
}