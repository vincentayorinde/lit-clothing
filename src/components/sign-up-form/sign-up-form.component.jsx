import React, { useState } from 'react'
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'
import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'
import './sign-up-forms.styles.scss'

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
}

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields)
	const { displayName, email, password, confirmPassword } = formFields

	console.log('the form fields', formFields)

	const resetFormFields = () => {
		setFormFields(defaultFormFields)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (password !== confirmPassword) {
			alert('Passwords do not match')
			return
		}
		try {
			const res = await createAuthUserWithEmailAndPassword(email, password)
			const userDocRef = await createUserDocumentFromAuth(res.user, {
				displayName,
			})
			resetFormFields()
		} catch (error) {
			if (error.code === 'auth/email-already-in-use') {
				alert('Cannot create user, email already in use')
			} else {
				console.log('the error', error)
			}
		}
	}
	const handleChange = (event) => {
		const { name, value } = event.target

		setFormFields({ ...formFields, [name]: value })
	}
	return (
		<div className='sign-up-container'>
		<h2>Don't have an account?</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label={'Display Name'}
					type='text'
					name='displayName'
					onChange={handleChange}
					required
					value={displayName}
				/>

				<FormInput
					label='Email'
					type='email'
					name='email'
					onChange={handleChange}
					value={email}
					required
				/>

				<FormInput
					label='Password'
					type='password'
					name='password'
					onChange={handleChange}
					value={password}
					required
				/>

				<FormInput
					label='Confirm Password'
					type='password'
					name='confirmPassword'
					onChange={handleChange}
					value={confirmPassword}
					required
				/>

				<Button type='submit' buttonType={'inverted'}>Sign Up</Button>
			</form>
		</div>
	)
}

export default SignUpForm
