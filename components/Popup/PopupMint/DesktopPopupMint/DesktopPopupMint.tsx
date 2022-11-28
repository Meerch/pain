import React, {FC} from 'react';
import styles from './DesktopPopupMint.module.scss'
import PopupLayout from '../../PopupLayout/PopupLayout';
import classNames from "classnames";
import {useMintProcess} from '../model/useMintProcess';
import {description, textButtonMint, title} from '../model/const';

interface PopupLayoutProps {
    onClose: () => void
}

const DesktopPopupMint: FC<PopupLayoutProps> = ({onClose}) => {
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
            <div className={styles.preview}>
                <img className={styles.logo} src="/images/logo-2.jpg" alt="PAIN"/>
                <div className={styles.edition}>
                    Edition of 6666
                </div>
                <span className={styles.price}>
                    {isLoadingMintPrice ? 'Loading' : `Price: ${mintPrice} eth`}
                </span>
            </div>
            {
                isLoading
                    ? <div className={styles.loadingBlock}>Loading...</div>
                    : <div className={styles.mint}>
                        <span className={styles.title}>{title}</span>
                        <span className={styles.description}>
                            {description}
                        </span>
                        <span className={styles.price}>
                            Current ETH price: ${stats?.eth ? stats?.eth?.toFixed(0) : "Loading..."}
                        </span>
                        <div className={styles.priceChange}>
                            24h ETH PRICE change: <span className={styles.mark}>{changePrice}%</span>
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
                        <button onClick={onClickButton} className={classNames(styles.button, {
                            [styles.inactive]: isLoading || (error && !canFreeMint),
                            [styles.maxBottom]: canFreeMint
                        })}>
                            {
                                (error && !canFreeMint)
                                    ? error
                                    // : canFreeMint ? 'GET FREE PAIN NFT' : 'GET PAIN NFT'
                                    : textButtonMint
                            }
                        </button>
                    </div>
            }

            <div onClick={onClose} className={styles.close}/>
        </PopupLayout>
    );
};

export default DesktopPopupMint
