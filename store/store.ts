import { configureStore } from '@reduxjs/toolkit'
import { speedometerReducer } from '../components/Speedometer/model/slice/spedometerSlice'
import { popupReducer } from './Popup/popupSlice'
import {volumeSoundsReducer} from "../components/StateSound";

const rootReducer = {
    popup: popupReducer,
    speedometer: speedometerReducer,
    volumeSounds: volumeSoundsReducer
}

export const store = configureStore({
    reducer: rootReducer,
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch