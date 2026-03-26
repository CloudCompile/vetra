import { InputHTMLAttributes } from 'react';

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  const { className = '', ...rest } = props;
  return (
    <input
      {...rest}
      className={`clay-input w-full rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-vetra-accent/40 ${className}`}
    />
  );
}
