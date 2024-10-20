const addItemToCart = (cart, item) => {

    const res = [...cart];
    
    const index = res.findIndex((i) => i.name === item.name);
    if (index !== -1) {
        res[index].quantity += 1;
    } else {
        res.push({ ...item, quantity: 1 });
    }
    return res;
};

const removeItemFromCart = (cart, item) => {

    const res = [...cart];
    const index = res.findIndex((i) => i.name === item.name);
    if (index !== -1) {
        if (res[index].quantity > 1) {
            res[index].quantity -= 1;
        } else {
            res.splice(index, 1);
        }
    }
    return res;
};

export const createShoppingCartSlice = (set) => ({
    shopping_cart: [],
    addItem: (item) => set((state) => ({ shopping_cart: addItemToCart(state.shopping_cart, item) })),
    removeItem: (item) => set((state) => ({ shopping_cart: removeItemFromCart(state.shopping_cart, item) })),
    clearCart: () => set(() => ({ shopping_cart: [] })),
})
  