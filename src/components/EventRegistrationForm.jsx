// src/components/EventRegistrationForm.jsx
import React, { useEffect, useState } from 'react';
import useForm from '../hooks/useForm';
import './event.css'; // Import the CSS file

const validate = (values) => {
    const errors = {};
    if (!values.name) errors.name = 'Name is required.';
    if (!values.email) errors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = 'Email is invalid.';
    if (!values.age || values.age <= 0) errors.age = 'Age must be greater than 0.';
    if (values.attendingWithGuest && !values.guestName) errors.guestName = 'Guest name is required.';
    return errors;
};

const EventRegistrationForm = () => {
    const initialState = {
        name: '',
        email: '',
        age: '',
        attendingWithGuest: false,
        guestName: '',
    };

    const {
        handleChange,
        handleSubmit,
        values,
        errors,
        isSubmitting,
        setIsSubmitting,
    } = useForm(initialState, validate);

    const [submittedData, setSubmittedData] = useState(null);

    useEffect(() => {
        if (isSubmitting && Object.keys(errors).length === 0) {
            setSubmittedData(values);
            setIsSubmitting(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors, isSubmitting, values]);

    return (
        <div className="container">
            <h1>Event Registration Form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                    />
                    {errors.name && <span>{errors.name}</span>}
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                    />
                    {errors.email && <span>{errors.email}</span>}
                </div>
                <div>
                    <label>Age:</label>
                    <input
                        type="number"
                        name="age"
                        value={values.age}
                        onChange={handleChange}
                    />
                    {errors.age && <span>{errors.age}</span>}
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            name="attendingWithGuest"
                            checked={values.attendingWithGuest}
                            onChange={handleChange}
                        />
                        Are you attending with a guest?
                    </label>
                </div>
                {values.attendingWithGuest && (
                    <div>
                        <label>Guest Name:</label>
                        <input
                            type="text"
                            name="guestName"
                            value={values.guestName}
                            onChange={handleChange}
                        />
                        {errors.guestName && <span>{errors.guestName}</span>}
                    </div>
                )}
                <button type="submit">Submit</button>
            </form>
            {submittedData && (
                <div className="summary">
                    <h3>Form Submitted Successfully</h3>
                    <p>Name: {submittedData.name}</p>
                    <p>Email: {submittedData.email}</p>
                    <p>Age: {submittedData.age}</p>
                    <p>Attending with guest: {submittedData.attendingWithGuest ? 'Yes' : 'No'}</p>
                    {submittedData.attendingWithGuest && <p>Guest Name: {submittedData.guestName}</p>}
                </div>
            )}
        </div>
    );
};

export default EventRegistrationForm;
