import React, {FC, useEffect, useState} from 'react';
import styles from './PopupSuccess.module.scss'
import PopupLayout from '../PopupLayout/PopupLayout';
import {useTypedDispatch} from "../../../hooks/useTypedDispatch";
import {popupActions} from "../../../store/Popup/popupSlice";
import {RootState} from "../../../store/store";
import {useSelector} from 'react-redux';
// @ts-ignore
import soundConnect from "../../../public/sounds/success-mint.mp3";
import {useCustomSound} from "../../../hooks/useCustomSound";
import PopupSuccessGallery from "./PopupSuccessGallery";
import {getImagesMintedNfts} from "../../../api/api";
import {textsForPopupSuccess} from "./const";
import {getRandomInt} from "../../../helpers/utils";

interface PopupLayoutProps {
    onClose: () => void
}

const PopupSuccess: FC<PopupLayoutProps> = ({onClose}) => {
    const dispatch = useTypedDispatch()
    const amountMintedNfts = useSelector((state: RootState) => state.popup.amountMintedNfts)
    const [imagesMintedNfts, setImagesMintedNfts] = useState([])
    const {play, stop} = useCustomSound(soundConnect)

    const onClickButton = () => {
        dispatch(popupActions.changeCurrentPopup(null))
    }

    const fetchImagesMintedNfts = async () => {
        const images = await getImagesMintedNfts(amountMintedNfts[0], amountMintedNfts.length)
        console.log('images', images);

        if (images && Array.isArray(images)) {
            setImagesMintedNfts(images)
        }

        return images
    }

    useEffect(() => {
        if (amountMintedNfts?.length === 0) {
            return
        }

        void fetchImagesMintedNfts()

        const timer = setInterval(async () => {
            if (imagesMintedNfts.length > 0) {
                clearInterval(timer)
                return
            }

            const images = await fetchImagesMintedNfts()

            if (images) {
                clearInterval(timer)
            }
        }, 8000)

        return () => {
            clearTimeout(timer)
        }
    }, [amountMintedNfts])

    useEffect(() => {
        play()

        return () => {
            stop()
        }
    }, [play])

    const getRandomText = () => {
        const max = textsForPopupSuccess.length
        const index = getRandomInt(0, max)
        return textsForPopupSuccess[index]
    }

    return (
        <PopupLayout onClose={onClose} className={styles.popup}>
            <div className={styles.title}>AAAAAAAAAAAARGH!</div>
            {
                imagesMintedNfts.length > 0
                    ? <PopupSuccessGallery
                        className={styles.logo}
                        mintedImages={imagesMintedNfts}
                    />
                    : <span className={styles.loadingGallery}>Loading NFTs...</span>
            }
            <div className={styles.description}>
                You’ve got <span className={styles.mark}>
                {amountMintedNfts?.length && amountMintedNfts.length}
                </span> dose of pAIn. {getRandomText()}
            </div>
            <button onClick={onClickButton} className={styles.button}>
                Ouch!
            </button>

            <div onClick={onClose} className={styles.close}/>
        </PopupLayout>
    )
}

export default PopupSuccess

