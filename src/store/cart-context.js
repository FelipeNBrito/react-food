import React from "react";

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => { },
    removeItem: (id) => { },
    isShown: false,
    showCart: () => {},
    hideCart: () => {}
});

export default CartContext;