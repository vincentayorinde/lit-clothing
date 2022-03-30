import React from 'react'
import { Home } from './routes/home/home.component'
import { Routes, Route } from 'react-router-dom'
import Navigation from './routes/navigation/navigation.component'
import Authentication from './routes/authentication/authentication.component'


const HatsHomePage = () => {
	return (
		<div>
			<h1>The Hats Page</h1>
		</div>
	)
}

function App() {
	return (
		<Routes>
			<Route path='/' element={<Navigation />}>
				<Route index element={<Home />} />
				<Route path='/shop' element={<Home />} />
				<Route path='/auth' element={<Authentication />} />
			</Route>
		</Routes>
	)
}

export default App
