import {useDispatch} from "react-redux"
import {alertsActions, AlertType} from "../../store/Alerts/AlertsSlice"

export const useAlert = () => {
    const dispatch = useDispatch()

    const onAlert = (type: AlertType, text: string) => {
        dispatch(alertsActions.addAlert({type, text}))
    }

    const onAlertSuccess = (text: string = 'Success') => {
        onAlert(AlertType.SUCCESS, text)
    }

    const onAlertError = (text: string = 'Error') => {
        onAlert(AlertType.ERROR, text)
    }

    const onAlertProcess = (text: string = 'Processing') => {
        onAlert(AlertType.PROCESS, text)
    }


    return { onAlertSuccess, onAlertError, onAlertProcess }
}