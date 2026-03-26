import { ButtonHTMLAttributes } from 'react';

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className = '', ...rest } = props;
  return (
    <button
      {...rest}
      className={`clay-button inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vetra-accent disabled:translate-y-0 disabled:opacity-60 ${className}`}
    />
  );
}
