import {Chain, configureChains, createClient} from "wagmi";
import {jsonRpcProvider} from "wagmi/providers/jsonRpc";
import {getDefaultWallets} from "@rainbow-me/rainbowkit";

export const isTest = true
export const addressPainContract = '0x3c8F4861413713275bFC3A8Db11CEB5279b7AEf0'
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
