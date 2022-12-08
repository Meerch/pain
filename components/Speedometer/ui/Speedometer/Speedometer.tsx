import React, {useEffect, useMemo, useState} from 'react';
import styles from './Speedometer.module.scss'
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {useTypedDispatch} from "../../../../hooks/useTypedDispatch";
import {useContractRead} from "wagmi";
import {generateContractPainSetting} from "../../../../blockchain/utils";
import {formatEther, toWei} from "../../../../helpers/utils";
import {fetchCurrentRound} from "../../model/services/fetchCurrentRound";
import {fetchStats} from "../../model/services/fetchStats";
import SpeedometerArrow from "../SpeedometerArrow/SpeedometerArrow";
import SpeedometerButton from "../SpeedometerButton/SpeedometerButton";
import SpeedometerProgressSupply from "../SpeedometerProgressSupply/SpeedometerProgressSupply";
import { stagesSpeedometer } from '../../model/const/parts';
import SpeedometerInfo from "../SpeedometerInfo/SpeedometerInfo";

const Speedometer = () => {
    const stats = useSelector((state: RootState) => state.speedometer?.stats)
    const dispatch = useTypedDispatch()
    const [progress, setProgress] = useState(0)
    const currentRound = useSelector((state: RootState) => state.speedometer?.currentRound)
    const {data: changePrice}: Pick<{ data: number }, any> = useContractRead(generateContractPainSetting('getDiff', {
        args: currentRound,
        enabled: currentRound,
        onError: err => console.log('getDiff speedometer', err),
        select: (data) => +(data.map(data => toWei(formatEther(data)))[0] / 100 * -1).toFixed(2)
    }))

    useEffect(() => {
        dispatch(fetchCurrentRound())
        dispatch(fetchStats())
    }, [])

    useEffect(() => {
        setProgress(changePrice)
    }, [changePrice])

    const currentStageSpeedometer = useMemo(() => {
        const clone = [...stagesSpeedometer]
        return clone.reverse().find(stage => {
            return stage.isActive(progress)
        })
    }, [progress])

    return (
        <div className={styles.speedometer}>
            <img
                className={styles.speedometerImage}
                src={currentStageSpeedometer.image}
                alt="speedometer"
            />

            <SpeedometerArrow progress={progress}/>
            <SpeedometerInfo
                ethPrice={stats?.eth}
                changePrice={changePrice}
            />
            <SpeedometerButton changePrice={changePrice}/>
            <SpeedometerProgressSupply />
        </div>
    );
};

export default Speedometer;
