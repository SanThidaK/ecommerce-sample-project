"use client";

import { useEffect, useRef, useState } from "react";

import { useAuth } from "@/context/auth-context";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloseIcon } from "@/icons/Icons";
import { UnderlineNavLink } from "@/components/nav-link";
import { useRouter } from "next/navigation";

interface dataProps {
  setIsOpen: (value: boolean) => void;
}

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;


const LoginModal: React.FC<dataProps> = ({ setIsOpen }) => {
  
  const { login, setLoading } = useAuth();

  useEffect(() => {
    // lock background scroll
    document.body.style.overflow = "hidden";
    return () => {
      // restore when modal closes
      document.body.style.overflow = "auto";
    };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    login(data);
    setIsOpen(false);
  };

  return (
    <div className="bg-black/50 h-[100vh] z-60 fixed w-full top-0 overflow-scroll" onClick={ () => setIsOpen(false) }>
      <div
        className="bg-white/90 px-8 py-[20px] transform transition-all duration-300 animate-scale-up max-w-[500px] width-full ms-auto rounded-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={() => setIsOpen(false)} aria-label="Close modal" className="ms-auto mb-[15px] w-[25px] cursor-pointer">
          <CloseIcon className="text-[#e5e5e5]" />
        </button>
        <div className="border-y border-[#e5e5e5] text-center py-5">
          <span>Account</span>
        </div>
        <div className="border-b border-[#e5e5e5] text-center py-9">
          <button type="button" onClick={() => '/auth'}
            className="w-[150px] mx-auto bg-[#33383c] text-white py-3 rounded-md hover:bg-neutral-800 transition-all font-medium tracking-wide cursor-pointer"
          >
            Create Account
          </button>
        </div>
        <div className="flex flex-col text-center py-6">
          <span className="text-base text-[#33383c] font-medium mb-[10px]">Login</span>
          <span className="text-[.75rem] text-[#7b8487]">
            for complimentary shipping and much more
          </span>
        </div>
        <form method="post" onSubmit={handleSubmit(onSubmit)} className="space-y-4 grid grid-cols-1 width-full pb-[80px]">

          {/* Email */}
          <div className="w-full">
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

          {/* Password */}
          <div className="w-full">
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

          {/* Forgot Password */}
          <div className="w-auto ms-auto">
            <UnderlineNavLink href="/" 
              className="text-sm text-[#7b8487] hover:text-[#33383c] "
            >
              I forgot my password
            </UnderlineNavLink>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-[150px] mx-auto bg-[#33383c] text-white py-3 rounded-md hover:bg-neutral-800 transition-all font-medium tracking-wide cursor-pointer mt-[20px]"
          >
            {isSubmitting ? "Logging In" : "Login"}
          </button>
        </form>

        <div className="bg-white rounded-sm p-3">
          <p className="text-[.875rem] text-[#33383c] font-medium">
            Join Dior Beauty Privé
          </p>
          <p className="text-[.75rem] text-[#7b8487] leading-[1.4]">
            Discover our loyalty program, the ultimate insider access to the House of Dior. Sign up to unlock a world of members-only rewards: free delivery, exclusive gifts, personalized services, and more.

          </p>
        </div>
      </div>
    </div>
  );
};
export default LoginModal;