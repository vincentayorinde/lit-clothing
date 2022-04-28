import React, { createContext, useState } from 'react'
import PRODUCTS from '../shop-data.json'
export const ProductContext = createContext({
	products: [],
})

export const ProductProvider = ({ children }) => {
	const [products, setProduct] = useState(PRODUCTS)
	const value = { products }
	return (
		<ProductContext.Provider value={value}>{children}</ProductContext.Provider>
	)
}
