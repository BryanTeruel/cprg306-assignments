"use client";

import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";
import Image from "next/image";
import { Github } from "lucide-react";

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
                href="week-10/shopping-list"
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
              <Github className="w-5 h-5" />
              <span>Sign in with GitHub</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
