import { Dispatch } from 'redux'
import { SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType, setIsInitializedAC } from '../../app/app-reducer'
import { authAPI } from '../../api/todolists-api'
import { handleServerNetworkError } from '../../utils/error-utils'
import { handleServerAppError } from '../../utils/error-utils'

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return { ...state, isLoggedIn: action.value }
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({ type: 'login/SET-IS-LOGGED-IN', value } as const)

// thunks
export const loginTC = (data: LoginType) =>
    async (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))

        try {
            const res = await authAPI.login(data)

            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                console.log(res.data.data.userId); // debug
            } else {
                handleServerAppError(res.data, dispatch)
            }

        } catch (error) {
            handleServerNetworkError((error as any).message, dispatch)

        } finally {
            dispatch(setAppStatusAC('idle'))
        }
    }

export const meTC = () =>
    async (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))

        try {
            const res = await authAPI.me()

            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
            } else {
                // handleServerAppError(res.data, dispatch)
            }

        } catch (error) {
            handleServerNetworkError((error as any).message, dispatch)

        } finally {
            dispatch(setAppStatusAC('idle'))
            dispatch(setIsInitializedAC(true))
        }
    }

export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType | SetAppErrorActionType

export type LoginType = {
    email: string,
    password: string,
    rememberMe: boolean
}

