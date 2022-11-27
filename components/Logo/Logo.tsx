import styles from './Logo.module.scss'
import {useEffect, useState} from "react";
import {useContractRead} from "wagmi";
import {generateContractPainSetting} from "../../blockchain/utils";
import {formatEther, toWei} from "../../helpers/utils";
// @ts-ignore
import soundHoverLogo from '../../public/sounds/hover-logo.mp3'
import {useHover} from "../../hooks/useHover";
import {useCustomSound} from "../../hooks/useCustomSound";

export const Logo = () => {
    const [supplies, setSupplies] = useState([])
    const {play, stop} = useCustomSound(soundHoverLogo, {
        volume: 0.2
    })
    const [isHover, bindHover] = useHover()


    useEffect(() => {
        if (isHover) {
            play()
        } else {
            stop()
        }
    }, [isHover, play, stop])

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



    return (
        <div className={styles.logo}>
            <span className={styles.ai}>
                6666 AI-Generated<br/>Faces of
            </span>
            <div {...bindHover} className={styles.logoImage}>
                {
                    isHover
                        ? <img
                            src="/images/logo.gif"
                            alt="PAIN"
                        />
                        : <img src="/images/logo.jpg" alt="LOGO"/>
                }
            </div>
            
            <img

                style={{width: '144px'}}
                className={styles.ethereum}
                src="/images/logo-descriptions/ethereum-4x.png"
                alt="on ethereum"
            />
            <div className={styles.status}>
                <span className={styles.title}>Mint start:</span>
                <span className={styles.value}>TBA</span>
            </div>

            <div className={styles.nftMinted}>
                <span className={styles.title}>NFT minted:</span>
                <span className={styles.amount}>
                    {
                        supplies?.length ? 6666 - supplies?.reduce((a, b) => a + b) : 0
                    }
                    /6666
                </span>
            </div>
        </div>
    )
}