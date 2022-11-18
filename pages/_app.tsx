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

const avalancheChain: Chain = {
    id: 5,
    name: 'Görli',
    network: 'https://goerli.net/',
    nativeCurrency: {
        decimals: 5,
        name: 'Görli',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: 'https://rpc.ankr.com/eth_goerli',
    },
    blockExplorers: {
        default: {name: 'Görli', url: 'https://goerli.net'},
    },
    testnet: true,
}

const {chains, provider} = configureChains(
    [avalancheChain],
    [
        jsonRpcProvider({
            rpc: chain => ({http: chain.rpcUrls.default}),
        }),
    ]
);

const {connectors} = getDefaultWallets({
    appName: 'Pain',
    chains
})

// const connectors = connectorsForWallets([
//     {
//         groupName: 'All',
//         chains
//         // wallets: [
//         //     metaMaskWallet({chains}),
//         //     walletConnectWallet({chains})
//         // ]
//     }
// ]);

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
})

function App({Component, pageProps}: AppProps) {
    return <>
        <Head>
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
            <link rel="mask-icon" href="favicon/safari-pinned-tab.svg" color="#5bbad5"/>
            <meta name="msapplication-TileColor" content="#da532c"/>
            <meta name="theme-color" content="#ffffff"/>
            <title>Pain</title>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js" defer/>
            <script src="https://cdn.jsdelivr.net/npm/vanta/dist/vanta.waves.min.js" defer/>
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