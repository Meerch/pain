import React, {memo, useEffect} from 'react';
import styles from "./SpeedometerButtonMint.module.scss";
import {useTypedDispatch} from "../../../../hooks/useTypedDispatch";
import {popupActions} from "../../../../store/Popup/popupSlice";
import {useAccount, useContractRead} from 'wagmi';
import {generateContractPainSetting} from '../../../../blockchain/utils';
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {fetchWhitelistSignature} from "../../model/services/fetchWhitelistSignature";
import classNames from 'classnames';
import {formatEther} from "../../../../helpers/utils";
import {useHover} from "../../../../hooks/useHover";
import {svgButton, svgButtonWithoutShadow} from "./svgButton";

interface SpeedometerButtonMintProps {
    changePrice?: number
}

const SpeedometerButtonMint = memo((props: SpeedometerButtonMintProps) => {
    const {changePrice} = props
    const dispatch = useTypedDispatch()
    const signature = useSelector((state: RootState) => state.speedometer?.signature)
    const {address} = useAccount()
    const [isHover, bindHover] = useHover()

    const {
        data: canFreeMint,
        isLoading: isLoadingCanFreeMint
    } = useContractRead(generateContractPainSetting('canFreeMint', {
        args: signature && address && [signature, address],
        onSuccess: data => console.log('canFreeMint', data)
        // select: (data) => +(data.map(data => toWei(formatEther(data)))[0] / 100 * -1).toFixed(2)
    }))

    const {data: mintPrice, isLoading: isLoadingMintPrice} = useContractRead(generateContractPainSetting('MINT_PRICE', {
        select: (data) => +formatEther(data)
    }))

    // const {data: changePrice, refetch}: Pick<{ data: number }, any> = useContractRead(generateContractPainSetting('canFreeMint', {
    //     args: signature && signature,
    //     onSuccess: data => console.log('canMint', data)
    //     // select: (data) => +(data.map(data => toWei(formatEther(data)))[0] / 100 * -1).toFixed(2)
    // }))

    useEffect(() => {
        console.log(address)
        if (address) {
            dispatch(fetchWhitelistSignature(address))
        }
    }, [address])

    const openModalMint = () => {
        if (!changePrice || changePrice >= 0 || !address) {
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

SpeedometerButtonMint.displayName = 'SpeedometerButtonMint'

export default SpeedometerButtonMint;
