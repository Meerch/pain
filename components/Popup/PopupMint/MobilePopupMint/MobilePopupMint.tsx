import React, {FC} from 'react';
import styles from './MobilePopupMint.module.scss'
import PopupLayout from '../../PopupLayout/PopupLayout';
import classNames from "classnames";
import {useMintProcess} from "../model/useMintProcess";
import {description, textButtonMint, title} from "../model/const";

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
        changePrice,
        isFreeMint
    } = useMintProcess()

    return (
        <PopupLayout onClose={onClose} className={styles.popup}>
            <div className={styles.wrapperClose}>
                <div onClick={onClose} className={styles.close}/>
            </div>
            <span className={styles.title}>{title}</span>
            <span className={styles.description}>
                {description}
            </span>

            <div className={styles.preview}>
                <img className={styles.logo} src="/images/logo-2.jpg" alt="PAIN"/>
                <div className={styles.info}>
                    <div className={styles.edition}>
                        Edition of 6666
                    </div>
                    <span className={styles.price}>
                        {isLoadingMintPrice && 'Loading...'}
                        {
                            !isLoadingMintPrice && isFreeMint
                                ? `FREE (only gas fees)`
                                : `Price: ${mintPrice} eth`
                        }
                    </span>
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

            <div className={styles.titleInput}>
                {isFreeMint ? 'Available' :'Enter'} amount
            </div>
            <div className={styles.choiceAmount}>
                <div
                    onClick={() => changeAmount(-1)}
                    className={classNames(styles.minus, {
                        [styles.notVisible]: isFreeMint,
                    })}
                />
                <span className={styles.amountValue}>{amount}</span>
                <div
                    onClick={() => changeAmount(1)}
                    className={classNames(styles.plus, {
                        [styles.notVisible]: isFreeMint,
                    })}
                />
            </div>
            {
                !isFreeMint &&
                <span className={styles.total}>
                    in total: {mintPrice ? +mintPrice * amount : 'Loading...'} ETH
                </span>
            }
            {/*<span className={styles.available}>available: {+changePrice > -15 ? 5 : 3}</span>*/}

            {
                isLoading &&
                <span className={styles.loading}>Loading...</span>
            }

            <button onClick={onClickButton} className={classNames(styles.button, {
                [styles.inactive]: isLoading || error
            })}>
                {
                    error
                        ? error
                        // : canFreeMint ? 'GET FREE PAIN NFT' : 'GET PAIN NFT'
                        : textButtonMint
                }
            </button>
        </PopupLayout>
    );
};

export default MobilePopupMint;
