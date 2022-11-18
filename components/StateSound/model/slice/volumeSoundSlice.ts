import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type CurrentPopup = 'mint' | 'success' | null

export interface VolumeSoundState {
    volumeSounds: number
}

const initialState: VolumeSoundState = {
    volumeSounds: 1
}

export const volumeSoundsSlice = createSlice({
    name: 'stateSoundsSlice',
    initialState,
    reducers: {
        changeVolume: (state, action: PayloadAction<number>) => {
            state.volumeSounds = action.payload
            localStorage.setItem('volumeSound', String(action.payload))
        },
        initState: (state) => {
            state.volumeSounds = +localStorage.getItem('volumeSound') ?? 1
        },
    },
})

export const { actions: volumeSoundsActions } = volumeSoundsSlice
export const { reducer: volumeSoundsReducer} = volumeSoundsSlice