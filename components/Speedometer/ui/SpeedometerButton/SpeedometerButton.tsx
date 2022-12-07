import React, {memo, useEffect} from 'react';
import styles from "./SpeedometerButton.module.scss";
import {useAccount, useContractRead} from 'wagmi';
import {useSelector} from "react-redux";
import classNames from 'classnames';

import {useConnectModal} from "@rainbow-me/rainbowkit";
import {RootState} from "../../../../store/store";
import {useTypedDispatch} from "../../../../hooks/useTypedDispatch";
import {useHover} from "../../../../hooks/useHover";
import {generateContractPainSetting} from "../../../../blockchain/utils";
import {formatEther} from "../../../../helpers/utils";
import {fetchWhitelistSignature} from "../../model/services/fetchWhitelistSignature";
import {popupActions} from '../../../../store/Popup/popupSlice';
import {
    svgButton,
    svgButtonFreeMint, svgButtonFreeMintWithoutShadow,
    svgButtonWithoutShadow
} from './svgButton';

interface SpeedometerButtonMintProps {
    changePrice?: number
}

const SpeedometerButton = memo((props: SpeedometerButtonMintProps) => {
    const {changePrice} = props
    const dispatch = useTypedDispatch()
    const signature = useSelector((state: RootState) => state.speedometer?.signature)
    const amountToMint = useSelector((state: RootState) => state.speedometer?.amountToMint)
    const {address} = useAccount()
    const {openConnectModal} = useConnectModal();
    const [isHover, bindHover] = useHover()
    const [isHoverFreeMint, bindHoverFreeMint] = useHover()

    const {
        data: canFreeMint,
        isLoading: isLoadingCanFreeMint
    } = useContractRead(generateContractPainSetting('canFreeMint', {
        args: signature && address && [amountToMint, signature, address],
        onError: err => console.log('error can free mint', err)
    }))

    const {data: mintPrice, isLoading: isLoadingMintPrice} = useContractRead(generateContractPainSetting('MINT_PRICE', {
        select: (data) => +formatEther(data)
    }))

    useEffect(() => {
        if (address) {
            dispatch(fetchWhitelistSignature(address))
        }
    }, [address])

    const openModalMint = (type: 'paid' | 'free') => () => {
        if (!changePrice || changePrice >= 0) {
            return
        }
        if (!address) {
            openConnectModal()
            return
        }

        dispatch(popupActions.setSelectedTypeMint(type))
        dispatch(popupActions.changeCurrentPopup('mint'))
    }

    return (
        <div className={classNames(styles.buttonMint, {
            [styles.disable]: !changePrice || changePrice >= 0
        })}>
            <div
                onClick={openModalMint('paid')}
                className={styles.wrapperButton}
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
                amountToMint > 0 && canFreeMint &&
                <div
                    onClick={openModalMint('free')}
                    className={classNames(styles.wrapperButton, styles.wrapperButtonFree)}
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
                    {amountToMint ?? 0} available
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
