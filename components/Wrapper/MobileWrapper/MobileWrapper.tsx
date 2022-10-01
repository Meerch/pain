import styles from './MobileWrapper.module.scss'
import {Logo} from "../../Logo";
import {Description} from "../../Description";
import {InfoPanels} from "../../InfoPanels";
import {Header} from "../../Header";
import {Speedometer} from "../../Speedometer";

export const MobileWrapper = () => {

    return (
        <div className={styles.desktopWrapper}>
            <Header />
            <Logo />
            <Description />
            <Speedometer />
            <InfoPanels />
        </div>
    );
};
