import styles from './InfoPanels.module.scss'
import classNames from "classnames";
import {useContractRead} from "wagmi";
import {generateContractPainSetting} from "../../blockchain/utils";
import {formatEther, toWei} from "../../helpers/utils";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

const panels = [
    {
        title: 'mild pain',
        change: '-5% <= 24 change < 0',
        supply: 2000
    },
    {
        title: 'moderate pain',
        change: '-10% <= 24 change < -5%',
        supply: 2000
    },
    {
        title: 'severe pain',
        change: '-15% <= 24 change < -10%',
        supply: 2000
    },
    {
        title: 'excruciating pain',
        change: '24 change < -15%',
        supply: 666
    },
]

export const InfoPanels = () => {
    const [supplies, setSupplies] = useState([])
    const currentRound = useSelector((state: RootState) => state.speedometer.currentRound)
    const {data: changePrice}: Pick<{ data: number }, any> = useContractRead(generateContractPainSetting('getDiff', {
        args: currentRound,
        enabled: currentRound,
        select: (data) => +(data.map(data => toWei(formatEther(data)))[0] / 100 * -1).toFixed(2)
    }))
    const [activePanel, setActivePanel] = useState(null)

    const changeSupplies = (index: number, data) => {
        setSupplies(prev => {
            const clone = [...prev]
            clone[index] = data
            return clone
        })
    }

    useContractRead(generateContractPainSetting('availableSupply', {
        args: [0],
        onSuccess: (data) => changeSupplies(0, data),
        select: (data) => toWei(formatEther(data))
    }))
    useContractRead(generateContractPainSetting('availableSupply', {
        args: [1],
        onSuccess: (data) => changeSupplies(1, data),
        select: (data) => toWei(formatEther(data))
    }))
    useContractRead(generateContractPainSetting('availableSupply', {
        args: [2],
        onSuccess: (data) => changeSupplies(2, data),
        select: (data) => toWei(formatEther(data))
    }))
    useContractRead(generateContractPainSetting('availableSupply', {
        args: [3],
        onSuccess: (data) => changeSupplies(3, data),
        select: (data) => toWei(formatEther(data))
    }))

    const calcProgress = (currentSupply: number, maxSupply: number) => {
        return 100 / (maxSupply / currentSupply)
    }

    useEffect(() => {
        if (changePrice <= -15) {
            setActivePanel(3)
        } else if (changePrice <= -10) {
            setActivePanel(2)
        } else if (changePrice <= -5) {
            setActivePanel(1)
        } else if (changePrice < 0) {
            setActivePanel(0)
        } else if (changePrice >= 0) {
            setActivePanel(null)
        }
    }, [changePrice])

    return (
        <div className={styles.infoPanels}>
            {
                panels && panels.map(({title, change, supply}, index) => (
                    <div key={title} className={classNames(styles.infoPanel, {
                        [styles.full]: activePanel === index
                    })}>
                        {activePanel === index && <div className={styles.overlay}/>}
                        <span className={styles.title}>{title}</span>
                        <div className={styles.values}>
                            <span className={styles.change}>{change}</span>

                            <span className={styles.supply}>
                                supply: {supplies[index] !== undefined ? supplies[index] : 'Loading...'} / {supply}
                            </span>
                        </div>
                        <div
                            className={styles.progress}
                            style={{
                                width: `${calcProgress(supplies[index], supply)}%`
                            }}
                        />
                    </div>
                ))
            }
        </div>
    );
};
