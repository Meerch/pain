import '../styles/globals.scss'
import {AppProps} from 'next/app';
import Head from "next/head";
import {Provider} from 'react-redux';
import {createWrapper} from 'next-redux-wrapper';
import {store} from '../store/store';
import '@rainbow-me/rainbowkit/styles.css';
import {getDefaultWallets, RainbowKitProvider,} from '@rainbow-me/rainbowkit';
import {Chain, chain, configureChains, createClient, WagmiConfig,} from 'wagmi';
import {jsonRpcProvider} from 'wagmi/providers/jsonRpc';
import {chains, wagmiClient } from '../blockchain/config';

const title = 'Pain'
const description = '6,666 AI-generated faces of pAIn. You can only mint when the ETH price is down.'
const url = 'https://pppain.com'

function App({Component, pageProps}: AppProps) {
    return <>
        <Head>
            <title>Pain</title>
            <link rel="manifest" href="/favicon/manifest.json"/>
            <link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png"/>
            <link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png"/>
            <link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png"/>
            <link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png"/>
            <link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png"/>
            <link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png"/>
            <link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png"/>
            <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png"/>
            <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png"/>
            <link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-icon-192x192.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
            <meta name="msapplication-TileColor" content="#ffffff"/>
            <meta name="msapplication-TileImage" content="/ms-icon-144x144.png"/>
            <meta name="theme-color" content="#ffffff"/>

            <link rel="apple-touch-icon" sizes="120x120" href="favicon/apple-touch-icon.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png"/>
            <link rel="manifest" href="favicon/site.webmanifest"/>
            <link rel="mask-icon" href="favicon/safari-pinned-tab.svg" color="#FF453E"/>
            <meta name="msapplication-TileColor" content="#da532c"/>
            <meta name="theme-color" content="#ffffff"/>
            <meta
                property="og:image"
                content={`${url}/favicon/snippet.png`}
            />
            <meta
                name="twitter:image"
                content={`${url}/favicon/snippet.png`}
            />
            <meta name="description" content={description}/>
            <meta property="og:type" content="website"/>
            <meta property="og:url" content={url}/>
            <meta property="og:title" content={title}/>
            <meta property="og:description" content={description}/>

            <meta property="og:site_name" content={url}/>
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:creator" content={`@${title}`}/>
            <meta name="twitter:title" content={title}/>
            <meta name="twitter:description" content={description}/>
            <meta name="twitter:site" content={`@${title}`}/>
            <meta name="twitter:domain" content={url}/>

            <meta name="theme-color" content="#000000" media="(prefers-color-scheme: light)"/>
            <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)"/>

            <script src={"https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"} defer/>
            <script src={"https://cdn.jsdelivr.net/npm/vanta/dist/vanta.waves.min.js"} defer/>
        </Head>

        <Provider store={store}>
            <WagmiConfig client={wagmiClient}>
                <RainbowKitProvider chains={chains} initialChain={chain.goerli}>
                    <Component {...pageProps} />
                </RainbowKitProvider>
            </WagmiConfig>
        </Provider>
    </>
}

const makeStore = () => store
const wrapper = createWrapper(makeStore)

export default wrapper.withRedux(App)