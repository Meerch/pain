import {useEffect, useState} from "react";
import {useTypedDispatch} from "../../../../hooks/useTypedDispatch";
import {
    useAccount,
    useContractRead,
    useContractWrite, useNetwork,
    usePrepareContractWrite, useSwitchNetwork,
    useWaitForTransaction
} from "wagmi";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {generateContractPainSetting} from "../../../../blockchain/utils";
import {formatEther, toWei} from "../../../../helpers/utils";
import {ethers} from "ethers";
import {popupActions} from "../../../../store/Popup/popupSlice";
import {chainId} from "../../../../blockchain/config";


export const useMintProcess = () => {
    const selectedTypeMint = useSelector((state: RootState) => state.popup?.selectedTypeMint)
    const amountToMint = useSelector((state: RootState) => state.speedometer?.amountToMint)
    const dispatch = useTypedDispatch()
    const {address} = useAccount()
    const currentRoundId = useSelector((state: RootState) => state.speedometer?.currentRound)
    const signature = useSelector((state: RootState) => state.speedometer?.signature)
    const stats = useSelector((state: RootState) => state.speedometer?.stats)
    const {data: changePrice} = useContractRead(generateContractPainSetting('getDiff', {
        args: currentRoundId,
        enabled: currentRoundId,
        select: (data) => +(data.map(data => toWei(formatEther(data)))[0] / 100 * -1).toFixed(2)
    }))
    const [error, setError] = useState<string | null>(null)
    const {chain} = useNetwork()
    const {switchNetwork} = useSwitchNetwork()

    const {
        data: canFreeMint,
        isLoading: isLoadingCanFreeMint
    } = useContractRead(generateContractPainSetting('canFreeMint', {
        args: [amountToMint, signature, address],
        enabled: signature && address && address
    }))

    const isFreeMint = selectedTypeMint === 'free' && canFreeMint

    const [amount, setAmount] = useState(isFreeMint && amountToMint ? amountToMint : 1)

    const {data: mintPrice, isLoading: isLoadingMintPrice} = useContractRead(generateContractPainSetting('MINT_PRICE', {
        select: (data) => +formatEther(data)
    }))

    const {config: configMint} = usePrepareContractWrite(generateContractPainSetting('getMyPain', {
        args: [currentRoundId, amount],
        enabled: currentRoundId && mintPrice,
        onError: error => {
            if (String(error).includes('INSUFFICIENT_FUNDS')) {
                setError('Insufficient funds')
            } else {
                setError(null)
            }
        },
        onSuccess: () => setError(null),
        overrides: {
            from: address,
            value: ethers.utils.parseEther(String(+mintPrice * amount))
        },
        chainId: chainId,
    }))

    const {write: onMint, data: dataMint, isLoading: isLoadingWriteMint} = useContractWrite(configMint)
    const {isLoading: isLoadingMint, isSuccess: isSuccessMint, data: resultMint} = useWaitForTransaction({
        hash: dataMint?.hash
    })

    const {config: configFreeMint} = usePrepareContractWrite(generateContractPainSetting('feelSomePain', {
        args: [currentRoundId, +amount, signature],
        enabled: isFreeMint && currentRoundId && signature,
        onError: err => console.log('prepare free mint', err),
        chainId: chainId,
    }))

    const {write: onFreeMint, data: dataFreeMint, isLoading: isLoadingWriteFreeMint} = useContractWrite(configFreeMint)
    const {isLoading: isLoadingFreeMint, isSuccess: isSuccessFreeMint, data: resultFreeMint} = useWaitForTransaction({
        hash: dataFreeMint?.hash
    })
    const isLoading = isLoadingMintPrice
        || isLoadingCanFreeMint
        || isLoadingMint
        || isLoadingFreeMint
        || isLoadingWriteMint
        || isLoadingWriteFreeMint


    const changeAmount = (value: number) => {
        if (!changePrice || isFreeMint || isLoading || isFreeMint) {
            return
        }

        let limit = +changePrice > -15 ? 5 : 3
        const expectedValue = value + amount
        if (expectedValue > 0 && expectedValue <= limit) {
            setAmount(prev => prev + value)
        }
    }

    useEffect(() => {
        if (!isFreeMint && (!resultMint || !isSuccessMint)) {
            return
        }

        if (isFreeMint && (!resultFreeMint || !isSuccessFreeMint)) {
            return
        }

        const ids = []
        console.log('result mint', resultMint)
        console.log('result mint', resultFreeMint)
        const result = isFreeMint ? resultFreeMint : resultMint
        result?.logs?.forEach(log => {
            const {topics} = log
            if (topics[3] && topics[1] && parseInt(log.topics[1], 16) === 0) {
                const parseId = parseInt(topics[3], 16)
                ids.push(parseId)
            }
        })

        if (ids) {
            dispatch(popupActions.setAmountMintedNfts(ids))
            dispatch(popupActions.changeCurrentPopup('success'))
        }
    }, [isSuccessMint, isSuccessFreeMint, resultMint, resultFreeMint])


    const onClickButton = () => {
        if (isLoading || (error && !isFreeMint)) {
            return
        }

        if (chain && chain.id !== chainId) {
            switchNetwork?.(chainId)
            return
        }

        if (isFreeMint) {
            onFreeMint?.()
        } else {
            onMint?.()
        }
    }

    return {
        isLoadingMintPrice,
        isLoading,
        mintPrice,
        stats,
        changeAmount,
        error,
        canFreeMint,
        onClickButton,
        amount,
        changePrice,
        isFreeMint,
        amountToMint
    }
}