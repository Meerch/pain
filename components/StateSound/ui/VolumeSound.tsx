import classNames from 'classnames';
import React, {FC} from 'react';
import {useSelector} from 'react-redux';
import styles from './VolumeSound.module.scss'
import {RootState} from "../../../store/store";
import {useTypedDispatch} from "../../../hooks/useTypedDispatch";
import {volumeSoundsActions} from "../model/slice/volumeSoundSlice";

interface StateSoundProps {
    className?: string
}

const VolumeSound: FC<StateSoundProps> = ({className}) => {
    const volumeSound = useSelector((state: RootState) => state.volumeSounds.volumeSounds)
    const dispatch = useTypedDispatch()

    const changeVolume = (volume: number) => () => {
        dispatch(volumeSoundsActions.changeVolume(volume))
    }

    return (
        <div className={classNames(styles.wrapper, className)}>
            {
                volumeSound === 0
                    ? <img
                        onClick={changeVolume(1)}
                        src="/images/state-sound/mute.png"
                        alt="mute"
                    />
                    : <img
                        onClick={changeVolume(0)}
                        src="/images/state-sound/unmute.png"
                        alt="unmute"
                    />
            }
        </div>
    );
};

export default VolumeSound;
