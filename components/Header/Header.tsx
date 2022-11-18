import styles from './Header.module.scss'
import {SocialLinks} from "../shared/SocialLinks";
import {Marketplaces} from "../shared/Marketplaces";
import {ConnectButton, useAccountModal, useChainModal, useConnectModal} from '@rainbow-me/rainbowkit';
import {useAccount, useConnect, useDisconnect} from "wagmi";
import {useHover} from "../../hooks/useHover";
import {svgButton, svgButtonWithoutShadow} from './svgButton';
// @ts-ignore
import soundConnect from '../../public/sounds/connect-wallet.mp3'
import {VolumeSound} from "../StateSound";
import {useCustomSound} from "../../hooks/useCustomSound";

export const Header = () => {
    const {openConnectModal} = useConnectModal();
    const {disconnect} = useDisconnect()
    const {address} = useAccount()
    const [isHover, bindHover] = useHover()
    const {play} = useCustomSound(soundConnect)

    const onConnectWallet = () => {
        if (!address) {
            play()
            // connect?.({connector, chainId: 5})
            openConnectModal()
        } else {
            disconnect?.()
        }
    }

    return (
        <div className={styles.header}>
            <div className={styles.wrapperButton}>
                <VolumeSound className={styles.switcherVolumeSound}/>

                <div onClick={onConnectWallet} {...bindHover} className={styles.connect}>
                    {
                        isHover
                            ? svgButtonWithoutShadow
                            : svgButton
                    }

                    <span className={styles.text}>
                        {
                            !address
                                ? 'connect wallet'
                                : 'disconnect'
                        }
                    </span>
                </div>
            </div>

            <SocialLinks className={styles.links}/>
            <Marketplaces className={styles.marketplaces}/>
            <div className={styles.openMenu}/>
        </div>
    )
}

