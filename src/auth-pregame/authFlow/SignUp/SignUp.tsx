import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

import { auth, db } from "../../../firebase/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const InitailValues = {
	username: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const SignUp = () => {
	const [values, setValues] = useState<{ [key: string]: string }>(
		InitailValues
	);
	const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
	const [showError, setShowError] = useState(false);
	const [showPasswordError, setShowPasswordError] = useState(false);

	const inputs = [
		{
			controlId: "formBasicUsername",
			label: "Username",
			type: "text",
			name: "username",
			required: true,
			pattern: "^[A-Za-z0-9]{3,16}$",
			feedback:
				"Username should be 3-16 characters and shouldn't include any special character!",
		},
		{
			controlId: "formBasicEmail",
			label: "Email address",
			type: "email",
			name: "email",
			required: true,
			feedback: "Please enter a valid email address.",
		},
		{
			controlId: "formBasicPassword",
			label: "Password",
			type: "password",
			name: "password",
			required: true,
			pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
			feedback:
				"Please enter a valid password (must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long).",
		},
		{
			controlId: "formBasicConfirmPassword",
			label: "Confirm Password",
			type: "password",
			name: "confirmPassword",
			required: true,
			pattern: values.password,
			feedback: "Please confirm your password.",
		},
	];

	const handleChange = (event: any) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
		setErrors({
			...errors,
			[event.target.name]: false,
		});
	};

	function getFirst4Digits(string: string) {
		return string.substring(0, 4).toUpperCase();
	}

	const handleSubmit = async (event: any) => {
		const form = event.currentTarget;
		event.preventDefault();
		if (form.checkValidity() === false) {
			setErrors({
				...errors,
				[event.target.name]: true,
			});
		} else {
			setShowError(false);
			setShowPasswordError(false);
			try {
				const userCredential = await createUserWithEmailAndPassword(
					auth,
					values.email,
					values.password
				);
				try {
					await setDoc(doc(db, "users", userCredential.user.uid), {
						name: values.username+"#"+getFirst4Digits(userCredential.user.uid),
					});
					setValues(InitailValues);
				} catch (err) {
					console.log(err);
				}
			} catch (err) {
				console.log(err);
			}
		}
	};
	return (
		<div>
			<Form className="" noValidate validated={true} onSubmit={handleSubmit}>
				
				{inputs.map((input) => (
					<Form.Group
						className="my-2"
						controlId={input.controlId}
						key={input.controlId}
					>
						<Form.Label>{input.label}</Form.Label>
						<Form.Control
							required={input.required}
							type={input.type}
							name={input.name}
							value={values[input.name]}
							onChange={(e) => handleChange(e)}
							pattern={input.pattern}
							isInvalid={errors[input.name]}
						/>
						<Form.Control.Feedback type="invalid">
							{input.feedback}
						</Form.Control.Feedback>
					</Form.Group>
				))}

				{showError && (
					<Alert variant="danger">
						There was an error with your submission. Please try again.
					</Alert>
				)}
				{showPasswordError && (
					<Alert variant="danger">
						The password and confirm password inputs do not match.
					</Alert>
				)}
				<Button className="bg-sky-500 w-100 my-2" variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</div>
	);
};

export default SignUp;
