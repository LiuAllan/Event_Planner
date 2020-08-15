import React, {useReducer} from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';


const initialState = {
	userAuth: null,
	errors: null
}

const AuthState = ({children}) => {

	const [state, dispatch] = useReducer(authReducer, initialState);

	// ACTIONS

	// Register user
	const registerUser = async (userData) => {
		const config = {
			header: {
				'Content-Type': 'application/json'
			}
		}

		// res contains a token from the server
		try {
			const res = await axios.post('/register', userData, config);
			dispatch({
				type: 'SUCCESS_REGISTER',
				payload: res.data
			})
		}
		catch(err) {
			dispatch({
				type: 'FAIL_REGISTER',
				payload: err.response.data
			})
		}
	}

	// Login user
	const loginUser = async (userData) => {
		const config = {
			header: {
				'Content-Type': 'application/json'
			}
		}

		try {
			const res = await axios.post('/auth', userData, config);
			dispatch({
				type: 'SUCCESS_LOGIN',
				payload: res.data
			})
		}
		catch(err) {
			dispatch({
				type: 'FAIL_LOGIN',
				payload: err.response.data
			})
		}
	}

	// Errors
	const setError = error => {
		dispatch({
			type: 'SET_ERROR',
			payload: error
		})
	}

	// Clear errors
	const clearError = () => {
		dispatch({
			type: 'CLEAR_ERROR',
		})
	}

	return (
		<AuthContext.Provider 
			value={{
				userAuth: state.userAuth,
				errors: state.errors,
				registerUser,
				loginUser,
				setError,
				clearError,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthState;