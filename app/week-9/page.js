"use client";

import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const handleSignIn = async () => {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <div className="min-h-screen bg-sky-950 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-sky-900 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Shopping List App
        </h1>

        {user ? (
          <div className="space-y-6">
            <div className="flex flex-col items-center">
              {user.photoURL && (
                <Image
                  src={user.photoURL || "/placeholder.svg"}
                  alt="Profile"
                  width={80}
                  height={80}
                  className="rounded-full border-2 border-sky-400 object-cover"
                  unoptimized
                />
              )}
              <p className="text-xl font-medium text-center">
                Welcome, {user.displayName}!
              </p>
              <p className="text-sky-300 text-sm">{user.email}</p>
            </div>

            <div className="flex flex-col space-y-4">
              <Link
                href="week-9/shopping-list"
                className="bg-sky-600 hover:bg-sky-500 text-white font-medium py-2 px-4 rounded-md text-center transition-colors duration-300"
              >
                Go to Shopping List
              </Link>

              <button
                onClick={handleSignOut}
                className="bg-red-600 hover:bg-red-500 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-center text-sky-300">
              Please sign in to access your shopping list
            </p>

            <button
              onClick={handleSignIn}
              className="w-full bg-sky-600 hover:bg-sky-500 text-white font-medium py-3 px-4 rounded-md flex items-center justify-center space-x-2 transition-colors duration-300"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span>Sign in with GitHub</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
