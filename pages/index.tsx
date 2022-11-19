import {DesktopWrapper} from "../components/Wrapper/DesktopWrapper";
import {MobileWrapper} from "../components/Wrapper/MobileWrapper";
import {Gallery} from "../components/Gallery";
import {Footer} from "../components/Footer";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useTypedDispatch} from "../hooks/useTypedDispatch";
import {MobilePopupMint, DesktopPopupMint} from "../components/Popup/PopupMint";
import {useDetectDevice} from "../hooks/useDetectDevice";
import PopupSuccess from "../components/Popup/PopupSuccess/PopupSuccess";
import {popupActions} from "../store/Popup/popupSlice";
import {useCallback, useEffect, useRef, useState} from "react";
import FOG from 'vanta/dist/vanta.fog.min'

// @ts-ignore
import soundClick from "../public/sounds/click.mp3";
import {useCustomSound} from "../hooks/useCustomSound";
import {volumeSoundsActions} from "../components/StateSound";

export default function Home() {
    const currentPopup = useTypedSelector(state => state.popup.currentPopup)
    const dispatch = useTypedDispatch()
    const {isMobile, isDesktop} = useDetectDevice()
    const [isReady, setIsReady] = useState(false)
    const [vantaEffect, setVantaEffect] = useState(null)
    const myRef = useRef(null)
    const {play} = useCustomSound(soundClick, {
        volume: 0.3
    })

    const closeModal = () => {
        dispatch(popupActions.changeCurrentPopup(null))
    }

    const playSoundClick = useCallback(() => {
        play()
    }, [play])

    useEffect(() => {
        if (play) {
            document.body.addEventListener('click', playSoundClick)
        }

        return () => document.body.removeEventListener('click', playSoundClick)
    }, [play])

    useEffect(() => {
        if (isReady) {
            document.body.style.overflow = 'visible'
        } else {
            document.body.style.overflow = 'hidden'
        }
    }, [isReady])

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsReady(true)
        }, 5000)

        dispatch(volumeSoundsActions.initState())

        return () => clearTimeout(timer)
    }, [])



    useEffect(() => {
        if (isMobile) {
            if (vantaEffect) vantaEffect.destroy()
            return
        }

        if (!vantaEffect) {
            setVantaEffect(FOG({
                el: myRef.current,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                highlightColor: 0x180101,
                midtoneColor: 0x890404,
                lowlightColor: 0xff0000,
                baseColor: 0x0,
                speed: 2.00,
                zoom: 0.30
            }))
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy()
        }
    }, [vantaEffect, isMobile])

    return (
        <div className='wrapper'>
            {
                !isReady &&
                <div className='loading'>
                    <img className='dancer' src="/images/dance.gif" alt=""/>
                    <div className="loader">
                        <span className='text'>loading ...</span>
                        <img className='effect' src="/images/loading-effect.gif" alt=""/>
                    </div>
                </div>
            }
            <div ref={myRef} className='content-app'>
                {isDesktop && <DesktopWrapper/>}
                {isMobile && <MobileWrapper/>}
                <Gallery/>
                <Footer/>
                <img
                    className='background-element background-statistic'
                    src="/images/background-statistic-btc.png"
                     alt=""
                />

                {currentPopup === 'mint' &&
                    <>
                        {isDesktop && <DesktopPopupMint onClose={closeModal}/>}
                        {isMobile && <MobilePopupMint onClose={closeModal}/>}
                    </>
                }

                {currentPopup === 'success' &&
                    <PopupSuccess onClose={closeModal}/>
                }
            </div>
        </div>
    )
}
