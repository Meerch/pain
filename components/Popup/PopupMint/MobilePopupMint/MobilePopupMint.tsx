import React, {FC} from 'react';
import styles from './MobilePopupMint.module.scss'
import PopupLayout from '../../PopupLayout/PopupLayout';
import classNames from "classnames";
import {useMintProcess} from "../model/useMintProcess";

interface PopupLayoutProps {
    onClose: () => void
}

const MobilePopupMint: FC<PopupLayoutProps> = ({onClose}) => {

    const {
        isLoadingMintPrice,
        isLoading,
        mintPrice,
        stats,
        changeAmount,
        error,
        canFreeMint,
        amount,
        onClickButton,
        changePrice
    } = useMintProcess()

    return (
        <PopupLayout onClose={onClose} className={styles.popup}>
            <div className={styles.wrapperClose}>
                <div onClick={onClose} className={styles.close}/>
            </div>
            <span className={styles.title}>Mint your PAIN</span>
            <span className={styles.description}>It’s live! You are minting “Excruciating PAIN” bla bla bla</span>

            <div className={styles.preview}>
                <img className={styles.logo} src="/images/logo-2.jpg" alt="PAIN"/>
                <div className={styles.info}>
                    <div className={styles.edition}>
                        Edition of 6666
                    </div>
                    <span className={styles.price}>{mintPrice ? mintPrice : 'Loading...'} eth</span>
                </div>

                <div className={styles.infoPrice}>
                    <span className={styles.currentPrice}>
                        Current ETH price: ${stats?.eth ? stats?.eth?.toFixed(0) : "Loading..."}
                    </span>
                    <div className={styles.priceChange}>
                        24h ETH PRICE change: <span className={styles.mark}>
                        {changePrice ? changePrice : 'Loading...'}%
                    </span>
                    </div>
                </div>
            </div>

            <div className={styles.titleInput}>Enter amount</div>
            <div className={styles.choiceAmount}>
                <div onClick={() => changeAmount(-1)} className={styles.minus}/>
                <span className={styles.amountValue}>{amount}</span>
                <div onClick={() => changeAmount(1)} className={styles.plus}/>
            </div>
            {
                !canFreeMint &&
                <span className={styles.total}>
                    in total: {mintPrice ? +mintPrice * amount : 'Loading...'} ETH
                </span>
            }
            <span className={styles.available}>available: {+changePrice > -15 ? 5 : 3}</span>
            {isLoading && <span className={styles.loading}>Loading...</span>}
            <button onClick={onClickButton} className={classNames(styles.button, {
                [styles.inactive]: isLoading || error
            })}>
                {
                    error
                        ? error
                        : canFreeMint ? 'GET FREE PAIN NFT' : 'GET PAIN NFT'
                }
            </button>
        </PopupLayout>
    );
};

export default MobilePopupMint;
