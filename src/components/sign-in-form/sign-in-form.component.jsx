import React, { useState } from 'react'
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'
import {
	signInAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
	signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils'
import './sign-in-form.styles.scss'

const defaultFormFields = {
	email: '',
	password: '',
}

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields)
	const { email, password } = formFields

	console.log('the form fields', formFields)

	const resetFormFields = () => {
		setFormFields(defaultFormFields)
	}

	const signInWithGoogle = async () => {
		const { user } = await signInWithGooglePopup()
		await createUserDocumentFromAuth(user)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const res = await signInAuthUserWithEmailAndPassword(email, password)
			console.log('the res >>>', res)
			resetFormFields()
		} catch (error) {
			console.log('the error >>>', error)
			switch (error.code) {
				case 'auth/wrong-password':
					alert('Cannot sign in,wrong password')
					break
				case 'auth/user-not-found':
					alert('Cannot sign in, user doesnt exist')
					break
				default:
					console.log('the error', error)
			}
		}
	}
	const handleChange = (event) => {
		const { name, value } = event.target

		setFormFields({ ...formFields, [name]: value })
	}
	return (
		<div className='sign-in-container'>
			<h2>I already have an account</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label={'Email'}
					type='text'
					name='email'
					onChange={handleChange}
					required
					value={email}
				/>

				<FormInput
					label='Password'
					type='password'
					name='password'
					onChange={handleChange}
					value={password}
					required
				/>
				<div className='buttons-container'>
					<Button type='submit'>Sign In</Button>
					<Button type='button' onClick={signInWithGoogle} buttonType={'google'}>
						Google Sign In
					</Button>
				</div>
			</form>
		</div>
	)
}

export default SignInForm
