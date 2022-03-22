import React from 'react'
import { Home } from './routes/home/home.component'
import { Routes, Route } from 'react-router-dom'
import Navigation from './routes/navigation/navigation.component'
import SignIn from './routes/sign-in/sign-in.component'


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
				<Route path='/shop' element={<HatsHomePage />} />
				<Route path='/sign-in' element={<SignIn />} />
			</Route>
		</Routes>
	)
}

export default App
