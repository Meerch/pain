import React, {memo, useEffect, useState} from 'react';
import styles from "./SpeedometerButton.module.scss";
import {useAccount, useContractRead, useNetwork, useSwitchNetwork} from 'wagmi';
import {useSelector} from "react-redux";
import classNames from 'classnames';

import {useConnectModal} from "@rainbow-me/rainbowkit";
import {RootState} from "../../../../store/store";
import {useTypedDispatch} from "../../../../hooks/useTypedDispatch";
import {useHover} from "../../../../hooks/useHover";
import {generateContractPainSetting} from "../../../../blockchain/utils";
import {formatEther, toWei} from "../../../../helpers/utils";
import {fetchWhitelistSignature} from "../../model/services/fetchWhitelistSignature";
import {popupActions} from '../../../../store/Popup/popupSlice';
import {
    svgButton,
    svgButtonFreeMint, svgButtonFreeMintWithoutShadow,
    svgButtonWithoutShadow
} from './svgButton';
import {chainId} from "../../../../blockchain/config";
import {useAlert} from "../../../Alerts/useAlert";

interface SpeedometerButtonMintProps {
    changePrice?: number
}

const SpeedometerButton = memo((props: SpeedometerButtonMintProps) => {
    const {changePrice} = props
    const dispatch = useTypedDispatch()
    const signature = useSelector((state: RootState) => state.speedometer?.signature)
    const amountToMint = useSelector((state: RootState) => state.speedometer?.amountToMint)
    const amountMintedNfts = useSelector((state: RootState) => state.popup?.amountMintedNfts)
    const {address} = useAccount()
    const {openConnectModal} = useConnectModal();
    const [isHover, bindHover] = useHover()
    const [isHoverFreeMint, bindHoverFreeMint] = useHover()
    const { chain } = useNetwork()
    const { switchNetwork } = useSwitchNetwork()
    const {data: isPreSale} = useContractRead(generateContractPainSetting('isPreSale', {}))
    const {data: isPublicSale} = useContractRead(generateContractPainSetting('isPublicSale', {}))
    const {onAlertError} = useAlert()
    const [amountMaxFreeMint, setAmountMaxFreeMint] = useState(amountToMint)

    const [supplies, setSupplies] = useState([])
    const commonSupply = supplies.length > 0 ? supplies.reduce((a, b) => a + b) : 0

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
    }, [changePrice, supplies])


    const {
        data: canFreeMint,
        isLoading: isLoadingCanFreeMint,
        refetch: refetchCanFreeMint
    } = useContractRead(generateContractPainSetting('canFreeMint', {
        args: [amountToMint, signature, address],
        enabled: signature && amountToMint && address,
        onError: err => console.log('error can free mint', err)
    }))

    const {data: mintPrice, isLoading: isLoadingMintPrice} = useContractRead(generateContractPainSetting('MINT_PRICE', {
        select: (data) => +formatEther(data)
    }))

    useEffect(() => {
        void refetchCanFreeMint()
    }, [amountMintedNfts])

    useEffect(() => {
        if (address) {
            dispatch(fetchWhitelistSignature(address))
            void refetchCanFreeMint()
        }
    }, [address])

    const openModalMint = (type: 'paid' | 'free') => () => {
        if (!changePrice || changePrice >= 0) {
            onAlertError('ETH price is change is positive')
            return
        }

        if (supplies[activePanel] === 0) {
            onAlertError('This level of pain is minted out')
            return
        }

        if (!address) {
            openConnectModal()
            return
        }

        if (chain && chain.id !== chainId) {
            switchNetwork?.(chainId)
            return
        }

        if (type === 'paid' && !isPublicSale) {
            onAlertError('Mint temporary paused')
            return
        } else if (type === 'free' && !isPreSale) {
            onAlertError('Free mint temporary paused')
            return
        }

        if (type === 'free' && commonSupply < amountToMint) {
            return
        }

        dispatch(popupActions.setSelectedTypeMint(type))
        dispatch(popupActions.changeCurrentPopup('mint'))
    }

    useEffect(() => {
        if (supplies[activePanel] < amountToMint) {
            setAmountMaxFreeMint(supplies[activePanel])
        }
    }, [supplies, activePanel])


    const isDisabledButtonMint = !changePrice || changePrice >= 0 || supplies[activePanel] === 0

    return (
        <div className={classNames(styles.buttonMint, {
            [styles.disable]: !changePrice || changePrice >= 0 || supplies[activePanel] === 0
        })}>
            <div
                onClick={openModalMint('paid')}
                className={classNames(styles.wrapperButton, {
                    [styles.disable]: isDisabledButtonMint || !isPublicSale
                })}
                {...bindHover}
            >
                {
                    isHover
                        ? svgButtonWithoutShadow
                        : svgButton
                }

                <span className={styles.text}>
                   MINT PAIN
                </span>
            </div>

            {
                amountToMint > 0 && commonSupply >= amountToMint && canFreeMint &&
                <div
                    onClick={openModalMint('free')}
                    className={classNames(styles.wrapperButton, styles.wrapperButtonFree, {
                        [styles.disable]: isDisabledButtonMint || !isPreSale
                    })}
                    {...bindHoverFreeMint}
                >
                    {
                        isHoverFreeMint
                            ? svgButtonFreeMintWithoutShadow
                            : svgButtonFreeMint
                    }

                    <span className={styles.text}>
                        claim <br/> FREE mint
                    </span>

                    <span className={styles.available}>
                    {amountMaxFreeMint ?? amountToMint ?? 0} available
                    </span>
                </div>
            }

            <span className={styles.price}>
                 {
                     isLoadingMintPrice || !mintPrice
                         ? 'Loading...'
                         : `mint price: ${mintPrice} eth`
                 }
            </span>
        </div>
    );
})

SpeedometerButton.displayName = 'SpeedometerButtonMint'

export default SpeedometerButton
