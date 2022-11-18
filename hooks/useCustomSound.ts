import useSound from "use-sound";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";

interface SoundSettings {
    volume?: number
}

export const useCustomSound = (srcSound: string | string[], {volume}: SoundSettings = {}) => {
    const volumeSound = useSelector((state: RootState) => state.volumeSounds.volumeSounds)
    const [play, {stop}] = useSound(srcSound, {
        volume: volumeSound === 0 ? volumeSound : (volume || 1)
    })

    return {play, stop}
}