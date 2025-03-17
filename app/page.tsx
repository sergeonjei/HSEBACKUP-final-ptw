import React from 'react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from './api/auth/[...nextauth]/route';

export default async function HomePage() {
  let session;
  
  try {
    session = await getServerSession(authOptions);
    
    // If user is logged in, redirect to their dashboard
    if (session?.user) {
      redirect('/dashboard');
    }
  } catch (error) {
    console.error("Authentication error:", error);
    // Continue rendering the page even if there's an auth error
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="bg-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-20 md:py-28">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                <span className="block">Permit to Work System</span>
                <span className="block text-indigo-300 mt-2">Safety First, Always</span>
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-xl text-indigo-200">
                A comprehensive permit to work system for managing work permits, risk assessments, and safety compliance in construction and industrial settings.
              </p>
              <div className="mt-10 flex justify-center space-x-4">
                <Link 
                  href="/auth/login"
                  className="btn btn-primary px-8 py-3 md:py-4 md:text-lg md:px-10"
                >
                  Sign in
                </Link>
                <Link 
                  href="/auth/register"
                  className="btn btn-secondary bg-white px-8 py-3 md:py-4 md:text-lg md:px-10"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Why Choose Our System?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Comprehensive features designed for safety and compliance
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="card">
              <div className="p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900">Safety Focused</h3>
                <p className="mt-2 text-base text-gray-500">
                  Ensure workplace safety with comprehensive risk assessments and clear protocols.
                </p>
              </div>
            </div>
            
            <div className="card">
              <div className="p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900">Regulatory Compliance</h3>
                <p className="mt-2 text-base text-gray-500">
                  Stay compliant with regulations and maintain detailed documentation of all work permits.
                </p>
              </div>
            </div>
            
            <div className="card">
              <div className="p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900">Efficiency & Tracking</h3>
                <p className="mt-2 text-base text-gray-500">
                  Streamline your workflow with digital permits and real-time status tracking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 