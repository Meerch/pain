import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from 'axios'
import {urlApi} from "../../../../const/urlApi";

export const fetchWhitelistSignature = createAsyncThunk<any, string, {rejectValue: string}>(
    'speedometer/fetchWhitelistSignature',
    async (address, thunkAPI
    ) => {
        const { rejectWithValue } = thunkAPI
        try {
            const response = await axios.post<any>(`${urlApi}/whitelist-signature`, {
                address
            })

            if (!response.data) {
                return rejectWithValue('error')
            }

            console.log('response.signature', response.data.signature)
            console.log('response.amount', response.data.amountToMint)

            return response.data
        } catch {
            return rejectWithValue('error')
        }
    }
)
