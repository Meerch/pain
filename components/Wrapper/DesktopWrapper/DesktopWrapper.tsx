import styles from './DesktopWrapper.module.scss'
import {Logo} from "../../Logo";
import {Description} from "../../Description";
import {InfoPanels} from "../../InfoPanels";
import {Header} from "../../Header";
import {Links} from "../../Links";
import {Speedometer} from '../../Speedometer';

export const DesktopWrapper = () => {

    return (
        <div className={styles.desktopWrapper}>
            <Header/>
            <div className={styles.wrapperIntro}>
                <Speedometer/>
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
