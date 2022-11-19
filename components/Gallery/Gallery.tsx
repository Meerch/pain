import {splitHalfPhotos} from "./utils";
import styles from './Gallery.module.scss'
import React, {memo, useEffect, useRef, useState} from "react";
import classNames from "classnames"
import {photos} from "./constants";
import {useDetectDevice} from "../../hooks/useDetectDevice";
import {useCustomSound} from "../../hooks/useCustomSound";
// @ts-ignore
import sound1 from '../../public/sounds/hoverGalleryCard/sound-1.mp3'
// @ts-ignore
import sound2 from '../../public/sounds/hoverGalleryCard/sound-2.mp3'
// @ts-ignore
import sound3 from '../../public/sounds/hoverGalleryCard/sound-3.mp3'
// @ts-ignore
import sound4 from '../../public/sounds/hoverGalleryCard/sound-4.mp3'
import {useHover} from "../../hooks/useHover";

const sounds = [sound1, sound2, sound3, sound4]

const Gallery = memo(() => {
    // const [isDesktop, setIsDesktop] = useState(true)
    const {isDesktop, isMobile} = useDetectDevice()
    const [currentSound, setCurrentSound] = useState(0)
    const {play: play1} = useCustomSound(sound1, {volume: 0.3})
    const {play: play2} = useCustomSound(sound2, {volume: 0.3})
    const {play: play3} = useCustomSound(sound3, {volume: 0.3})
    const {play: play4} = useCustomSound(sound4, {volume: 0.3})
    const [isHover, bindHover] = useHover()
    const sounds = [play1, play2, play3, play4]

    useEffect(() => {
        if (isHover) {
            sounds[currentSound]?.()
        } else {
            setCurrentSound(prev => prev === sounds.length - 1 ? 0 : prev + 1)
        }
    }, [isHover, play1, play2, play3, play4])

    return (
        <div className={styles.gallery}>
            <div className={styles.wrapper}>
                <div className={styles.photosBar}>
                    {
                        (isDesktop ? photos : splitHalfPhotos(1)).map((photoUrl) => (
                            <div  key={photoUrl} className={classNames(styles.photoBar)}>
                                <img
                                    {...bindHover}
                                    className={styles.image}
                                    src={photoUrl}
                                    alt="photo nft"
                                />
                            </div>
                        ))
                    }
                </div>

                <div className={styles.photosBar}>
                    {
                        (isDesktop ? photos : splitHalfPhotos(1)).map((photoUrl) => (
                            <div  key={photoUrl} className={classNames(styles.photoBar, {
                                [styles.mobile]: !isDesktop
                            })}>
                                <img
                                    {...bindHover}
                                    className={styles.image}
                                    src={photoUrl}
                                    alt="photo nft"
                                />
                            </div>
                        ))
                    }
                </div>
            </div>


            {
                isMobile &&
                <div className={styles.wrapper}>
                    <div className={classNames(styles.photosBar, styles.mobilePhotosBar)}>
                        {
                            splitHalfPhotos(2).map((photoUrl) => (
                                <div key={photoUrl}
                                     className={classNames(styles.photoBar, styles.mobilePhotoBar)}>
                                    <img
                                        {...bindHover}
                                        className={styles.image}
                                        src={photoUrl}
                                        alt="photo nft"
                                    />
                                </div>
                            ))
                        }
                    </div>
                    <div className={classNames(styles.photosBar, styles.mobilePhotosBar)}>
                        {
                            splitHalfPhotos(2).map((photoUrl) => (
                                <div  key={photoUrl}
                                     className={classNames(styles.photoBar, styles.mobilePhotoBar)}>
                                    <img
                                        {...bindHover}
                                        className={styles.image}
                                        src={photoUrl}
                                        alt="photo nft"
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
            }
        </div>
    );
})

Gallery.displayName = 'Gallery'
export default Gallery