import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import PasteReducer from './PasteSlice'

export const store = configureStore({
    reducer:{
        paste:PasteReducer
    }
})