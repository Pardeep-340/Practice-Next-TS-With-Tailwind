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
    const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm<FormData>();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formDataList, setFormDataList] = useState<FormData[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(prevState => !prevState);
    };

    const submitHandler = (data: FormData) => {
        if (editIndex !== null) {
            const updatedFormDataList = formDataList.map((item, index) =>
                index === editIndex ? data : item
            );
            setFormDataList(updatedFormDataList);
            setEditIndex(null);
        } else {
            setFormDataList([...formDataList, data]);
        }
        reset();
    };

    const handleEdit = (index: number) => {
        const formData = formDataList[index];
        setValue('firstName', formData.firstName);
        setValue('lastName', formData.lastName);
        setValue('email', formData.email);
        setValue('password', formData.password);
        setValue('confirmPassword', formData.confirmPassword);
        setEditIndex(index);
    };

    const handleDelete = (index: number) => {
        const updatedFormDataList = formDataList.filter((_, i) => i !== index);
        setFormDataList(updatedFormDataList);
    };

    return (
        <div className='mt-6'>
            <div className='max-w-[600px] py-8 px-6 bg-gray-400 mx-auto rounded-lg'>
                <h1 className='text-4xl font-bold text-center pb-5'>Todo List</h1>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <div className='relative'>
                        <input
                            {...register('firstName', { required: 'First name is required.' })}
                            type="text"
                            placeholder='First Name'
                            className='w-full py-2 px-4 outline-none rounded-lg'
                        />
                        {errors.firstName && <p className='text-red-500 absolute text-sm -bottom-5 left-0'>{errors.firstName.message}</p>}
                    </div>

                    <div className='relative'>
                        <input
                            {...register('lastName', { required: 'Last name is required.' })}
                            type="text"
                            placeholder='Last Name'
                            className='w-full py-2 px-4 outline-none rounded-lg mt-5'
                        />
                        {errors.lastName && <p className='text-red-500 absolute text-sm -bottom-5 left-0'>{errors.lastName.message}</p>}

                    </div>
                    <div className='relative'>
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
                            className='w-full py-2 px-4 outline-none rounded-lg mt-5'
                        />
                        {errors.email && <p className='text-red-500 absolute text-sm -bottom-5 left-0'>{errors.email.message}</p>}
                    </div>

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
                            className='w-full py-2 px-4 outline-none rounded-lg mt-5'
                        />
                        <span
                            className='absolute right-3 top-8 cursor-pointer'
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                        {errors.password && <p className='text-red-500 absolute text-sm -bottom-5 left-0'>{errors.password.message}</p>}
                    </div>

                    <div className='relative w-full'>
                        <input
                            {...register('confirmPassword', {
                                required: 'Confirm password is required.',
                                validate: value => value === watch('password') || 'Passwords do not match.'
                            })}
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder='Confirm Password'
                            className='w-full py-2 px-4 outline-none rounded-lg mt-5'
                        />
                        <span
                            className='absolute right-3 top-8 cursor-pointer'
                            onClick={toggleConfirmPasswordVisibility}
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                        {errors.confirmPassword && <p className='text-red-500 absolute text-sm -bottom-5 left-0'>{errors.confirmPassword.message}</p>}
                    </div>

                    <div className='text-center pt-4'>
                        <button type='submit' className='px-5 py-2 bg-black text-white rounded-xl'>
                            {editIndex !== null ? 'Update' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
            {formDataList.length > 0 && (
                <div className="mt-4 bg-gray-300 p-4 rounded-lg max-w-[600px] mx-auto">
                    {formDataList.map((obj, index) => (
                        <div key={index} className={`bg-white p-4 rounded-lg ${index === 0 ? "mt-0" : "mt-4"}`}>
                            <div className='flex items-center justify-between'>
                                <p className='w-1/2'><span className='font-bold'>First Name: </span> {obj.firstName}</p>
                                <p className='w-1/2'><span className='font-bold'>Last Name:</span>  {obj.lastName}</p>
                            </div>
                            <p className='py-1'><span className='font-bold'>Email:</span> {obj.email}</p>
                            <div className='flex items-center justify-between'>
                                <p className='w-1/2'><span className='font-bold'>Password: </span> {obj.password}</p>
                                <p className='w-1/2'><span className='font-bold'>Confirm Password:</span>  {obj.confirmPassword}</p>
                            </div>
                            <div className='flex justify-end mt-2'>
                                <button
                                    onClick={() => handleEdit(index)}
                                    className='bg-blue-500 text-white px-3 py-1 rounded mr-2'>
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(index)}
                                    className='bg-red-500 text-white px-3 py-1 rounded'>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Todo;
