import React from "react";
import { Alert } from "reactstrap";
import Link from "next/link";
import axios from "axios";
import catchErrors from "../../utils/catchErrors";
import baseUrl from "../../utils/baseUrl";
import { handleLogin } from "../../utils/auth";
import LoadingSpinner from "@/utils/LoadingSpinner";
import config from "../../config/config.json";

const INITIAL_USER = {
	email: "",
	password: "",
};

const LoginForm = () => {
	const [user, setUser] = React.useState(INITIAL_USER);
	const [disabled, setDisabled] = React.useState(true);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState("");

	const env = process.env.NODE_ENV || 'development';
	const Config = (config)[env];

	React.useEffect(() => {
		const isUser = Object.values(user).every((el) => Boolean(el));
		isUser ? setDisabled(false) : setDisabled(true);
	}, [user]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(process.env.JWT_SECRET)
		console.log(baseUrl)
		console.log(env, Config)
		try {
			setLoading(true);
			setError("");
			const url = `${baseUrl}/api/v1/auth/signin`;
			const payload = { ...user };
			const response = await axios.post(url, payload);
			handleLogin(response.data);
		} catch (error) {
			catchErrors(error, setError);
			console.log("error occuring here", error)
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="login-form">
			<h2>Login</h2>

			<Alert color="danger" isOpen={error ? true : false}>
				{error}
			</Alert>

			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label>Email</label>
					<input
						className="form-control"
						placeholder="Email"
						name="email"
						type="email"
						value={user.email}
						onChange={handleChange}
					/>
				</div>

				<div className="form-group">
					<label>Password</label>
					<input
						className="form-control"
						placeholder="Password"
						name="password"
						type="password"
						value={user.password}
						onChange={handleChange}
					/>
				</div>

				<div className="row align-items-center">
					<div className="col-lg-6 col-md-6 col-sm-6 remember-me-wrap">
						<p>
							<input type="checkbox" id="test2" />
							<label htmlFor="test2">Remember me</label>
						</p>
					</div>

					<div className="col-lg-6 col-md-6 col-sm-6 lost-your-password-wrap">
						<Link href="/reset-password">
							<a className="lost-your-password">
								Lost your password?
							</a>
						</Link>
					</div>
				</div>

				<button type="submit" disabled={disabled}>
					Log In
					{loading ? <LoadingSpinner /> : ""}
				</button>

				<div className="col-lg-12 col-md-12 col-sm-12">
					<p>Don't have an account <Link href="/signingup">
							<a className="lost-your-password">
								Sign Up
							</a>
						</Link></p>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
