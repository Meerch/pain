import React, {useEffect, useMemo, useState} from 'react';
import styles from './NewSpeedometer.module.scss'
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {useTypedDispatch} from "../../hooks/useTypedDispatch";
import {useContractRead} from "wagmi";
import {generateContractPainSetting} from "../../blockchain/utils";
import {formatEther, toWei} from "../../helpers/utils";
import {fetchCurrentRound} from "../Speedometer/model/services/fetchCurrentRound";
import {fetchStats} from "../Speedometer/model/services/fetchStats";
import NewArrowSpeedometer from "./NewArrowSpeedometer/NewArrowSpeedometer";
import NewInfoSpeedometer from "./NewInfoSpeedometer/NewInfoSpeedometer";
import NewButtonSpeedometer from "./NewButtonSpeedometer/NewButtonSpeedometer";
import NewProgressSupplySpeedometer from "./NewProgressSupplySpeedometer/NewProgressSupplySpeedometer";

const stagesSpeedometer = [
    {
        id: 0,
        isActive: (progress: number) => true,
        image: "/images/steps-speedometer/stage-1.png"
    },
    {
        id: 1,
        isActive: (progress: number) => progress < 0,
        image: "/images/steps-speedometer/stage-2.png"
    },
    {
        id: 2,
        isActive: (progress: number) => progress <= -5,
        image: "/images/steps-speedometer/stage-3.png"
    },
    {
        id: 3,
        isActive: (progress: number) => progress <= -10,
        image: "/images/steps-speedometer/stage-4.png"
    },
    {
        id: 4,
        isActive: (progress: number) => progress <= -15,
        image: "/images/steps-speedometer/stage-5.png"
    },
    {
        id: 4,
        isActive: (progress: number) => progress < -20,
        image: "/images/steps-speedometer/stage-6.png"
    }
]

const NewSpeedometer = () => {
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

            <NewArrowSpeedometer progress={progress}/>
            <NewInfoSpeedometer
                ethPrice={stats?.eth}
                changePrice={changePrice}
            />
            <NewButtonSpeedometer changePrice={changePrice}/>
            <NewProgressSupplySpeedometer />
        </div>
    );
};

export default NewSpeedometer;
