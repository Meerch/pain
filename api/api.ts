import axios from "axios";
import {urlApi} from "../const/urlApi";

export const getImagesMintedNfts = async (firstTokenId: number, amountTokens: number) => {
    try {
        const response = await axios.get(`${urlApi}/get-images`, {
            params: {
                tokenId: firstTokenId,
                numberOfTokens: amountTokens
            }
        })

        if (response?.data) {
            return response.data
        }
    } catch {
        return null
    }
}