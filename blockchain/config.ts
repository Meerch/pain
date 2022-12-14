import {Chain, configureChains, createClient} from "wagmi";
import {jsonRpcProvider} from "wagmi/providers/jsonRpc";
import {getDefaultWallets} from "@rainbow-me/rainbowkit";

export const addressPainContract = '0x04a44B52345F3F57c92be462d63b747049eF00b4'
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