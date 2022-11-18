import styles from './Speedometer.module.scss'
import {memo, useEffect, useState} from "react"
import SpeedometerParts from "../SpeedometerParts/SpeedometerParts";
import SpeedometerProgressSupply from "../SpeedometerProgressSupply/SpeedometerProgressSupply";
import SpeedometerPercents from "../SpeedometerPercents/SpeedometerPercents";
import SpeedometerInfo from "../SpeedometerInfo/SpeedometerInfo";
import SpeedometerButtonMint from '../SpeedometerButtonMint/SpeedometerButtonMint';
import SpeedometerArrow from "../SpeedometerArrow/SpeedometerArrow";
import {useTypedDispatch} from "../../../../hooks/useTypedDispatch";
import {fetchStats} from "../../model/services/fetchStats";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {useContractRead} from "wagmi";
import {generateContractPainSetting} from "../../../../blockchain/utils";
import {fetchCurrentRound} from "../../model/services/fetchCurrentRound";
import {formatEther, toWei} from '../../../../helpers/utils';

// const mainProgress = 0.74

export const Speedometer = memo(() => {
    const stats = useSelector((state: RootState) => state.speedometer?.stats)
    const dispatch = useTypedDispatch()
    const [progress, setProgress] = useState(0)
    const currentRound = useSelector((state: RootState) => state.speedometer?.currentRound)
    const {data: changePrice}: Pick<{ data: number }, any> = useContractRead(generateContractPainSetting('getDiff', {
        args: currentRound && currentRound,
        enabled: currentRound,
        select: (data) => +(data.map(data => toWei(formatEther(data)))[0] / 100 * -1).toFixed(2)
    }))

    useEffect(() => {
        dispatch(fetchCurrentRound())
        dispatch(fetchStats())
    }, [])

    useEffect(() => {
        setProgress(changePrice)
    }, [changePrice])

    // useEffect(() => {
    //     if (!changePrice) {
    //         return
    //     }
    //     const timer = setInterval(() => {
    //         setProgress(prev => {
    //             const isStopUpdateProgress = changePrice >= 0
    //                 ? prev >= changePrice
    //                 : prev <= changePrice
    //             if (isStopUpdateProgress) {
    //                 clearInterval(timer)
    //                 return prev
    //             }
    //             const additionalInterval = +(changePrice / 50).toFixed(2)
    //             return +(prev + additionalInterval).toFixed(2)
    //         })
    //     }, 100)
    //
    //     return () => clearInterval(timer)
    // }, [changePrice])

    return (
        <div className={styles.speedometer}>
            <SpeedometerParts
                progress={progress}
            />
            <SpeedometerProgressSupply/>
            <SpeedometerPercents />
            <SpeedometerInfo ethPrice={stats?.eth} changePrice={changePrice}/>
            <SpeedometerButtonMint changePrice={changePrice}/>
            <SpeedometerArrow progress={progress} />
        </div>
    )
})