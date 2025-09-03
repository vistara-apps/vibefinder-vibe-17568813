'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AppHeader from '@/components/ui/AppHeader';
import AuthForm from '@/components/auth/AuthForm';
import { FiArrowLeft } from 'react-icons/fi';

export default function LoginPage() {
  const router = useRouter();
  
  const handleSuccess = () => {
    router.push('/');
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      
      <main className="flex-1 container-fluid py-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-primary">
            <FiArrowLeft className="mr-2" />
            Back to Home
          </Link>
        </div>
        
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm">
          <AuthForm mode="login" onSuccess={handleSuccess} />
        </div>
      </main>
    </div>
  );
}

