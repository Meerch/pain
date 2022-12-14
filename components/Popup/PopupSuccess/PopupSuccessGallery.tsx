import classNames from 'classnames';
import React, {memo, useCallback, useRef, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react'
import styles from './PopupSuccessGallery.module.scss'
import SwiperCore, {Navigation} from 'swiper';

interface PopupSuccessGalleryProps {
    mintedImages: string[]
    className?: string
}

SwiperCore.use([Navigation])

const PopupSuccessGallery = memo(({mintedImages, className}: PopupSuccessGalleryProps) => {
    const navigationPrevRef = useRef(null)
    const navigationNextRef = useRef(null)
    const sliderRef = useRef(null)
    const [progressGallery, setProgressGallery] = useState(0)

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);

    return (
        <div className={classNames(styles.galleryWrapper, className)}>
            {
                mintedImages?.length > 1 &&
                <svg
                    onClick={handlePrev}
                    className={classNames(styles.arrow, styles.prev, {
                        [styles.inactive]: progressGallery === 0
                    })}
                    ref={navigationPrevRef}
                    width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.939341 10.9393C0.353554 11.5251 0.353554 12.4749 0.93934 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97918 12.6066 1.3934C12.0208 0.807611 11.0711 0.80761 10.4853 1.3934L0.939341 10.9393ZM23 10.5L2 10.5L2 13.5L23 13.5L23 10.5Z" fill="#E10004"/>
                </svg>
            }
            <Swiper
                ref={sliderRef}
                className={styles.gallery}
                slidesPerView={1}
                spaceBetween={50}
                onSlideChange={(swiper) => {
                    setProgressGallery(swiper.progress)
                }}
            >
                {
                    mintedImages.map((mintedImage, index) => (
                        <SwiperSlide key={`${mintedImage}${index}`} className={styles.nftImage}>
                            <img src={mintedImage} alt='image' />
                        </SwiperSlide>
                    ))
                }
            </Swiper>

            {
                mintedImages?.length > 1 &&
                <svg
                    onClick={handleNext}
                    className={classNames(styles.arrow, styles.next, {
                        [styles.inactive]: progressGallery === 1
                    })}
                    ref={navigationNextRef}
                    width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.939341 10.9393C0.353554 11.5251 0.353554 12.4749 0.93934 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97918 12.6066 1.3934C12.0208 0.807611 11.0711 0.80761 10.4853 1.3934L0.939341 10.9393ZM23 10.5L2 10.5L2 13.5L23 13.5L23 10.5Z" fill="#E10004"/>
                </svg>
            }
        </div>
    )
})

PopupSuccessGallery.displayName = 'PopupSuccessGallery'

export default PopupSuccessGallery;
