import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
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
import axios from 'axios';
import {urlApi} from "../../../const/urlApi";
import {MutableRef} from "preact/hooks";
import {getImagesMintedNfts} from "../../../api/api";

interface PopupLayoutProps {
    onClose: () => void
}

const PopupSuccess: FC<PopupLayoutProps> = ({onClose}) => {
    const dispatch = useTypedDispatch()
    const amountMintedNfts = useSelector((state: RootState) => state.popup.amountMintedNfts)
    const [imagesMintedNfts, setImagesMintedNfts] = useState([])
    const refTimer = useRef() as MutableRef<NodeJS.Timeout>
    const {play, stop} = useCustomSound(soundConnect)

    const onClickButton = () => {
        dispatch(popupActions.changeCurrentPopup(null))
    }

    const fetchImagesById = async () => {
        try {
            if (amountMintedNfts?.length === 0) {
                return
            }
            const {data: images} = await axios.get(`${urlApi}/get-images?tokenId=${amountMintedNfts[0]}&numberOfTokens=${amountMintedNfts.length}`)
            console.log('amountMintedNfts', amountMintedNfts)
            console.log('images', images)

            if (images && Array.isArray(images)) {
                setImagesMintedNfts(images)
            } else {
                refTimer.current = setTimeout(() => {
                    fetchImagesById()
                }, 7500)
            }
        } catch {
            refTimer.current = setTimeout(() => {
                fetchImagesById()
            }, 7500)
        }
    }

    useEffect(() => {
        // void fetchImagesById()
        if (amountMintedNfts?.length === 0) {
            return
        }
        const timer = setInterval(async () => {
            // const response = await axios.get(`${urlApi}/get-images?tokenId=${amountMintedNfts[0]}&numberOfTokens=${amountMintedNfts.length}`)
            const images = await getImagesMintedNfts(amountMintedNfts[0], amountMintedNfts.length)
            console.log('amountMintedNfts', amountMintedNfts)
            console.log('images', images)

            if (images && Array.isArray(images)) {
                setImagesMintedNfts(images)
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

    return (
        <PopupLayout onClose={onClose} className={styles.popup}>
            <div className={styles.title}>Congratulations!</div>
            {/*<img className={styles.logo} src="/images/logo-2.jpg" alt="PAIN"/>*/}
            {
                imagesMintedNfts.length > 0
                    ? <PopupSuccessGallery
                        className={styles.logo}
                        mintedImages={imagesMintedNfts}
                    />
                    : <span className={styles.loadingGallery}>Loading NFTs...</span>
            }
            <div className={styles.description}>
                You have succesfully purchased <span className={styles.mark}>
                {amountMintedNfts.length}
                </span> PAIN NFTs!
            </div>
            <button onClick={onClickButton} className={styles.button}>
                Cool
            </button>

            <div onClick={onClose} className={styles.close}/>
        </PopupLayout>
    )
}

export default PopupSuccess

