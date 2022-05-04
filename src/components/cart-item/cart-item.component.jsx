import React from 'react'
import './cart-item.styles.scss'
export const CartItem = ({ cartItem }) => {
	const { name, quantity, imageUrl, price } = cartItem
	return (
		<div className='cart-item-container'>
			<img src={imageUrl} alt={`${name}`} />
			<div className='item-details'>
				<h2 className='name'>{name}</h2>
				<span className='price'>
					{quantity} x ${price}
				</span>
			</div>
		</div>
	)
}
