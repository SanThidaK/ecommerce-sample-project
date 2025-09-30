"use client";

import { useAuth } from '@/context/auth-context';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  firstName: z.string().min(2, "First name is too short"),
  lastName: z.string().min(2, "Last name is too short"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\+?[0-9]{9,15}$/, "Enter a valid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  birthday: z.string().min(1, "Birthday is required"),
  address: z.string().min(5, "Address is too short"),
});

type LoginFormData = z.infer<typeof loginSchema>;


const LoginPage = () => {

  const { registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    registerUser(data);
  };

  return (
    <div className=' mt-[150px]'>
      <div className='width-[80%] mx-auto mb-[150px] px-[30px] py-[60px] border-b border-[#7b8487] text-center'>
        <h1 className={`text-[#33383c] font-serif text-[2em] mb-3`}>
          You’re Invited to Create an Account
        </h1>
        <p className='text-[#7b8487] text-[1rem]'>
          Join us at Dior Beauty Privé. Create an account to enjoy limitless members-only rewards, including free shipping early access to new products, exclusive gifts, personalized services, and more.
        </p>
      </div>
      <div className='px-[30px] pb-[150px] max-w-[700px] mx-auto'>
        <form method="post" onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:width-[500px] width-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <input
              {...register("firstName")}
              placeholder="First Name"
              className="w-full border-b border-[#7b8487] p-3 focus:outline-none focus:border-b"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <input
              {...register("lastName")}
              placeholder="Last Name"
              className="w-full border-b border-[#7b8487] p-3 focus:outline-none focus:border-b"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="w-full border-b border-[#7b8487] p-3 focus:outline-none focus:border-b"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <input
              {...register("phone")}
              type="tel"
              placeholder="Phone"
              className="w-full border-b border-[#7b8487] p-3 focus:outline-none focus:border-b"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="w-full border-b border-[#7b8487] p-3 focus:outline-none focus:border-b"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Birthday */}
          <div>
            <input
              {...register("birthday")}
              type="date"
              className="w-full border-b border-[#7b8487] p-3 focus:outline-none focus:border-b"
            />
            {errors.birthday && (
              <p className="text-red-500 text-sm">{errors.birthday.message}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <textarea
              {...register("address")}
              placeholder="Address"
              className="w-full border-b border-[#7b8487] p-3 focus:outline-none focus:border-b"
              rows={3}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>
          <div></div>

          {/* Submit Button */}
          <div className='flex flex-row w-full items-center md:col-span-2'>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-[150px] mx-auto bg-black text-white py-3 rounded-md hover:bg-neutral-800 transition-all font-medium tracking-wide"
            >
              {isSubmitting ? "Creating..." : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
