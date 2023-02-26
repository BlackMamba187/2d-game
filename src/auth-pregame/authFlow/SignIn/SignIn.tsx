import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { auth } from "../../../firebase/FirebaseConfig";

const InitailValues = {
	email: "",
	password: "",
};
const SignIn = () => {
	const [values, setValues] = useState<{ [key: string]: string }>(
		InitailValues
	);
	const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
	const [showError, setShowError] = useState(false);

	const inputs = [
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
			try {
				await signInWithEmailAndPassword(auth, values.email, values.password);
			} catch (err) {
				console.log(err);
			}
		}
	};

	return (
		<Form
			className="w-full"
			noValidate
			validated={true}
			onSubmit={handleSubmit}
		>
			{inputs.map((input) => (
				<Form.Group
					className="my-4"
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
			<Button className="w-100 bg-sky-500 my-4" variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	);
};

export default SignIn;
