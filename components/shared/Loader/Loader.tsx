import React from 'react';
import styles from './Loader.module.scss'
import classNames from "classnames";

interface LoaderProps {
    className?: string
}

const Loader = (props: LoaderProps) => {
    const {className} = props

    return (
        <div className={classNames(styles.demo, className)}>
            <div className={styles.circle}>
                <div className={styles.inner}/>
            </div>
            <div className={styles.circle}>
                <div className={styles.inner}/>
            </div>
            <div className={styles.circle}>
                <div className={styles.inner}/>
            </div>
            <div className={styles.circle}>
                <div className={styles.inner}/>
            </div>
            <div className={styles.circle}>
                <div className={styles.inner}/>
            </div>
        </div>
    );
};

export default Loader
