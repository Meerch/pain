import React, {FC, useEffect} from 'react';
import styles from './PopupSuccess.module.scss'
import PopupLayout from '../PopupLayout/PopupLayout';
import {useTypedDispatch} from "../../../hooks/useTypedDispatch";
import {popupActions} from "../../../store/Popup/popupSlice";
import {RootState} from "../../../store/store";
import { useSelector } from 'react-redux';
import useSound from "use-sound";
// @ts-ignore
import soundConnect from "../../../public/sounds/success-mint.mp3";

interface PopupLayoutProps {
    onClose: () => void
}

const PopupSuccess: FC<PopupLayoutProps> = ({onClose}) => {
    const dispatch = useTypedDispatch()
    const amountMintedNfts = useSelector((state: RootState) => state.popup.amountMintedNfts)
    const [play, {stop}] = useSound(soundConnect)

    const onClickButton = () => {
        dispatch(popupActions.changeCurrentPopup(null))
    }

    useEffect(() => {
        play()

        return () => {
            stop()
        }
    }, [play])

    return (
        <PopupLayout onClose={onClose} className={styles.popup}>
            <img className={styles.logo} src="/images/logo-2.jpg" alt="PAIN"/>
            <div className={styles.title}>Congratulations!</div>
            <div className={styles.description}>You have succesfully purchased <span className={styles.mark}>{amountMintedNfts}</span> PAIN NFTs!</div>
            <button onClick={onClickButton} className={styles.button}>
                Cool
            </button>

            <div onClick={onClose} className={styles.close}/>
        </PopupLayout>
    );
};

export default PopupSuccess

