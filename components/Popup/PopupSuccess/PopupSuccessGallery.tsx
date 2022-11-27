import classNames from 'classnames';
import React, { memo, useState } from 'react';
import {Swiper, SwiperSlide} from 'swiper/react'
import styles from './PopupSuccessGallery.module.scss'
import Image from 'next/image'
import SwiperCore, {Navigation} from 'swiper';

interface PopupSuccessGalleryProps {
    mintedImages: string[]
    className?: string
}

SwiperCore.use([Navigation])

const PopupSuccessGallery = memo(({mintedImages, className}: PopupSuccessGalleryProps) => {
    const navigationPrevRef = React.useRef(null)
    const navigationNextRef = React.useRef(null)
    const [progressGallery, setProgressGallery] = useState(0)
    const [activeSlide, setActiveSlide] = useState(1)

    return (
        <div className={classNames(styles.galleryWrapper, className)}>
            {
                mintedImages.length > 1 &&
                <svg
                    className={classNames(styles.arrow, styles.prev, {
                        [styles.inactive]: progressGallery === 0
                    })}
                    ref={navigationPrevRef}
                    width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.939341 10.9393C0.353554 11.5251 0.353554 12.4749 0.93934 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97918 12.6066 1.3934C12.0208 0.807611 11.0711 0.80761 10.4853 1.3934L0.939341 10.9393ZM23 10.5L2 10.5L2 13.5L23 13.5L23 10.5Z" fill="#E10004"/>
                </svg>
            }
            <Swiper
                className={styles.gallery}
                slidesPerView={1}
                spaceBetween={50}
                navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                }}
                onBeforeInit={(swiper) => {
                    // @ts-ignore
                    swiper.params.navigation.prevEl = navigationPrevRef.current;
                    // @ts-ignore
                    swiper.params.navigation.nextEl = navigationNextRef.current;
                }}
                onSlideChange={(swiper) => {
                    setProgressGallery(swiper.progress)
                    setActiveSlide(swiper.activeIndex + 1)
                }}
            >
                {
                    mintedImages.map((mintedImage) => (
                        <SwiperSlide key={mintedImage} className={styles.nftImage}>
                            <img src={mintedImage} alt='image' />
                        </SwiperSlide>
                    ))
                }
            </Swiper>

            {
                mintedImages.length > 1 &&
                <svg
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
