import { create } from 'zustand'
import { createShoppingCartSlice } from './slices/sc_slice.js'


export const useBoundStore = create((...a) => ({
  ...createShoppingCartSlice(...a),
}))