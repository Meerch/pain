import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../store/store'
import {alertsActions, AlertType} from '../../store/Alerts/AlertsSlice'
import {svgAlertError, svgAlertProcess, svgAlertSuccess} from './svg'
import styles from './Alerts.module.scss'
import classNames from "classnames";

const Alerts = () => {
    const alerts = useSelector((state: RootState) => state?.alerts?.alerts)
    const dispatch = useDispatch()

    const onDeleteAlert = (id: string | number) => {
        dispatch(alertsActions.deleteAlert(id))
    }

    useEffect(() => {
        const deletedAlertId = alerts[alerts.length - 1]?.id || false

        if (deletedAlertId && alerts.length > 0) {
            setTimeout(() => {
                onDeleteAlert(deletedAlertId)
            }, 7000)
        }
    }, [alerts])

    return (
        <div className={styles.alerts}>
            {
                alerts && alerts.map(({type, text, id}) => (
                    <div
                        key={id}
                        className={classNames(styles.alert, styles[type])}
                    >
                        <div className={styles.info}>
                            {
                                type === AlertType.SUCCESS && svgAlertSuccess
                            }
                            {
                                type === AlertType.PROCESS && svgAlertProcess
                            }
                            {
                                type === AlertType.ERROR && svgAlertError
                            }

                            <span className={styles.text}>{text}</span>
                        </div>
                        <div
                            onClick={() => onDeleteAlert(id)}
                            className={styles.close}
                        />
                    </div>
                ))
            }
        </div>
    )
}

export default Alerts