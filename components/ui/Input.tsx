import { InputHTMLAttributes } from 'react';

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  const { className = '', ...rest } = props;
  return <input {...rest} className={`w-full rounded-md border border-slate-300 px-3 py-2 text-sm ${className}`} />;
}
