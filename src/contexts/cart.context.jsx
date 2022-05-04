import React, { createContext, useEffect, useState } from 'react'

const addCartItem = (cartItems, productToAdd) => {
	const existingCartItems = cartItems.find(
		(item) => item.id === productToAdd.id,
	)

	if (existingCartItems) {
		return cartItems.map((item) =>
			item.id === productToAdd.id
				? { ...item, quantity: item.quantity + 1 }
				: item,
		)
	}

	return [...cartItems, { ...productToAdd, quantity: 1 }]
}

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	quantity: 0,
})
export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(null)
	const [cartItems, setCartItems] = useState([])
	const [quantity, setQuantity] = useState(0)

	useEffect(() => {
		const quantity = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
		setQuantity(quantity)
	}, [cartItems])

	const addItemToCart = (productToAdd) => {
		setCartItems(addCartItem(cartItems, productToAdd))
	}
	const value = {
		isCartOpen,
		setIsCartOpen,
		addItemToCart,
		cartItems,
		quantity,
	}

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
