import { LoginForm, User, UserDispatch } from "../../types/user";
import api from "../../utils/api"

export const login = (creds: LoginForm) => async (dispatch: UserDispatch) => {
    dispatch({type: "LOGIN_ERROR"});
    try{
        const response = await api.post<User>("/users/login", creds);
        dispatch({type: "LOGIN_SUCCESS", payload: response.data})
    } catch {
        dispatch({type: "LOGIN_ERROR"})
    }
}