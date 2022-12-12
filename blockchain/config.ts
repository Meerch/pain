import {Chain, configureChains, createClient} from "wagmi";
import {jsonRpcProvider} from "wagmi/providers/jsonRpc";
import {getDefaultWallets} from "@rainbow-me/rainbowkit";

export const addressPainContract = '0x5b8d000a28e756D16c1dF897eDBafd0598F417b0'

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

export const {chains, provider} = configureChains(
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

export const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
})