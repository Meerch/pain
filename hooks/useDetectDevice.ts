import {useCallback, useEffect, useState} from "react";

export const useDetectDevice = () => {
    const [isDesktop, setIsDesktop] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    const changeIsDesktop = useCallback(() => {
        if (window.screen.width < 1280) {
            setIsMobile(true)
            setIsDesktop(false)
        } else {
            setIsDesktop(true)
            setIsMobile(false)
        }
    }, [setIsDesktop, setIsMobile])

    useEffect(() => {
        if (window === undefined) {
            return
        }
        changeIsDesktop()

        window.addEventListener('resize', changeIsDesktop)

        return () => {
            window.removeEventListener('resize', changeIsDesktop);
        }
    }, [])

    return {isDesktop, isMobile}
}