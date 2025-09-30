"use client";

import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';

const Profile = () => {

  const { user, logout } = useAuth();
  const router = useRouter();

  const logoutCustomer = async () => {
    logout();
    router.push('/');
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-gray-500">Redirecting to home...</p>
      </div>
    );
  }

  const listProducts = () => {
    router.push('/products');
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.firstName} {user.lastName}!</h1>
      <p className="text-gray-700">Email: {user.email}</p>
      <p className="text-gray-500 mt-2">This data was fetched from a protected API route using a JWT token.</p>
      
      <span className="mt-6 text-blue-600 hover:underline cursor-pointer" 
        onClick={() => listProducts()}
      >
        See Products
      </span>

      <span className="mt-6 text-blue-600 hover:underline cursor-pointer" 
        onClick={() => logoutCustomer()}
      >
        Log Out
      </span>
    </div>
  );
}

export default Profile;