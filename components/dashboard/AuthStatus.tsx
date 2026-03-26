'use client';

import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';

export function AuthStatus() {
  return (
    <div className="flex items-center gap-3">
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton>
          <button className="rounded border border-slate-300 px-3 py-1.5 text-sm">Sign in</button>
        </SignInButton>
        <SignUpButton>
          <button className="rounded bg-slate-900 px-3 py-1.5 text-sm text-white">Sign up</button>
        </SignUpButton>
      </SignedOut>
    </div>
  );
}
