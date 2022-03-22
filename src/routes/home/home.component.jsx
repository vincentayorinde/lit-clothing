import React from 'react'
import './home.styles.scss'
import { Outlet } from 'react-router-dom'
import Directory from '../../components/directory/directory.component'
export const Home = () => {
	return (
		<div className='home'>
		<Outlet />
		<Directory />
		</div>
	)
}
