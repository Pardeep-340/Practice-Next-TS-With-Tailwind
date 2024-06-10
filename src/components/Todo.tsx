"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

// Define an interface for the form data
interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Todo = () => {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<FormData>();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState<FormData | null>(null);

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(prevState => !prevState);
    };

    const submitHandler = (data: FormData) => {
        setFormData(data);
        setShow(true);
        reset();
    };

    return (
        <div className='mt-10'>
            <div className='max-w-[600px] py-8 px-6 bg-gray-400 mx-auto rounded-lg'>
                <h1 className='text-4xl font-bold text-center pb-5'>Todo List</h1>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <input
                        {...register('firstName', { required: 'First name is required.' })}
                        type="text"
                        placeholder='First Name'
                        className='w-full py-2 px-4 outline-none rounded-lg'
                    />
                    {errors.firstName && <p className='text-red-500'>{errors.firstName.message}</p>}

                    <input
                        {...register('lastName', { required: 'Last name is required.' })}
                        type="text"
                        placeholder='Last Name'
                        className='w-full py-2 px-4 outline-none rounded-lg mt-4'
                    />
                    {errors.lastName && <p className='text-red-500'>{errors.lastName.message}</p>}

                    <input
                        {...register('email', {
                            required: 'Email is required.',
                            pattern: {
                                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                message: 'Email is not valid.'
                            }
                        })}
                        type="email"
                        placeholder='Email'
                        className='w-full py-2 px-4 outline-none rounded-lg mt-4'
                    />
                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}

                    <div className='relative w-full'>
                        <input
                            {...register('password', {
                                required: 'Password is required.',
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters.'
                                }
                            })}
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Password'
                            className='w-full py-2 px-4 outline-none rounded-lg mt-4'
                        />
                        <span
                            className='absolute right-3 top-[26px] cursor-pointer'
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                    </div>

                    <div className='relative w-full'>
                        <input
                            {...register('confirmPassword', {
                                required: 'Confirm password is required.',
                                validate: value => value === watch('password') || 'Passwords do not match.'
                            })}
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder='Confirm Password'
                            className='w-full py-2 px-4 outline-none rounded-lg mt-4'
                        />
                        <span
                            className='absolute right-3 top-[26px] cursor-pointer'
                            onClick={toggleConfirmPasswordVisibility}
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                        {errors.confirmPassword && <p className='text-red-500'>{errors.confirmPassword.message}</p>}
                    </div>

                    <div className='text-center pt-4'>
                        <button type='submit' className='px-5 py-2 bg-black text-white rounded-xl'>Submit</button>
                    </div>
                </form>

                {show && formData && (
                    <div className="mt-4 bg-white p-4 rounded-lg">
                        <p><strong>First Name:</strong> {formData.firstName}</p>
                        <p><strong>Last Name:</strong> {formData.lastName}</p>
                        <p><strong>Email:</strong> {formData.email}</p>
                        <p><strong>Password:</strong> {formData.password}</p>
                        <p><strong>Confirm Password:</strong> {formData.confirmPassword}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Todo;
