import React, {FC} from 'react';
import styles from './DesktopPopupMint.module.scss'
import PopupLayout from '../../PopupLayout/PopupLayout';
import classNames from "classnames";
import {useMintProcess} from '../model/useMintProcess';
import {description, textButtonMint, title} from '../model/const';
import Loader from "../../../shared/Loader/Loader";

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
        changePrice,
        isFreeMint,
        amountToMint
    } = useMintProcess()

    return (
        <PopupLayout onClose={onClose} className={classNames(styles.popup, {
            [styles.freeMint]: isFreeMint
        })}>
            <div className={styles.preview}>
                <img className={styles.logo} src="/images/logo-2.jpg" alt="PAIN"/>
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
            {
                isLoading
                    ? <div className={styles.loadingBlock}>
                        <Loader className={styles.loader}/>
                        <span className={styles.loaderText}>Loading ...</span>
                        <span className={styles.tip}>don’t close the window</span>
                    </div>
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
                        <div className={styles.titleInput}>{isFreeMint ? 'Available' :'Enter'} amount</div>
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
                        <button onClick={onClickButton} className={classNames(styles.button, {
                            [styles.inactive]: isLoading || error,
                            [styles.maxBottom]: isFreeMint
                        })}>
                            {
                                error
                                    ? error
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
