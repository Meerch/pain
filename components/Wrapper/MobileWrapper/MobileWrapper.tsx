import styles from './MobileWrapper.module.scss'
import {Logo} from "../../Logo";
import {Description} from "../../Description";
import {InfoPanels} from "../../InfoPanels";
import {Header} from "../../Header";
import {Links} from "../../Links";
import NewSpeedometer from "../../NewSpeedometer/NewSpeedometer";

export const MobileWrapper = () => {

    return (
        <div className={styles.desktopWrapper}>
            <Header />
            <Logo />
            <Description />
            <NewSpeedometer />
            <Links/>
            <InfoPanels />
        </div>
    );
};
