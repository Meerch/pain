import {splitHalfPhotos} from "./utils";
import styles from './Gallery.module.scss'
import React, {useEffect, useRef, useState} from "react";
import classNames from "classnames"
import {photos} from "./constants";


export const Gallery = () => {
    const [isDesktop, setIsDesktop] = useState(true)
    const refMainBar = useRef<HTMLDivElement | null>(null)
    const refMobileBar = useRef<HTMLDivElement | null>(null)


    useEffect(() => {
        if (window === undefined) {
            return
        }

        if (window.screen.width < 1280) {
            setIsDesktop(false)
        }
    }, [])

    return (
        <div className={styles.gallery}>
            <div className={styles.wrapper}>
                <div ref={refMainBar} className={styles.photosBar}>
                    {
                        (isDesktop ? photos : splitHalfPhotos(1)).map((photoUrl) => (
                            <div key={photoUrl} className={classNames(styles.photoBar, {
                                [styles.mobile]: !isDesktop
                            })}>
                                <img
                                    className={styles.image}
                                    src={photoUrl}
                                    alt="photo nft"
                                />
                            </div>
                        ))
                    }
                </div>

                <div ref={refMainBar} className={styles.photosBar}>
                    {
                        (isDesktop ? photos : splitHalfPhotos(1)).map((photoUrl) => (
                            <div key={photoUrl} className={classNames(styles.photoBar, {
                                [styles.mobile]: !isDesktop
                            })}>
                                <img
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
                !isDesktop &&
                <div className={styles.wrapper}>
                    <div ref={refMobileBar} className={classNames(styles.photosBar, styles.mobilePhotosBar)}>
                        {
                            splitHalfPhotos(2).map((photoUrl) => (
                                <div key={photoUrl} className={classNames(styles.photoBar, styles.mobilePhotoBar)}>
                                    <img
                                        className={styles.image}
                                        src={photoUrl}
                                        alt="photo nft"
                                    />
                                </div>
                            ))
                        }
                    </div>
                    <div ref={refMobileBar} className={classNames(styles.photosBar, styles.mobilePhotosBar)}>
                        {
                            splitHalfPhotos(2).map((photoUrl) => (
                                <div key={photoUrl} className={classNames(styles.photoBar, styles.mobilePhotoBar)}>
                                    <img
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
};