'use client';

import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="w-full bg-sandy-neutral text-brown p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Brand Name */}
        <Link href="/" className="text-2xl font-bold text-burnt-sienna">
          MilestoneJourney
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="font-medium hover:text-burnt-sienna">
            Dashboard
          </Link>

          {/* Authentication Status */}
          {status === 'loading' && (
            <div className="w-8 h-8 rounded-full bg-brown/10 animate-pulse" />
          )}

          {status === 'unauthenticated' && (
            <button
              onClick={() => signIn('google')} // Or another provider
              className="bg-burnt-sienna text-white px-4 py-2 rounded-md font-semibold"
            >
              Sign In
            </button>
          )}

          {status === 'authenticated' && session.user && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => signOut()}
                className="font-medium hover:text-burnt-sienna"
              >
                Sign Out
              </button>
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || 'User'}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-brown text-beige flex items-center justify-center font-bold">
                  {session.user.name?.charAt(0) || 'U'}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}