import React, { useContext, useEffect } from 'react'
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import { CartContext } from '../../contexts/cart.context'
import './cart-icon.styles.scss'

const CartIcon = () => {
    const {isCartOpen, setIsCartOpen, quantity} = useContext(CartContext)

    const toggleCartDropDown = () => setIsCartOpen(!isCartOpen)
    
    
	return (
		<div className='cart-icon-container' onClick={toggleCartDropDown}>
			<ShoppingIcon className='shopping-icon' />
			<span className='item-count'>{quantity}</span>
		</div>
	)
}

export default CartIcon
