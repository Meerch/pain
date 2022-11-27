import styles from './DesktopWrapper.module.scss'
import {Logo} from "../../Logo";
import {Description} from "../../Description";
import {InfoPanels} from "../../InfoPanels";
import {Header} from "../../Header";
import {Links} from "../../Links";
import NewSpeedometer from '../../NewSpeedometer/NewSpeedometer';

export const DesktopWrapper = () => {

    return (
        <div className={styles.desktopWrapper}>
            <Header/>
            <div className={styles.wrapperIntro}>
                <NewSpeedometer />
                <div className={styles.wrapperRightContent}>
                    <Logo/>
                    <Description/>
                    <InfoPanels/>
                </div>
            </div>

            <Links/>

        </div>
    );
};
