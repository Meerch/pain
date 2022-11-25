import { BigNumberish, ethers } from "ethers"

export const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}

export const formatEther = (value: BigNumberish): string => {
    return ethers.utils.formatEther(value)
}

export const toWei = (value: string) => {
    return +ethers.utils.parseEther(value)
}