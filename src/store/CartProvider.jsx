import { useState, useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {

    if (action.type === "ADD_ITEM") {
        const newTotalAmount = state.totalAmount + (action.item.price * action.item.amount);

        const existingItemIndex = state.items.findIndex(item => action.item.id === item.id);
        const existingCartItem = state.items[existingItemIndex];
        let updatedItems;

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };

            updatedItems = state.items;
            updatedItems[existingItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: newTotalAmount
        }
    }

    if (action.type === "REMOVE_ITEM") {
        const existingItemIndex = state.items.findIndex(item => action.id === item.id);
        const existingCartItem = state.items[existingItemIndex];

        const newTotalAmount = state.totalAmount - existingCartItem.price;
        let updatedItems;

        if (existingCartItem.amount === 1) {
            updatedItems = state.items.filter((item) => item.id !== action.id);
        } else {
            const updateItem = { ...existingCartItem, amount: existingCartItem.amount - 1 };
            updatedItems = state.items;
            updatedItems[existingItemIndex] = updateItem;
        }

        return {
            items: updatedItems,
            totalAmount: newTotalAmount
        }
    }

    return defaultCartState;
};

const CartProvider = (props) => {

    const [cartIsShown, setCartIsShown] = useState(false);
    const [cartState, cartDispatch] = useReducer(cartReducer, defaultCartState);

    const showCartHandler = () => {
        setCartIsShown(true);
    }

    const hideCartHandler = () => {
        setCartIsShown(false);
    }

    const addItemToCartHandler = item => {
        cartDispatch({
            type: "ADD_ITEM",
            item: item
        });
    };
    const removeItemFromCArtHandler = id => {
        cartDispatch({
            type: "REMOVE_ITEM",
            id: id
        });
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCArtHandler,
        isShown: cartIsShown,
        showCart: showCartHandler,
        hideCart: hideCartHandler
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartProvider;