import React, {memo, useEffect, useState} from 'react';
import styles from './SpeedometerInfo.module.scss'

interface SpeedometerInfoProps {
    changePrice?: number | string
    ethPrice?: number
}

const SpeedometerInfo = memo((props: SpeedometerInfoProps) => {
    const {changePrice, ethPrice} = props
    const [status, setStatus] = useState('')

    useEffect(() => {
        if (changePrice <= -15) {
            setStatus('excruciating pain')
        } else if (changePrice <= -10) {
            setStatus('severe pain')
        } else if (changePrice <= -5) {
            setStatus('moderate pain')
        } else if (changePrice < 0) {
            setStatus('mild pain')
        } else if (changePrice >= 0) {
            // setStatus('')
            setStatus('')
        }
    }, [changePrice])

    return (
        <div className={styles.info}>
            <span className={styles.title}>{status}</span>

            <div className={styles.infoTime}>
                <span className={styles.text}>24h change:</span>
                <span className={styles.percent}>
                    {changePrice ? `${changePrice} %` : 'Loading...'}
                </span>
            </div>

            <span className={styles.price}>
                eth price: <span className={styles.mark}>
                {ethPrice ? `$${ethPrice.toFixed(0)}` : 'Loading...'}
                </span>
            </span>
        </div>
    )
})

SpeedometerInfo.displayName = 'SpeedometerInfo'

export default SpeedometerInfo
