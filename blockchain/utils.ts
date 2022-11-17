import {abiPain} from "./abiPain";

export const generateContractPainSetting = (methodName: string, additionalSettings?) => ({
    addressOrName: '0xee58900C144D223897f9921974edCA87C5321309',
    contractInterface: abiPain,
    functionName: methodName,
    ...additionalSettings
})