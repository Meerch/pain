import '../styles/globals.scss'
import 'swiper/css';
import {AppProps} from 'next/app';
import Head from "next/head";

function MyApp({Component, pageProps}: AppProps) {
    return <>
        <Head>
            <title>Pain</title>
        </Head>
        <Component {...pageProps} />
    </>
}

export default MyApp