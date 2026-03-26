'use client';

import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';

export function AuthStatus() {
  const { isSignedIn } = useUser();

  return (
    <div className="flex items-center gap-3">
      {isSignedIn ? (
        <UserButton />
      ) : (
        <>
          <SignInButton>
            <button className="clay-button-secondary rounded-full px-4 py-2 text-sm font-semibold tracking-wide transition hover:-translate-y-0.5 hover:brightness-110">
              Sign in
            </button>
          </SignInButton>
          <SignUpButton>
            <button className="clay-button rounded-full px-4 py-2 text-sm font-semibold tracking-wide transition hover:-translate-y-0.5 hover:brightness-105">
              Sign up
            </button>
          </SignUpButton>
        </>
      )}
    </div>
  );
}
