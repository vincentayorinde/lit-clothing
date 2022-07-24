import React, { useContext, useEffect } from 'react'
import { CartContext } from '../../contexts/cart.context'
import './checkout.styles.scss'

const Checkout = () => {
	const { cartItems, addItemToCart, removeItemFromCart } = useContext(CartContext)

	return (
		<div>
			<h1>CHECKOUT</h1>
			<div>
				{cartItems.map((item) => {
					const { id, name, quantity, price } = item
					return (
						<div key={id}>
							<h2>{name}</h2>
							<span>{quantity}</span><br/>
							<span onClick={() => addItemToCart(item)}>increment</span><br/>
							<span onClick={() => removeItemFromCart(item)}>decrement</span><br/>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Checkout
