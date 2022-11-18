import {abiPain} from "./abiPain";
import { addressPainContract } from "./config";

export const generateContractPainSetting = (methodName: string, additionalSettings?) => ({
    addressOrName: addressPainContract,
    contractInterface: abiPain,
    functionName: methodName,
    ...additionalSettings
})