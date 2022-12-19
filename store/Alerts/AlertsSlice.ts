import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export enum AlertType {
    SUCCESS = 'success',
    PROCESS = 'process',
    ERROR = 'error'
}

export interface Alert {
    type: AlertType
    text: string
    id?: string | number
}

export interface PopupState {
    alerts: Alert[]
}

const initialState: PopupState = {
    alerts: []
}

export const alertsSlice = createSlice({
    name: 'alertsSlice',
    initialState,
    reducers: {
        addAlert: (state, action: PayloadAction<Alert>) => {
            const {type, text} = action.payload
            const randomId = Math.random()

            state.alerts = [
                ...state.alerts,
                {
                    type,
                    text,
                    id: randomId
                }
            ]
        },
        deleteAlert: (state, action: PayloadAction<string | number>) => {
            const newAlerts = state.alerts.filter(alert => alert.id !== action.payload)

            state.alerts = [...newAlerts]
        }
    },
})

export const { actions: alertsActions } = alertsSlice
export const { reducer: alertsReducer} = alertsSlice