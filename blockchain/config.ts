import {Chain, configureChains, createClient} from "wagmi";
import {jsonRpcProvider} from "wagmi/providers/jsonRpc";
import {getDefaultWallets} from "@rainbow-me/rainbowkit";

export const isTest = true
export const addressPainContract = '0xc7fB24d94615B9668c5d87609096999Bf4Daa1fa'
export const chainId = 5

const avalancheChain: Chain = {
    id: chainId,
    name: 'Görli',
    network: 'https://goerli.net/',
    nativeCurrency: {
        decimals: 5,
        name: 'Görli',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: 'https://eth-goerli.public.blastapi.io',
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