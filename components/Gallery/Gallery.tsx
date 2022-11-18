import {splitHalfPhotos} from "./utils";
import styles from './Gallery.module.scss'
import React, {memo, useEffect, useRef, useState} from "react";
import classNames from "classnames"
import {photos} from "./constants";
import {useDetectDevice} from "../../hooks/useDetectDevice";


const Gallery = memo(() => {
    // const [isDesktop, setIsDesktop] = useState(true)
    const {isDesktop, isMobile} = useDetectDevice()

    return (
        <div className={styles.gallery}>
            <div className={styles.wrapper}>
                <div className={styles.photosBar}>
                    {
                        (isDesktop ? photos : splitHalfPhotos(1)).map((photoUrl) => (
                            <div key={photoUrl} className={classNames(styles.photoBar)}>
                                <img
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
                isMobile &&
                <div className={styles.wrapper}>
                    <div className={classNames(styles.photosBar, styles.mobilePhotosBar)}>
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
                    <div className={classNames(styles.photosBar, styles.mobilePhotosBar)}>
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
})

Gallery.displayName = 'Gallery'
export default Gallery