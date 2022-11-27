import {useEffect, useState} from "react";
import {useTypedDispatch} from "../../../../hooks/useTypedDispatch";
import {
    useAccount,
    useContractRead,
    useContractWrite,
    usePrepareContractWrite,
    useWaitForTransaction
} from "wagmi";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {generateContractPainSetting} from "../../../../blockchain/utils";
import {formatEther, toWei} from "../../../../helpers/utils";
import {ethers} from "ethers";
import {popupActions} from "../../../../store/Popup/popupSlice";


export const useMintProcess = () => {
    const [amount, setAmount] = useState(1)
    const dispatch = useTypedDispatch()
    const {address} = useAccount()
    const currentRoundId = useSelector((state: RootState) => state.speedometer?.currentRound)
    const signature = useSelector((state: RootState) => state.speedometer?.signature)
    const stats = useSelector((state: RootState) => state.speedometer?.stats)
    const {data: changePrice} = useContractRead(generateContractPainSetting('getDiff', {
        args: currentRoundId && currentRoundId,
        enabled: currentRoundId,
        select: (data) => +(data.map(data => toWei(formatEther(data)))[0] / 100 * -1).toFixed(2)
    }))
    const [error, setError] = useState<string | null>(null)

    const {
        data: canFreeMint,
        isLoading: isLoadingCanFreeMint
    } = useContractRead(generateContractPainSetting('canFreeMint', {
        args: signature && address && [signature, address],
    }))


    const {data: mintPrice, isLoading: isLoadingMintPrice} = useContractRead(generateContractPainSetting('MINT_PRICE', {
        select: (data) => +formatEther(data)
    }))

    const {config: configMint} = usePrepareContractWrite(generateContractPainSetting('getMyPain', {
        args: currentRoundId && [currentRoundId, amount],
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
        }
    }))

    const {write: onMint, data: dataMint, isLoading: isLoadingWriteMint} = useContractWrite(configMint)
    const {isLoading: isLoadingMint, isSuccess: isSuccessMint, data: resultMint} = useWaitForTransaction({
        hash: dataMint?.hash
    })

    const {config: configFreeMint} = usePrepareContractWrite(generateContractPainSetting('feelSomePain', {
        args: currentRoundId && [currentRoundId, signature],
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
        if (!changePrice || canFreeMint || isLoading) {
            return
        }

        let limit = +changePrice > -15 ? 5 : 3
        const expectedValue = value + amount
        if (expectedValue > 0 && expectedValue <= limit) {
            setAmount(prev => prev + value)
        }
    }

    useEffect(() => {
        if ((!isSuccessMint && !isSuccessFreeMint) && !resultMint) {
            return
        }

        if (!resultMint || !isSuccessMint) {
            return
        }

        if (!resultFreeMint || !isSuccessFreeMint) {
            return
        }

        const ids = []
        resultMint?.logs?.forEach(log => {
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
        if (isLoading || (error && !canFreeMint)) {
            return
        }

        if (canFreeMint) {
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
        changePrice
    }
}