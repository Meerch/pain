import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type CurrentPopup = 'mint' | 'success' | null
export type SelectedTypeMint = 'free' | 'paid'

export interface PopupState {
    currentPopup: CurrentPopup,
    amountMintedNfts: number[],
    selectedTypeMint: SelectedTypeMint
}

const initialState: PopupState = {
    currentPopup: null,
    amountMintedNfts: [],
    selectedTypeMint: 'paid'
}

export const popupSlice = createSlice({
    name: 'popupSlice',
    initialState,
    reducers: {
        changeCurrentPopup: (state, action: PayloadAction<CurrentPopup>) => {
            state.currentPopup = action.payload
        },
        setAmountMintedNfts: (state, action: PayloadAction<number[]>) => {
            state.amountMintedNfts = action.payload
        },
        setSelectedTypeMint: (state, action: PayloadAction<SelectedTypeMint>) => {
            state.selectedTypeMint = action.payload
        },
    },
})

export const { actions: popupActions } = popupSlice
export const { reducer: popupReducer} = popupSlice