import React, { useContext } from 'react'
import { ProductContext } from '../../contexts/product.context'
import ProductCard from '../../components/product-card/product-card.component'
import './shop.styles.scss'
const Shop = () => {
	const { products } = useContext(ProductContext)
	console.log('the products', products)
	return (
		<div className='products-container'>
			{products.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	)
}

export default Shop
