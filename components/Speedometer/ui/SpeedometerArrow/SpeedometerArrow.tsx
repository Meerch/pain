import React, {memo} from 'react';
import styles from './SpeedometerArrow.module.scss'

interface SpeedometerArrowProps {
    progress: number
}

const initialRotateArrow = -93

const SpeedometerArrow = memo(({progress}: SpeedometerArrowProps) => {

    const calculateRotateArrow = () => {
        const positiveProgress = Math.abs(progress)
        if (progress <= 0 && progress >= -20) {
             // calculation rotate within the working value (from 0 to 20)
            const percent = 1 / (20 / positiveProgress)
            return initialRotateArrow + (180 * percent)
        } else if (progress >= 10) {
            // limit rotate by positive change price (progress)
            return initialRotateArrow - 40
        } else if (progress > 0) {
            // more operating values (from 0 to -20)
            const percent = 1 / (10 / progress)
            return initialRotateArrow - (50 * percent)
        } else if (progress <= -25) {
            // limit rotate by negative change price (progress)
            const percent = 1 / (20 / 25)
            return initialRotateArrow + (180 * percent)
        } else if (progress <= -20) {
            // less than the operating values (from 0 to -20)
            const percent = 1 / (20 / positiveProgress)
            return initialRotateArrow + (180 * percent)
        }
    }

    return (
        <div
            style={{transform: `rotate(${calculateRotateArrow()}deg)`}}
            className={styles.arrowWrapper}
        >
            <svg className={styles.arrow} width="56" height="237" viewBox="0 0 56 237" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_505_54)">
                    <path d="M39.0157 211.672L28.0437 2.3832C28.0107 1.73402 27.0792 1.73402 27.038 2.3832L16.066 211.672C16.0247 212.085 16 212.498 16 212.92C16 219.437 21.1686 224.723 27.5408 224.723C33.913 224.723 39.0816 219.437 39.0816 212.92C39.0816 212.498 39.0569 212.085 39.0157 211.672Z" fill="black"/>
                    <path d="M39.0157 211.672L28.0437 2.3832C28.0107 1.73402 27.0792 1.73402 27.038 2.3832L16.066 211.672C16.0247 212.085 16 212.498 16 212.92C16 219.437 21.1686 224.723 27.5408 224.723C33.913 224.723 39.0816 219.437 39.0816 212.92C39.0816 212.498 39.0569 212.085 39.0157 211.672Z" stroke="black" strokeWidth="3" strokeMiterlimit="10"/>
                    <path d="M39.0157 211.672L28.0437 2.3832C28.0107 1.73402 27.0792 1.73402 27.038 2.3832L16.066 211.672C16.0247 212.085 16 212.498 16 212.92C16 219.437 21.1686 224.723 27.5408 224.723C33.913 224.723 39.0816 219.437 39.0816 212.92C39.0816 212.498 39.0569 212.085 39.0157 211.672Z" stroke="white" strokeWidth="3" strokeMiterlimit="10"/>
                    <path d="M39.0157 211.672L28.0437 2.3832C28.0107 1.73402 27.0792 1.73402 27.038 2.3832L16.066 211.672C16.0247 212.085 16 212.498 16 212.92C16 219.437 21.1686 224.723 27.5408 224.723C33.913 224.723 39.0816 219.437 39.0816 212.92C39.0816 212.498 39.0569 212.085 39.0157 211.672Z" stroke="black" strokeOpacity="0.2" strokeWidth="3" strokeMiterlimit="10"/>
                </g>
                <path d="M27.7523 230.559C42.1117 230.559 53.7523 219.142 53.7523 205.059C53.7523 190.976 42.1117 179.559 27.7523 179.559C13.3929 179.559 1.75232 190.976 1.75232 205.059C1.75232 219.142 13.3929 230.559 27.7523 230.559Z" fill="black"/>
                <path d="M27.7523 230.559C42.1117 230.559 53.7523 219.142 53.7523 205.059C53.7523 190.976 42.1117 179.559 27.7523 179.559C13.3929 179.559 1.75232 190.976 1.75232 205.059C1.75232 219.142 13.3929 230.559 27.7523 230.559Z" stroke="black" strokeWidth="3" strokeMiterlimit="10"/>
                <path d="M27.7523 230.559C42.1117 230.559 53.7523 219.142 53.7523 205.059C53.7523 190.976 42.1117 179.559 27.7523 179.559C13.3929 179.559 1.75232 190.976 1.75232 205.059C1.75232 219.142 13.3929 230.559 27.7523 230.559Z" stroke="#2D2D2D" strokeWidth="3" strokeMiterlimit="10"/>
                <path d="M27.3149 226.816C39.4652 226.816 49.3149 216.967 49.3149 204.816C49.3149 192.666 39.4652 182.816 27.3149 182.816C15.1647 182.816 5.31494 192.666 5.31494 204.816C5.31494 216.967 15.1647 226.816 27.3149 226.816Z" fill="url(#paint0_radial_505_54)"/>
                <path d="M27.3149 226.816C39.4652 226.816 49.3149 216.967 49.3149 204.816C49.3149 192.666 39.4652 182.816 27.3149 182.816C15.1647 182.816 5.31494 192.666 5.31494 204.816C5.31494 216.967 15.1647 226.816 27.3149 226.816Z" stroke="black" strokeWidth="3" strokeMiterlimit="10"/>
                <path d="M27.3149 226.816C39.4652 226.816 49.3149 216.967 49.3149 204.816C49.3149 192.666 39.4652 182.816 27.3149 182.816C15.1647 182.816 5.31494 192.666 5.31494 204.816C5.31494 216.967 15.1647 226.816 27.3149 226.816Z" stroke="#C07070" strokeWidth="3" strokeMiterlimit="10"/>
                <defs>
                    <filter id="filter0_d_505_54" x="14.5" y="0.396317" width="36.0817" height="235.827" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dx="5" dy="5"/>
                        <feGaussianBlur stdDeviation="2.5"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_505_54"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_505_54" result="shape"/>
                    </filter>
                    <radialGradient id="paint0_radial_505_54" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(27.3149 204.816) rotate(90) scale(22)">
                        <stop stopColor="#FF0606"/>
                        <stop offset="1" stopColor="#910000" stopOpacity="0"/>
                    </radialGradient>
                </defs>
            </svg>

            <img className={styles.head} src="/images/speedometer/head-2x.png" alt=""/>

        </div>
    );
})

SpeedometerArrow.displayName = 'SpeedometerArrow'

export default SpeedometerArrow;

// <img
//     style={{transform: `rotate(${calculateRotateArrow()}deg)`}}
//     src="/images/speedometer/arrow.svg"
//     alt="->"
//     className={styles.arrow}
// />