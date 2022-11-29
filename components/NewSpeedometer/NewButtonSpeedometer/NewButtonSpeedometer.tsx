import React, {memo, useEffect} from 'react';
import styles from "./NewButtonSpeedometer.module.scss";
import {useAccount, useContractRead} from 'wagmi';
import {useSelector} from "react-redux";
import classNames from 'classnames';

import {useConnectModal} from "@rainbow-me/rainbowkit";
import {RootState} from "../../../store/store";
import {useTypedDispatch} from "../../../hooks/useTypedDispatch";
import {useHover} from "../../../hooks/useHover";
import {generateContractPainSetting} from "../../../blockchain/utils";
import {formatEther} from "../../../helpers/utils";
import {fetchWhitelistSignature} from "../../Speedometer/model/services/fetchWhitelistSignature";
import { popupActions } from '../../../store/Popup/popupSlice';
import {svgButton, svgButtonWithoutShadow } from '../../Speedometer/ui/SpeedometerButtonMint/svgButton';

interface SpeedometerButtonMintProps {
    changePrice?: number
}

const NewButtonSpeedometer = memo((props: SpeedometerButtonMintProps) => {
    const {changePrice} = props
    const dispatch = useTypedDispatch()
    const signature = useSelector((state: RootState) => state.speedometer?.signature)
    const {address} = useAccount()
    const {openConnectModal} = useConnectModal();
    const [isHover, bindHover] = useHover()

    const {
        data: canFreeMint,
        isLoading: isLoadingCanFreeMint
    } = useContractRead(generateContractPainSetting('canFreeMint', {
        args: signature && address && [signature, address],
    }))

    const {data: mintPrice, isLoading: isLoadingMintPrice} = useContractRead(generateContractPainSetting('MINT_PRICE', {
        select: (data) => +formatEther(data)
    }))

    useEffect(() => {
        if (address) {
            dispatch(fetchWhitelistSignature(address))
        }
    }, [address])

    const openModalMint = () => {
        if (!changePrice || changePrice >= 0) {
            return
        }
        if (!address) {
            openConnectModal()
            return
        }
        dispatch(popupActions.changeCurrentPopup('mint'))
    }

    return (
        <div onClick={openModalMint} className={classNames(styles.buttonMint, {
            [styles.disable]: !changePrice || changePrice >= 0
        })}>
            <div {...bindHover} className={styles.wrapperButton}>
                {
                    isHover
                        ? svgButtonWithoutShadow
                        : svgButton
                }

                <span className={styles.text}>
                    {
                        canFreeMint
                            ? 'FREE MINT'
                            : 'MINT PAIN'
                    }
                </span>

            </div>

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

NewButtonSpeedometer.displayName = 'SpeedometerButtonMint'

export default NewButtonSpeedometer
