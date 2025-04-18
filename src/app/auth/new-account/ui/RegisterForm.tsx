'use client'
import { login } from '@/actions/auth/login';
import { registerUser } from '@/actions/auth/register';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormInputs = {
  name: string;
  email: string;
  password: string;
}

export const RegisterForm = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>()
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('');
    const { name, email, password } = data;

    const response = await registerUser(name, email, password);

    if (!response.ok) {
      setErrorMessage(response.message)

      return;
    }

    await login(email.toLowerCase(), password);
    window.location.replace('/');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">

      <label htmlFor="name">Fullname</label>
      <input
        className={
          clsx(
            "px-5 py-2 border bg-gray-200 rounded mb-5",
            { "border-red-500": errors.name }
          )
        }
        type="text"
        {...register('name', { required: true })}
      />

      <label htmlFor="email">Email</label>
      <input
        className={
          clsx(
            "px-5 py-2 border bg-gray-200 rounded mb-5",
            { "border-red-500": errors.email }
          )
        }
        type="email"
        {...register('email', { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })}
      />

      <label htmlFor="password">Password</label>
      <input
        className={
          clsx(
            "px-5 py-2 border bg-gray-200 rounded mb-5",
            { "border-red-500": errors.password }
          )
        }
        type="password"
        {...register('password', { required: true, minLength: 6 })}
      />

      <span className='text-red-500'>{errorMessage}</span>

      <button
        className="btn-primary cursor-pointer">
        Create account
      </button>


      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link
        href="/auth/login"
        className="btn-secondary text-center">
        Sign In
      </Link>

    </form>
  )
}
