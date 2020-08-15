import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/authContext/authContext';
import { Link } from 'react-router-dom';

const Login = (props) => {
	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	const { loginUser, userAuth, errors, clearError } = useContext(AuthContext);

	const { email, password } = user;


	useEffect(() => {
		if(userAuth) {
			// Redirection after successful register
			props.history.push('/')
		}
	},[userAuth, props.history]);

	const handleChange = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value
		});
		clearError();
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log({ email, password });
		loginUser( { email, password });
		clearError();
	}


	return (
		<div className="login">
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<input type="email" name="email" placeholder="Email" value={email} onChange={handleChange}/>
				<input type="password" name="password" placeholder="Password" value={password} onChange={handleChange}/>
				<input type="submit" value="Sign In" className="btn" />
			</form>
			<div className="question">
				{ errors !== null && <button className="danger">
					{ errors.msg ? errors.msg : errors.error[0].msg }<span onClick={() => clearError()}>X</span></button>
				}
				<p>
					Don't have an account? {" "} <Link to="/register">Sign Up</Link>
				</p>
			</div>
		</div>
	);
}

export default Login;