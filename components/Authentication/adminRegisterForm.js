import React from "react";
import { Alert } from "reactstrap";
import axios from "axios";
import catchErrors from "../../utils/catchErrors";
import baseUrl from "../../utils/baseUrl";
import { handleLogin } from "../../utils/auth";
import LoadingSpinner from "@/utils/LoadingSpinner";
import Swal from 'sweetalert2';

const INITIAL_USER = {
	name: "",
	gender: "",
	age: 0,
	eduDetails: "",
	City: "",
	occupation: "",
	email: "",
	password: "",
	confirmPassword: ""
};

const AdminRegisterForm = () => {
	const [user, setUser] = React.useState(INITIAL_USER);
	const [disabled, setDisabled] = React.useState(true);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState("");

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
		// console.log(user)
		try {
			setLoading(true);
			setError("");
			const url = `${baseUrl}/api/v1/auth/createadmin`;
			const payload = { ...user };
			const response = await axios.post(url, payload);
			handleLogin(response.data);
			// console.log(response.data)
			Swal.fire(
                `New Admin role created successfully`,
                'success'
              )
		} catch (error) {
			Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${error}`,
              })
			catchErrors(error, setError);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="register-form">
			<h2>Create Admin</h2>
			<Alert color="danger" isOpen={error ? true : false}>
				{error}
			</Alert>

			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label>Name</label>
					<input
						type="text"
						className="form-control"
						placeholder="Full Name"
						name="name"
						value={user.name}
						onChange={handleChange}
					/>
				</div>

				<div className="form-group">
                    <label>Gender</label>
                        <select onChange={handleChange} name="gender" className="form-control">
                            <option value={""}>Select Your Gender</option>
                            <option value={"Male"}>Male</option>
                            <option value={"Female"}>Female</option>
                        </select>
                </div>

				<div className="form-group">
					<label>Age</label>
					<input
						type="number"
						className="form-control"
						placeholder="age"
						name="age"
						value={user.age}
						onChange={handleChange}
					/>
				</div>

				<div className="form-group">
					<label>Education Details</label>
					<input
						type="text"
						className="form-control"
						placeholder="Education details"
						name="eduDetails"
						value={user.eduDetails}
						onChange={handleChange}
					/>
				</div>

				<div className="form-group">
					<label>City</label>
					<input
						type="text"
						className="form-control"
						placeholder="City"
						name="City"
						value={user.City}
						onChange={handleChange}
					/>
				</div>

				<div className="form-group">
					<label>Occupational status</label><br/>
						<div className="occupation_radio-container">
							{/* <label for="student">
								<input type="radio" id="student" name="occupation" value="student" onChange={handleChange}/>
								Student
							</label> */}
							
							<label for="employed">
								<input type="radio" id="employed" name="occupation" value="employed" onChange={handleChange}/>
								Employed
							</label>
							
							<label for="professional">
								<input type="radio" id="professional" name="occupation" value="professional" onChange={handleChange}/>
								Professional
							</label>
						</div>
				</div>

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
						type="password"
						className="form-control"
						placeholder="Password"
						name="password"
						value={user.password}
						onChange={handleChange}
					/>
				</div>

				<div className="form-group">
					<label>Confirm Password</label>
					<input
						type="password"
						className="form-control"
						placeholder="Confirm Password"
						name="confirmPassword"
						value={user.confirmPassword}
						onChange={handleChange}
					/>
				</div>



				<p className="description">
					The password should be at least eight characters long. To
					make it stronger, use upper and lower case letters, numbers,
					and symbols like ! " ? $ % ^ & )
				</p>

				<button type="submit" disabled={disabled}>
					Register
					{loading ? <LoadingSpinner /> : ""}
				</button>
			</form>
		</div>
	);
};

export default AdminRegisterForm;
